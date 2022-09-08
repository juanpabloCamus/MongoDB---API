const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.post('/', async (req, res) => {
    const {username, name, password} = req.body;

    const user = new User({
        username,
        name,
        passwordHash: password
    })

    const savedUser = await user.save()

    res.send(savedUser)
})

module.exports = usersRouter