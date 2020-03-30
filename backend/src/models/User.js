const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String, // gravar no banco de dados o email do usuário
});

module.exports = mongoose.model('User', UserSchema);