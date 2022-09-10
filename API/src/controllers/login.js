const bcrypt =  require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/User.js');

loginRouter.post('/', async (req, res) => {

    const {username, password} = req.body;

    try {
        const user = await User.findOne({ username });

        const passwordCorrect = user === null
        ? false
        : bcrypt.compare(password, user.passwordHash);

        if(!passwordCorrect) {
            res.status(401).json({
                error: 'invalid user or password'
            })
        }

        res.send({
            name: user.name,
            username: user.username
        })


    } catch (error) {
        console.error(error);
    }
})

module.exports = loginRouter;