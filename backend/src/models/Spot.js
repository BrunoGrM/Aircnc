const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String, 
    price: Number,
    techs: [String], // array de strings
    user: {
        type: mongoose.Schema.Types.ObjectId, // gravar o id do usuario que criou o spot
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    }
});

SpotSchema.virtual('thumbnail_url').get(function() {
    return `http://192.168.1.112:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema);