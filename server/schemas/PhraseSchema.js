const mongoose = require('mongoose');

const PhraseSchema = new mongoose.Schema({
	tutoringPhrase: {
		type: [
			{
				week: { type: Number },
				secretPhrase: { type: String },
			},
		],
		default: [],
	},
});

module.exports = mongoose.model('Phrase', PhraseSchema);