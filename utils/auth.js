const bcrypt = require('bcryptjs');
const out = require('./out');
const jwt = require('jsonwebtoken');

exports.auth = function(req, res, dbcontext){
 dbcontext.user.findOne({
            where:{login: req.body.login}
            }).then(function(user){
                if(!user){
                   out.send(req, res, { success: false, message: 'Authentication failed. User not found.' });
                } else if (user) {
                    bcrypt.compare(req.body.password, user.password, function(err, result){
                        if(result){
                            var token = jwt.sign(user.get({plain: true}), 'superSecret', { expiresIn: 1440 });
                            out.send(req, res, {
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                            });
                        }
                        else{
                            out.send(req, res, { success: false, message: 'Authentication failed. Wrong password.' });
                        }
                    });
                }
            });
};

exports.register = function(req, res, next, dbcontext){
     bcrypt.hash(req.body.password, saltRounds, function(err, hash){
                if(err){
                  throw err;
                }
                dbcontext.user.findOne({
                where:{
                    login: req.body.login
                }
                }).then(function(userOld){
                    if(userOld)
                        out.send(req, res, { success: false, message: 'Registration failed. Login is not unique.' });
                     else if(!userOld){
                         dbcontext.user.create({
                             login:req.body.login,
                             password: hash
                         }).then(function(user){
                           out.send(req, res, {success: true, message: 'User created', login: req.body.login});
                         })
                        
                     }
                        
                });
        });
};

exports.tokenVerify = function(req, res, next){
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, 'superSecret', function(err, decoded){
             if(err){
                return out.send(req, res, {success:false, message:'Failed to authenticate token'});
             }
            else{
                req.decoded = decoded;
                next();
            }
            });
        }
        else{
            return res.status(403).send({
                success: false,
                message: 'No token provided'
            });
        }
    };