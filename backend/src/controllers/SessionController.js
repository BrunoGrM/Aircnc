// PADRÃO DE MÉTODOS NOS CONTROLLERS
// index, show, store, update, destroy
const User  = require('../models/User');

module.exports = {
    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({ email }); // verifica se já existe um usuário com esse email no banco

        if (!user) {
            user = await User.create({ email }); // await serve pra instrução só passar para a próxima linha quando terminar a execução dessa
        }
        
        return res.json(user);
    }
};