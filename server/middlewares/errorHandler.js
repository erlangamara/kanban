function errorHandler(err, req, res, next){
    if(err.msg === 'error not found'){
        res.status(err.status).json({error: err.msg});
    }else if(err.msg === 'Wrong password'){
        res.status(err.status).json({error: err.msg});
    }else if(err.msg === 'User not found'){
        res.status(err.status).json({error: err.msg});
    }else if(err.msg === 'Not authorized'){
        res.status(err.status).json({error: err.msg});
    }else{
        res.status(500);
    }
}

module.exports = errorHandler;