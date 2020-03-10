const { Task } = require('../models');

function authorization(req, res, next){
    Task.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(data=>{
            if(data.UserId === req.user.id){
                next()
            }else{
                throw {
                    msg: 'Not authorized',
                    status: 401
                }
            }
        })
        .catch(err=>{
            next(err)
        })
}

module.exports = authorization;