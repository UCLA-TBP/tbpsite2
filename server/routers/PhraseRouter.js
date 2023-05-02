const express = require('express'); 
const phraseRouter = express.Router();
const Phrase = require('../schemas/PhraseSchema');
{
phraseRouter.post('/set-phrase', (req, res) => {
		const { week, secretPhrase } = req.body?.tutoringPhrase; 
    console.log(week, secretPhrase);
		Phrase.findOne({week:week})
			.then((phrase) => {
				if(phrase){
					phrase.update(week, secretPhrase)
					.then(() => {
						res.status(200)
        		res.send("Successfully updated phrase")
					})
					.catch(() => {
            console.log('here');
						res.status(500).json({
							message: { msgBody: 'Cannot set phrase', msgError: true },
						});
					});
				}
			else {
          // console.log(req.body)
					const newPhrase = Phrase(req.body); 
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
        console.log('here3');
				res.status(500).json({
					message: { msgBody: 'Cannot set phrase', msgError: true },
				});
			});
	});
}
module.exports = phraseRouter;