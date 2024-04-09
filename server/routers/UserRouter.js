const express = require("express");
const userRouter = express.Router();
const multer = require("multer");
const passport = require("passport");
const passportConfig = require("../passport.js");
const JWT = require("jsonwebtoken");
const User = require("../schemas/UserSchema.js");
const mailjet = require("node-mailjet");
var dotenv = require("dotenv").config({ path: `${__dirname}/.env` });
const mailjetClient = new mailjet({
	apiKey: process.env.MAILJET_API_KEY,
	apiSecret: process.env.MAILJET_SECRET_KEY,
});
//import { memberEmails } from '../memberEmails.mjs';

// Set up multer storage options
// ------------ NEW ------------------------
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cloudinary = require("cloudinary").v2;
let streamifier = require("streamifier");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -----------------------------------------

const sendPasswordResetEmail = (recipient) => {
	return mailjetClient.post("send", { version: "v3.1" }).request({
		Messages: [
			{
				From: {
					Email: "uclatbp.webmaster@gmail.com",
					Name: "TBP Webmasters",
				},
				To: [
					{
						Email: recipient.email,
						Name: recipient.name.first + " " + recipient.name.last,
					},
				],
				Subject: "Tau Beta Pi - Reset Account Password",
				TextPart: "",
				HTMLPart: `<p>
          Hello ${recipient.name.first} ${recipient.name.last},<br/><br/>
          You have requested a password reset for your Tau Beta Pi account. Follow the link below to create a new password:<br/><br/>
          <a href="${
						process.env.CLIENT_URL || "http://localhost:3000"
					}/reset-password/${
					recipient.id
				}" target="_blank">Reset Password</a><br/><br/>
          If the above link does not work, please copy and paste this link into your browser:<br/><br/>
          <a href="${
						process.env.CLIENT_URL || "http://localhost:3000"
					}/reset-password/${recipient.id}" target="_blank">
${process.env.CLIENT_URL || "http://localhost:3000"}/reset-password/${
					recipient.id
				}</a><br/><br/>
        If you no longer wish to reset your password, you may disregard this email.<br/><br/>
        Best,<br/>TBP Webmasters
        </p>`,
			},
		],
	});
};

const signToken = (userID) => {
	return JWT.sign(
		{
			iss: "tbpwebmaster",
			sub: userID,
		},
		"tbpwebmaster",
		{ expiresIn: "1hr" }
	);
};

userRouter.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["email"], session: false })
);

userRouter.get(
	"/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/", session: false }),
	function (req, res) {
		if (req.isAuthenticated()) {
			const { _id } = req.user;
			const token = signToken(_id);
			res.redirect("http://localhost:3000/GoogleCB/" + token);
			// res.redirect('https://tbp.seas.ucla.edu/GoogleCB/' + token);
		}
	}
);

userRouter.post("/register", (req, res) => {
	req.body.email = req.body.email.toLowerCase();
	const email = req.body.email;
	User.findOne({ email })
		.then((user) => {
			if (user)
				res.status(400).json({
					message: { msgBody: "Email is already in use", msgError: true },
				});
			else {
				const newUser = User(req.body);
				if (memberEmails.has(email)) newUser.position = "member";
				newUser
					.save()
					.then((savedUser) => {
						res.status(201).json({
							message: {
								msgBody: "Account successfully created",
								msgError: false,
							},
						});
					})
					.catch((err) => {
						console.log(err);
						res.status(500).json({
							message: { msgBody: "Error saving user", msgError: true },
						});
					});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: { msgBody: "Cannot register user", msgError: true },
			});
		});
});

userRouter.post(
	"/login",
	passport.authenticate("local", { session: false }),
	(req, res) => {
		if (req.isAuthenticated()) {
			const token = signToken(req.user._id);
			res.cookie("access_token", token, { httpOnly: true, sameSite: true });
			res.status(200).json({
				isAuthenticated: true,
				user: req.user,
			});
		} else {
			res.status(400).json({
				message: { msgBody: "Unable to sign in", msgError: true },
			});
		}
	}
);

userRouter.post(
	"/logout",
	// passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.clearCookie("access_token");
		res.json({ user: null, success: true }); // clear user appropriately
	}
);

