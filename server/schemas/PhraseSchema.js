const mongoose = require('mongoose');

const PhraseSchema = new mongoose.Schema({
	tutoringPhrase: {
		week: {
			type: Number,
			required: true,
		},
		secretPhrase: { 
			type: String,
			required: true, 
		}	
	}
});

module.exports = mongoose.model('Phrase', PhraseSchema);