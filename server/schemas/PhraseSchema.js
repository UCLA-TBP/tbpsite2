const mongoose = require('mongoose');

const PhraseSchema = new mongoose.Schema({
		week: {
			type: Number,
			index: {
				unique: true
			},
			required: true,
		},
		secretPhrase: { 
			type: String,
			required: true, 
		}	
});

module.exports = mongoose.model('Phrase', PhraseSchema);