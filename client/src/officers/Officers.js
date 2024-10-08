import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";

const HEADSHOT_LINK =
	"https://res.cloudinary.com/dp7hitkpy/image/upload/f_auto,q_auto/v1/Headshots/bvls0rg0ttfb9bzb7nhi";
// "https://www.seas.ucla.edu/bmesociety/photos/UCLA%20Photos/images/Tau%20Beta%20Pi%20Bent%20(1)_JPG.jpg";
// "https://media.licdn.com/dms/image/D5603AQH4oejoODZa1g/profile-displayphoto-shrink_800_800/0/1671194852878?e=2147483647&v=beta&t=akMT2ttozjF3arWJXFQCBZDnNa989eRIgnlu2mJE7f4";

const COMMITTEES = [
	"President",
	"VP",
	"AO",
	"Corporate",
	"EMCC",
	"MC",
	"Projects",
	"Publicity",
	"Secretary",
	"Social",
	"Treasurer",
	"Tutoring",
	"Webmaster",
	"Ethics",
];

const COMMITTEE_NAMES = {
	President: "President",
	VP: "Vice President",
	AO: "Academic Outreach",
	Corporate: "Corporate",
	EMCC: "Education Outreach",
	MC: "Member Coordinator",
	Projects: "Projects",
	Publicity: "Publicity",
	Secretary: "Secretary",
	Social: "Social",
	Treasurer: "Treasurer",
	Tutoring: "Tutoring",
	Webmaster: "Webmaster",
	Ethics: "Ethics",
};

const COMMITTEE_EMAILS = {
	President: "uclatbp.president@gmail.com",
	VP: "uclatbp.vp@gmail.com",
	AO: "uclatbp.ao@gmail.com",
	Corporate: "uclatbp.corporate@gmail.com",
	EMCC: "uclatbp.educoutreach@gmail.com",
	MC: "uclatbp.mc@gmail.com",
	Projects: null,
	Publicity: "uclatbp.publicity@gmail.com",
	Secretary: "uclatbp.secretary@gmail.com",
	Social: "uclatbp.social@gmail.com",
	Treasurer: "uclatbp.treasurer@gmail.com",
	Tutoring: "uclatbp.tutoring@gmail.com",
	Webmaster: "uclatbp.webmaster@gmail.com",
	Ethics: "uclatbp.ethics@gmail.com",
};

function Officers() {
	const [officers, setOfficers] = useState([]);

	useEffect(() => {
		function getOfficers() {
			fetch("/api/user/get-officers")
				.then((res) => res.json())
				.then((data) => {
					setOfficers(data);
				});
		}
		getOfficers();
	}, []);

	return (
		<Container sx={{ paddingBottom: "100px" }}>
			<Typography variant="h1" mt={10} mb={0}>
				Officers
			</Typography>

			<div>
				<Typography variant="p" mt={2}>
					For any questions or comments, feel free to email us at{" "}
					<a href="mailto:ucla.tbp@gmail.com">ucla.tbp@gmail.com</a>.
				</Typography>
				<Typography variant="p">
					Having issues with the site? Send an email to the webmasters at{" "}
					<a href="mailto:uclatbp.webmaster@gmail.com">
						uclatbp.webmaster@gmail.com
					</a>
					.
				</Typography>
				<Typography variant="p">
					You can also stop by the Tau Beta Pi tutoring room on the 6th floor of
					Boelter (Room 6266) if you want to say hi!
				</Typography>
			</div>

			{COMMITTEES.map((committee) => {
				return (
					<CommitteeMembersSection
						officers={officers}
						committee={committee}
						key={committee}
					/>
				);
			})}
		</Container>
	);
}

function CommitteeMembersSection({ officers, committee }) {
	let committeeMembers = officers.filter((person) => {
		return person.committees[committee];
	});

	if (committeeMembers.length === 0) {
		return null;
	}

	let committeeName = COMMITTEE_NAMES[committee];
	let committeeEmail = COMMITTEE_EMAILS[committee];

	return (
		<>
			<Typography variant="h2" mt={3} mb={0}>
				{committeeName}
			</Typography>
			{committeeEmail ? (
				<Typography variant="p" mb={2}>
					Contact: <a href={"mailto:" + committeeEmail}>{committeeEmail}</a>
				</Typography>
			) : null}
			<Grid container spacing={4}>
				{committeeMembers.map((person, index) => {
					let postions = [];
					for (let key in person.committees) {
						if (person.committees[key]) {
							postions.push(key);
						}
					}

					let positionsString = postions.join(", ") || "Officer";

					return (
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
							lg={3}
							key={index}
							mt={0}
							pt={0}
							p={0}
						>
							<Box
								sx={{
									borderRadius: "20px",
									backgroundColor: "black",
									marginTop: "10px",
								}}
								p={1}
							>
								<img
									src={person?.headshot?.url || HEADSHOT_LINK}
									alt="headshot"
									style={{
										width: "100%",
										aspectRatio: "1/1",
										objectFit: "cover",
										borderRadius: "12px",
									}}
								/>

								<Box p={1}>
									<Typography
										variant="h3"
										mt={0}
										mb={0.5}
										color="primary"
										sx={{
											fontWeight: "bold",
											fontSize: "1.5rem",
										}}
									>
										{person?.name?.first} {person?.name?.last}
									</Typography>

									<Typography
										variant="h6"
										color="secondary"
										sx={{
											fontSize: "1rem",
										}}
									>
										{positionsString}
									</Typography>
								</Box>
							</Box>
						</Grid>
					);
				})}
			</Grid>
		</>
	);
}

export default Officers;
