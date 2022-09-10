const jwt = require('jsonwebtoken');
const bcrypt =  require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/User.js');

loginRouter.post('/', async (req, res) => {

    const {username, password} = req.body;

    try {
        const user = await User.findOne({ username });

        const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash);

        if(!(user && passwordCorrect)) {
            return res.status(401).json({
                error: 'invalid user or password'
            })
        }

        const userForJwt = {
            id:user._id,
            username: user.username
        }

        const token = jwt.sign(userForJwt, process.env.JWT_SECRET);

        return res.send({
            name: user.name,
            username: user.username,
            token
        })
    
    } catch (error) {
        console.error(error);
    }
})

module.exports = loginRouter;