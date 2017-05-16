const express = require('express');
const out = require('../utils/out');

module.exports = (userService)=>{
    const router = express.Router();

        router.get('/users', (req, res) => {
            userService.getAll(req, res).then((users) => {
                out.send(req, res, users);
            });
        });
        router.get('/users/:login', (req, res) => {
            userService.getOne(req, res).then((users) => {
                out.send(req, res, users);
            });
        });
        router.delete('/users/:login', (req, res) => {
            userService.del(req, res).then((users) => {
               out.send(req, res, users);
            });
        });
       
    return router;
}