const express = require('express'); 
const phraseRouter = express.Router();
const Phrase = require('../schemas/PhraseSchema');
const bodyParser = require('body-parser')
const app = express()

phraseRouter.post('/set-phrase', (req, res) => {
		const { week, secretPhrase } = req.body; 
    console.log(week, secretPhrase);
		Phrase.findOne({week:week})
			.then((phrase) => {
				if(phrase){
          console.log(secretPhrase)
          Phrase.findByIdAndUpdate({_id: phrase._id}, {secretPhrase:secretPhrase})
					.then((updated) => {
            console.log(updated)
						res.status(200)
        		res.send("Successfully updated phrase")
					})
					.catch(() => {
						res.status(500).json({
							message: { msgBody: 'Cannot set phrase', msgError: true },
						});
					});
				}
			else {
					const newPhrase = Phrase({week: week, secretPhrase:secretPhrase}); 
          console.log(newPhrase)
					newPhrase
						.save()
						.then(() => {
							res.status(200)
							res.send("Successfully updated phrase")
						})
						.catch((err) => {
              console.log(err);
							res.status(500).json({
								message: { msgBody: 'Cannot set phrase', msgError: true },
							});
						});
					}
				})
			.catch((err) => {
				res.status(500).json({
					message: { msgBody: 'Cannot set phrase', msgError: true },
				});
			});
	});	

phraseRouter.get('/get-phrase/:week', (req, res) => {
	Phrase.findOne({week:req.params.week},{_id:0, secretPhrase:1})
	.then((phrase) => {
		console.log(phrase)
		res.send(phrase)
	})
	.catch((err) => {
		console.log(err);
		res.status(500).send('Could not retrieve phrase by id from database');
	});
});
module.exports = phraseRouter;