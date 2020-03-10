function errorHandler(err, req, res, next){
    if(err.msg === 'error not found'){
        res.status(err.status).json(err.msg);
    }else if(err.msg === 'Wrong password'){
        res.status(err.status).json(err.msg);
    }else{
        res.status(500);
    }
}

module.exports = errorHandler;