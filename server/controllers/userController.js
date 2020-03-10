const {User} = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

class Controller{
    static register(req, res, next){
        let passHashed;

        let dataRegis = {
            email: req.body.email,
            password: req.body.password
        }

        bcrypt.hash(dataRegis.password, saltRounds)
            .then(function(hash) {
                passHashed = hash

                let dataCreateUser = {
                    email: dataRegis.email,
                    password: passHashed
                }

                return User.create(dataCreateUser)
            })
            .then(data=>{
                res.status(201).json(data);
            })
            .catch(err=>{
                next(err);
            })
    }

    static login(req, res, next){
        let userId;
        
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(data=>{
                console.log(data.password)
                userId = data.id
                return bcrypt.compare(req.body.password, data.password)
            })
            .then(function(result) {
                if(result){
                    let token = jwt.sign({
                        id: userId,
                        email: req.body.email
                    }, process.env.SECRET)

                    res.status(200).json(token);
                }else{
                    throw {
                        msg: 'Wrong password',
                        status: 401
                    }
                }
            })
            .catch(err=>{
                next(err)
            })
    }
}

module.exports = Controller;