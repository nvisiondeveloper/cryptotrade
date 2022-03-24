const jwt = require('jsonwebtoken');
const conn = require('../db_connect')

exports.isAuth = async (req,res,next) => {

    try{

        if(!req.cookies.jwt
        ){
            req.flash('error','Access Denied')
            return res.redirect('login')
        }

        const theToken = req.cookies.jwt;
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

        conn.query(
            "SELECT * FROM `users` WHERE `id`=?",
            [decoded.id],function(err,results){
                if(err) throw err;
                if(results.length > 0){ 
                req.session.email = results[0].email;
                req.session.name = results[0].name;
                req.session.index = results[0].id;
                req.session.state = results[0].State;
                req.session.country = results[0].Country;
                req.session.address = results[0].Address;
                req.session.city = results[0].City;
                req.session.gender = results[0].gender;
                req.session.privateKey = results[0].privateKey;
                req.session.publicAddress = results[0].publicAddress;
                next();
             }
            }
        );

      
       
    }
    catch(err){
        next(err);
    }
}