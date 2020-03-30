// PADRÃO DE MÉTODOS NOS CONTROLLERS
// index, show, store, update, destroy
const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) { 
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({ 
            user: user_id,
            spot: spot_id,
            date,
        });

        await booking.populate('spot').populate('user').execPopulate(); // trazer os dados completos dos ids passados na rota (do user e do spot)

        const ownerSocket = req.connectedUsers[booking.spot.user];

        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
};