// get currently authenticated user
userRouter.get(
	"/authenticated-user",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.status(200).json({ isAuthenticated: true, user: req.user });
	}
);

// Upload user headshot from form submission
userRouter.post("/upload-headshot", upload.single("img"), (req, res) => {
	let cloudinaryUploadStream = cloudinary.uploader.upload_stream(
		{ folder: "Headshots" },
		(err, result) => {
			if (err) {
				console.log(err);
				res.status(500).json({
					message: { msgBody: "Error uploading image", msgError: true },
				});
				return;
			}

			const imageUrl = result.secure_url;
			const publicId = result.public_id;
			res.status(200).json({
				message: { msgBody: "Image uploaded successfully", msgError: false },
				imageUrl: imageUrl,
				publicId: publicId,
			});
		}
	);

	streamifier.createReadStream(req.file.buffer).pipe(cloudinaryUploadStream);
});

userRouter.post("/delete-headshot-by-id", (req, res) => {
	cloudinary.uploader
		.destroy(req.body.public_id)
		.then((result) => {
			res.status(200).send("Successful deletion");
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("Could not delete headshot");
		});
});

// get user by id
userRouter.get("/get-user/:id", (req, res) => {
	User.findById(req.params.id)
		.then((user) => {
			res.send(user);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("Could not retrieve user by id from database");
		});
});

userRouter.get("/get-user-by-email/:email", (req, res) => {
	User.findOne({ email: req.params.email })
		.then((user) => {
			res.send(user);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("Could not retrieve user by email from database");
		});
});

userRouter.get("/get-candidates", (req, res) => {
	User.find({ position: "candidate" })
		.sort("name.last")
		.then((candidates) => {
			res.send(candidates);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("Could not retrieve candidates");
		});
});

userRouter.get("/get-all-users", (req, res) => {
	User.find()
		.sort("name.last")
		.then((users) => res.send(users))
		.catch((err) => {
			console.log(err);
			res.status(500).send("Could not retrieve users");
		});
});

userRouter.get("/get-non-candidates", (req, res) => {
    User.find({ position: { $ne: "candidate" } })
        .sort("name.last")
		.then((users) => {
			res.send(users);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("Could not retrieve users");
		});  
});

userRouter.get("/get-officers-by-committee/:committee", (req, res) => {
	const committee = req.params.committee;
	const query = "committees." + committee;
	User.find({ [query]: true })
		.sort("name.last")
		.then((officers) => res.send(officers))
		.catch((err) => {
			console.log(err);
			res.status(500).send("Could not retrieve officers");
		});
});

// get all officers
userRouter.get("/get-officers", (req, res) => {
	User.find({ position: { $ne: "member" } })
		.sort("name.last")
		.then((officers) => res.send(officers))
		.catch((err) => {
			console.log(err);
			res.status(500).send("Could not retrieve officers");
		});
});

userRouter.put(
	"/delete-user/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		//console.log(req.body);
		User.findByIdAndRemove(req.params.id)
			.then(() => {
				// console.log(user);
				res.status(200).send("successful deletion");
			})
			.catch((err) => {
				console.log(err);
				res.status(500).send("Could not delete");
			});
	}
);

userRouter.put(
	"/update-user/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		//console.log(req.body);
		User.findByIdAndUpdate(req.params.id, { $set: req.body })
			.then((user) => {
				//console.log(user)
				res.status(200);
				res.send("successfully updated user");
			})
			.catch((err) => {
				console.log(err);
				res.status(500).send("Could not update user");
			});
	}
);

userRouter.post("/send-reset-password-email/:id", (req, res) => {
	User.findByIdAndUpdate(req.params.id, { lastPasswordResetReq: new Date() })
		.then((user) => {
			sendPasswordResetEmail(user)
				.then((result) => {
					res.status(200);
					res.send("Successfully sent password reset email");
				})
				.catch((err) => {
					console.log(err);
					res.status(500).send("Could not send password reset email");
				});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("Could not update reset password request time");
		});
});

userRouter.post("/clear-reset-password-req-time/:id", (req, res) => {
	User.findByIdAndUpdate(req.params.id, { $unset: { lastPasswordResetReq: 1 } })
		.then((user) => {
			res.status(200);
			res.send("successfully cleared reset password request time");
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("Could not clear reset password request time");
		});
});

