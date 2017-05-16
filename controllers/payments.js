const express = require('express');
const out = require('../utils/out');
 
module.exports = (paymentService)=>{
    const router = express.Router();
    
        router.get('/payments', (req, res) => {
            paymentService.getAll(req, res).then((payments) => {
                out.send(req, res, payments);
            });
        });
        router.post('/payments', (req, res) => {
            paymentService.pay(req, res).then((payments) => {
                out.send(req, res, payments);
            });
        });
        router.get('/payments/:payments', (req, res) => {
            paymentService.getOne(req, res).then((payments) => {
                out.send(req, res, payments);
            });
        });
        router.delete('/payments/:domains', (req, res) => {
            paymentService.del(req, res).then((domain) => {
                out.send(req, res, domain);
            });
        });
        return router;
}