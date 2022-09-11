const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const authorization = req.get('authorization');
    let token = null;
    let decodedToken = null

    if(authorization  && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken.id){
            return res.status(401).json({ error: 'token missing or invalid' })
        } else{
            const { id: userId } = decodedToken;
            req.userId = userId;
            return next()
        }
    }
    else {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

}