userRouter.put("/update-password/:id", (req, res) => {
	User.findById(req.params.id)
		.then((user) => {
			user.password = req.body.newPassword;
			user
				.save()
				.then((savedUser) => {
					res.status(201).json({
						message: {
							msgBody: "Password change successful",
							msgError: false,
						},
					});
				})
				.catch((err) => {
					console.log(err);
					res.status(500).json({
						message: { msgBody: "Error changing password", msgError: true },
					});
				});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("Could not get user for password change");
		});
});

userRouter.get("/delete-bad-user", (req, res) => {
	User.findByIdAndRemove("6434bb4b4eb73e9772b85176")
		.then((user) => {
			console.log(user);
			res.status(200).send("successful deletion");
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("Could not remove");
		});
});

const memberEmails = new Set([
	"adrianlam0ho@gmail.com",
	"aryan1801@g.ucla.edu",
	"lama.1421@gmail.com",
	"hana_1421@hotmail.com",
	"nikobahm@gmail.com",
	"kai.becraft@gmail.com",
	"ronanbennett@ucla.edu",
	"cboixo@ucla.edu",
	"josiahjchang@gmail.com",
	"kylejchen@g.ucla.edu",
	"achen2001@g.ucla.edu",
	"mcraig90505@yahoo.com",
	"tdalal@g.ucla.edu",
	"danielsenlorin@gmail.com",
	"daviddeng8@gmail.com",
	"ttdd1234@ucla.edu",
	"adudek@g.ucla.edu",
	"janetfang@ucla.edu",
	"jgolan2001@g.ucla.edu",
	"noahgui@g.ucla.edu",
	"aristotleh@g.ucla.edu",
	"hannahojaiji@ucla.edu",
	"brandonh2@g.ucla.edu",
	"hzhong44@g.ucla.edu",
	"myay.84828@gmail.com",
	"aisara@g.ucla.edu",
	"milok23@ucla.edu",
	"mklein1@g.ucla.edu",
	"utkarshk2002@g.ucla.edu",
	"mattlacaire@gmail.com",
	"lanir@ucla.edu",
	"attil02@g.ucla.edu",
	"blakelazarine@ucla.edu",
	"justinwli@engineering.ucla.edu",
	"brlou@ucla.edu",
	"bryanluo100@gmail.com",
	"abhishek1marda@ucla.edu",
	"briannamccolm@gmail.com",
	"damianmeza1200@gmail.com",
	"martinmo@ucla.edu",
	"shanemonney@g.ucla.edu",
	"puneetnayyar@ucla.edu",
	"alex.pheiffer0@gmail.com",
	"achinthya360@yahoo.com",
	"mrabbani@ucla.edu",
	"rishi.sankar@gmail.com",
	"bschulz267@ucla.edu",
	"sam.shen321@gmail.com",
	"scshen19@g.ucla.edu",
	"esimas@g.ucla.edu",
	"noahpsmall@gmail.com",
	"kimstahov@gmail.com",
	"juliusowen28@g.ucla.edu",
	"akit2129@gmail.com",
	"sharon.tam.gm@gmail.com",
	"christinatong01@g.ucla.edu",
	"naveedtorabzadeh@gmail.com",
	"veszpremi.marcell@gmail.com",
	"alyssavu@g.ucla.edu",
	"1875689740ws@gmail.com",
	"swilen1@g.ucla.edu",
	"katiejwu@ucla.edu",
	"elenewu88@gmail.com",
	"xiexmichelle@gmail.com",
	"charleszhangmb@gmail.com",
	"angelazhang331@ucla.edu",
	"olivertiger0091@g.ucla.edu",
	"jjzhong@ucla.edu",
	"aswerdlow1@gmail.com",
	"avii@g.ucla.edu",
	"johannabai102@ucla.edu",
	"einar.balan@gmail.com",
	"oscarbasuyaux@ucla.edu",
	"mbourdev@ucla.edu",
	"owenburkhardt@gmail.com",
	"lumingcao@ucla.edu",
	"emchang168@g.ucla.edu",
	"jasonc09@g.ucla.edu",
	"schoi10000@ucla.edu",
	"jocunningham@ucla.edu",
	"danieldai@g.ucla.edu",
	"daviddavini@ucla.edu",
	"emirardadeger@ucla.edu",
	"mau91956@g.ucla.edu",
	"james.dingle@me.com",
	"biquando@gmail.com",
	"arnavdoshi@ucla.edu",
	"michaeldu2002@yahoo.com",
	"alexfang06@g.ucla.edu",
	"mfinnessey@ucla.edu",
	"mfiorell@ucla.edu",
	"t.fisher8677@gmail.com",
	"dilara.flor@gmail.com",
	"s118827@icloud.com",
	"courtneygibbons@g.ucla.edu",
	"benjamingoldblatt88@gmail.com",
	"spectraldoy@g.ucla.edu",
	"crg137@g.ucla.edu",
	"trevorguo@ucla.edu",
	"evanhe27@gmail.com",
	"justinoxhu@gmail.com",
	"laurenhunter@ucla.edu",
	"ethantjackson44@gmail.com",
	"triciajain@ucla.edu",
	"linakafadarian@ucla.edu",
	"neilkardan@g.ucla.edu",
	"katerinak429@gmail.com",
	"elonakhoshaba@ucla.edu",
	"hjkim747@g.ucla.edu",
	"teddy1405@g.ucla.edu",
	"derekclee323@g.ucla.edu",
	"jlesny17@gmail.com",
	"nathnana@g.ucla.edu",
	"korayethan@gmail.com",
	"samanthamossuto@ucla.edu",
	"kevinmmoy0@ucla.edu",
	"yui.nadalin2222@gmail.com",
	"ranavarro2@g.ucla.edu",
	"chadnish13@gmail.com",
	"rahulpal321@g.ucla.edu",
	"jaiparera@g.ucla.edu",
	"alexavanh03@ucla.edu",
	"arushramtek@gmail.com",
	"roethan7@gmail.com",
	"jakesager@g.ucla.edu",
	"ksaxton@g.ucla.edu",
	"krishshah@ucla.edu",
	"noojnihs@ucla.edu",
	"penguinking125@gmail.com",
	"katiestone68@gmail.com",
	"aszeto35@gmail.com",
	"kellytamura26@ucla.edu",
	"garywang1024@gmail.com",
	"henrywang3@g.ucla.edu",
	"vicwen02@g.ucla.edu",
	"luwoodhouse@ucla.edu",
	"evanx@g.ucla.edu",
	"jazhu24@g.ucla.edu",
	"azhu231@ucla.edu",
	"foardic@ucla.edu",
	"dillonbroderick@ucla.edu",
	"mrjackburd@gmail.com",
	"mcapetz17@g.ucla.edu",
	"mithilchakraborty1@gmail.com",
	"apchaps73@gmail.com",
	"tchen073@gmail.com",
	"cadendavis@ucla.edu",
	"boranerol@ucla.edu",
	"megango33@ucla.edu",
	"edwinhe03@g.ucla.edu",
	"cho851@g.ucla.edu",
	"ehoff1126@gmail.com",
	"nickidrogo@g.ucla.edu",
	"akhandpur@g.ucla.edu",
	"yashkothari1000@g.ucla.edu",
	"nikikrocken@g.ucla.edu",
	"ellenlarson@ucla.edu",
	"jasonle493@gmail.com",
	"shinyoung.m.lee@gmail.com",
	"jinjaejinjae@gmail.com",
	"morganmason0606@gmail.com",
	"kendallm2201@gmail.com",
	"eugene.min.2003@gmail.com",
	"arathinair@g.ucla.edu",
	"ngdana42@gmail.com",
	"nikki423n@gmail.com",
	"miriam.k.nygren@gmail.com",
	"ninaofitserova@ucla.edu",
	"rokinaka@g.ucla.edu",
	"mpayne6@g.ucla.edu",
	"colinskinner@g.ucla.edu",
	"satyensubramaniam@gmail.com",
	"suriyensubramaniam@gmail.com",
	"andrewtr03@g.ucla.edu",
	"natsubamoto@g.ucla.edu",
	"miavdh@g.ucla.edu",
	"txue25@g.ucla.edu",
	"arthury1207@gmail.com",
	"danieldanyang@gmail.com",
	"jyap26@g.ucla.edu",
	"eyoon1131@gmail.com",
	"alanyu111@g.ucla.edu",
]);

module.exports = userRouter;
