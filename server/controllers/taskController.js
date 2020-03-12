const { Task } = require('../models');

class Controller{
    static showTask(req, res, next){
        Task.findAll({
            where: {
                UserId: req.user.id
            }
        })
            .then(data=>{
                res.status(200).json(data);
            })
            .catch(err=>{
                next(err);
            })
    }

    static addTask(req, res, next){
        let dataAddTask = {
            title: req.body.title,
            category: req.body.category,
            UserId: req.user.id,
            description: req.body.description
        }

        Task.create(dataAddTask)
            .then(data=>{
                res.status(201).json(data);
            })
            .catch(err=>{
                next(err);
            })
    }

    static showById(req, res, next){
        Task.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data=>{
                if(!data){
                    throw {
                        msg: 'error not found',
                        status: 404
                    }
                }else{
                    res.status(200).json(data)
                }
            })
            .catch(err=>{
                next(err)
            })
    }

    static editTask(req, res, next){
        let dataEdit = {
            title: req.body.title,
            category: req.body.category,
            description: req.body.description
        }

        Task.update(dataEdit, {
            where: {
                id: req.params.id
            }
        })
            .then(data=>{
                res.status(200).json(dataEdit);
            })
            .catch(err=>{
                next(err);
            })
    }

    static deleteTask(req, res, next){
        let dataDeleted;

        Task.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data=>{
                dataDeleted = data;

                return Task.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            })
            .then(data=>{
                if(data===0){
                    throw {
                        msg: 'error not found',
                        status: 404
                    }
                }else{
                    res.status(200).json(dataDeleted);
                }
            })
            .catch(err=>{
                next(err);
            })
    }
}

module.exports = Controller;