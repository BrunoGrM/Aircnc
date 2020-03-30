const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId, // gravar o id do usuario que criou o spot
        ref: 'User'
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Spot'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);