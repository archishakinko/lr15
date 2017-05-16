const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = (usersService, domainService, paymentService)=>{
    const router = express.Router();
    const userController = require('./users')(usersService);
    const domainController = require('./domains')(domainService);
    const paymentController = require('./payments')(paymentService);

    router.use('/', userController);
    router.use('/', domainController);
    router.use('/', paymentController);
    
    return router;
}