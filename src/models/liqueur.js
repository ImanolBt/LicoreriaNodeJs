const mongoose = require('mongoose');
const liqueurSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    degreeOfAlcohol: {
        type: Number,
        required: true
    },
    manufacturingDate: {
        type: Date,
        required: true

    }
});



module.exports = mongoose.model('Liqueur', liqueurSchema);
