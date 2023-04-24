const express = require('express'); 
const phraseRouter = express.Router();
const Phrase = require('../schemas/PhraseSchema');

phraseRouter.post('/set-phrase', (req, res) => {
		const { week } = req.body; 
		Phrase.findOne(week)
			.then((phrase) => {
				if(phrase){
					phrase.update(week, secretPhrase)
					.then(() => {
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
					const newPhrase = Phrase(req.body); 
					newPhrase
						.save()
						.then(() => {
							res.status(200)
							res.send("Successfully updated phrase")
						})
						.catch(() => {
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

module.exports = phraseRouter;