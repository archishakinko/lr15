const express = require('express');
const out = require('../utils/out');
 
module.exports = (domainService)=>{
    const router = express.Router();
    
        router.post('/domains', (req, res) => {
            domainService.register(req, res).then((message)=>{
                out.send(req, res, message);
            });
        });
        router.get('/domains/:domains', (req, res) => {
            domainService.check(req, res).then((message) => {
                out.send(req, res, message);
            });
        });
        router.get('/domains', (req, res) => {
            domainService.getAll(req, res).then((domains) => {
                out.send(req, res, domains);
            });
        });
        router.delete('/domains/:domains', (req, res) => {
            domainService.del(req, res).then((domains) => {
                out.send(req, res, domains);
            });
        });
        return router;
}