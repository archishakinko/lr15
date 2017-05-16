var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = (user) => {
    return {
        getAll: getAll,
        getOne: getOne,
        del: del
    };
function getAll(req, res){
        return new Promise((resolve, reject) => {
            user.findAll().then((users) => {
                resolve(users);
            });
        });
    }
function getOne(req, res){
        return new Promise((resolve, reject) => {
            user.findOne({
                where:{
                    login:req.params.login
                }
            }).then((user) => {
                resolve(user);
            });
        });
    }
function del(req, res){
    return new Promise((resolve, reject) => {
        user.destroy({
            where:{
                login:req.params.login
            }
        }).then((userd) => {
            if(userd)
                resolve({success:true, message: 'user deleted'});
            else 
                resolve({success:false, message: 'delete error'});
        })  
    });
}
}


