var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = (payment, user, domain) => {
    return {
        pay: pay,
        getAll: getAll,
        getOne: getOne,
        del: del
    };
    function pay(req, res){
        return new Promise((resolve, reject) => {
            user.findOne({
                where:{
                    login: req.body.login
                }
            }).then(function(user){
                if(user){
                   domain.findOne({
                        where:{
                            domain: req.body.domain
                        }
                }).then(function(domain){
                    if(domain){
                         payment.create({
                            domain: req.body.domain,
                            userId: req.body.login  
                        }).then(function(domain){
                            resolve({success: true, message: 'payment success'});
                        });
                    }else{
                        resolve({success: false, message:'no domain found'});
                    }
                    });  
                } else {
                    resolve({success: false, message: 'no login found'});
                }
                   
                });            
            });
        };

    function getAll(req, res){
            return new Promise((resolve, reject) => {
                payment.findAll().then((payments) => {
                    resolve(payments);
                });
            });
        };

    function getOne(req, res){
            return new Promise((resolve, reject) => {
                payment.findOne({
                    where:{
                        domain: req.params.domain
                    }
                }).then((payment) => {
                    resolve(payment);
                });
            });
        };
    function del(req, res){
        return new Promise((resolve, reject) => {
            payment.destroy({
                where:{
                    domain:req.params.domain
                }
            }).then((paymentd) => {
                if(paymentd)
                    resolve({success:true, message: 'payment deleted'});
                else 
                    resolve({success:false, message: 'delete error'});
            })  
        });
    }
}


