const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router();
const upload = multer(uploadConfig);

// req -> informações que o usuario está passando para a rota
// res -> resposta do servidor para o cliente

// Buscar dados
/*
routes.get('/users', (req, res) => { // http://localhost:3333/users?idade=20
    return res.json({ idade: req.query.idade });
});

// Atualizar dados
routes.put('/users/:id', (req, res) => { // http://localhost:3333/users/1
    return res.json({ id: req.params.id });
});

// Gravar dados
routes.post('/users', (req, res) => { // http://localhost:3333/users/
    return res.json(req.body);
});
*/

routes.post('/sessions', SessionController.store);

routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.get('/spots', SpotController.index);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);


module.exports = routes; // para exportar as rotas