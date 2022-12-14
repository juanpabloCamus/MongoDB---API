const usersRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


usersRouter.get('/', async (req, res) => {
    try{
        const users = await User.find().populate('notes', {
            content:1,
            date:1,
            important:1
        });
        res.send(users)
    } catch(e){
        console.log(e);
    }
})

usersRouter.post('/', async (req, res) => {
    const {username, name, password} = req.body;

    const findExistingUsername = await User.findOne({ username });
    if(findExistingUsername !== null) return res.status(400).send('This username already exists!')

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    res.send(savedUser)
})

module.exports = usersRouter    