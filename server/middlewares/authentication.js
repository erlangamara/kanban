const jwt = require('jsonwebtoken');
const {User} = require('../models');

function authentication(req, res, next){
    token = req.headers.token;
    
    try{
        let verified = jwt.verify(token, process.env.SECRET);
        req.user = verified;
        User.findOne({
            where: {
                id: req.user.id
            }
        })
            .then(data=>{
                if(!data){
                    throw {
                        msg: 'User not found',
                        status: 404
                    }
                }else{
                    next();
                }
            })
    }catch(err){
        next(err);
    }
}

module.exports = authentication;