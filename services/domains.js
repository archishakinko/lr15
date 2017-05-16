const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));

module.exports = (domain) => {
    return {
        register: register, 
        check: check,
        getAll: getAll,
        del: del
    };
function register(req, res){
    return new Promise((resolve, reject)=>{
        check(req, res).then((message) => {
            if(message.success){
                domain.create({
                    domain: req.body.domain
                }).then((domain) => {
                    resolve({success: true, message:'domain registrated'});
                });
            }else{
                resolve(message);
            }
        });
    });
}
    function check(req, res){
        return new Promise((resolve, reject)=>{
            var str;
            if(req.body.domain)
                str = req.body.domain;
            if(req.params.domain)
                str = req.params.domain;
             needle.getAsync('https://api.domainr.com/v2/status?domain='+str+'&client_id=fb7aca826b084569a50cfb3157e924ae',{headers:{'Origin':'https://www.namecheap.com'}})
        .then((data)=>{
            if(data.body.status[0].summary == 'inactive'){
                domain.findAll({
                    where:{
                        domain: str
                    }
                }).then((old)=>{
                    if(old.length == 0){
                        resolve({domain: str, success: true, message: 'domain is unique'});
                    }else{
                         resolve({domain: str, success: false,message:'domain is not unique in db'});
                    }
                });
            }else{
                resolve({domain: str, success: false, message:'domain is not unique on site'});
            }
        });
        })
    }
    function getAll(req, res){
        return new Promise((resolve, reject) => {
            var limit1 = 10, offset1 = 0;
            if(req.query.limit)
                limit1 = parseInt(req.query.limit);
            if(req.query.offset)
                offset1= parseInt(req.query.offset);
            domain.findAndCountAll({ limit: limit1, offset: offset1, raw: true})
            .then((domains) => {
                var choto = {data:domains.rows, meta: {limit: limit1, offset:offset1, all: domains.count} };
                console.log(choto);
                resolve(choto);
            });
        });
    }

     function del(req, res){
        return new Promise((resolve, reject) => {
            domain.destroy({
                where:{
                    domain:req.params.domain
                }
            }).then((domains) => {
                if(domains)
                    resolve({success:true, message: 'domain deleted'});
                else
                    resolve({success:false, message: 'delete error'});
            });
        });
    }
};