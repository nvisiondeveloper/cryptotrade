const con = require('../db_connect')


const register = async (req, res) => {
    const {name,email,password} = req.body;
    con.query("SELECT email,name FROM USERS WHERE email  = ? or name = ?", [email, name], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            req.flash('error', 'User is already exists')
            return res.render('register')

        }
        else {
             con.query("SELECT COUNT(id) as id FROM users", (err, result) => {
                if (err) throw err;
                var id = result[0].id + 1;
                con.query("SELECT * FROM user_keys WHERE id = ?", [id], (err, result) => {

                    if (err) throw err;
                    var sql = "INSERT INTO USERS SET ?";
                    con.query(sql, { name: name, email: email, password: password, privateKey: result[0].privateKey, publicAddress: result[0].publicAddress }, (err, result) => {
                        if (err) throw err;
                        else {
                            req.flash('success', 'User Registered')
                            res.redirect('login')
                        }
                    })

                })

            })
        }
    })

}


const login = async (req, res) => {
    
    const {email,password} = req.body;
    // Ensure the input fields exists and are not empty
    if (email && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        con.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
           
            if (results.length > 0) {
                // Authenticate the user
                req.session.loggedin = true;
                req.session.email = email;
                req.session.name = results[0].name;
                req.session.index = results[0].id;
                req.session.state = results[0].State;
                req.session.country = results[0].Country;
                req.session.address = results[0].Address;
                req.session.city = results[0].City;
                req.session.gender = results[0].gender;
                req.session.privateKey = results[0].privateKey;
                req.session.publicAddress = results[0].publicAddress;
               
                // Redirect to home page
                res.redirect('/dashboard');
            } else {
                req.flash('error', 'Invalid Credential')
                res.redirect('login')
            }
            res.end();
        });
    } else {
        req.flash('warning', 'Enter username or password')
        res.redirect('login');
        res.end();
    }
}

const logout = function (req, res) {
    req.session.destroy();
    res.redirect('/login');
}

const update = function (req, res, next) {
    const { name ,email,id} = req.body;
    var sql = "UPDATE users set name =? , email =?  WHERE id = ?";
    con.query(sql, [name, email, id], (err, result) => {
        if (err) throw err;
        else {
            req.flash('success', 'Data updated Successfully')
            // return res.render('profile',{
            //     name:name,
            //     email:email,
            //     id:id
            // });
            req.session.name = name;
            req.session.email = email;
            res.redirect('settings')
        }
    })
}

const otherdetail = (req, res) => {
    const { gender, state, country,address,city,id} = req.body;

    var sql = "UPDATE users set gender =? , address =?, city = ?, state = ?, country = ?  WHERE id = ?";
    con.query(sql, [gender, address, city, state, country, id], (err, result) => {
        if (err) throw err;
        else {
            req.flash('success', 'Data updated Successfully')
            req.session.state = state;
            req.session.country = country;
            req.session.address = address;
            req.session.city = city;
            req.session.id = id;
            req.session.gender = gender;
            res.redirect('settings')
        }
    })

}

const changepass = (req, res) => {
    var password = req.body.currentpassword;
    var newpass = req.body.newpass;
    var confirmpass = req.body.confirmpass;
    var id = req.body.id;

    var sql = "SELECT * FROM users WHERE id = ? ";
    con.query(sql, [id], (err, result) => {
       
        if (err) throw err;
        else {
            var pass = result[0].password;
            if (pass != password) {
                req.flash('error', 'Your current password is not match')
                res.redirect('settings')
            }
            else if (newpass != confirmpass) {
                req.flash('error', 'passwords do not match')
                res.redirect('settings')
            }
            else {
                var sql = "UPDATE users set password =?  WHERE id = ?";
                con.query(sql, [newpass, id], (err, result) => {
                    if (err) throw err;
                    else {
                        req.flash('success', 'Password change successfully.')
                        res.redirect('settings')
                    }
                })
            }
        }
    })

}
const buy = (req,res)=>{
    const {userid,privateKey,publicAddress,username,coins,currentprice,inr,total}= req.body
    var sql = "INSERT INTO buys SET ?";
    con.query(sql, {userid:userid, privateKey: privateKey, publicAddress: publicAddress, username: username, coinname:coins,curr_price:currentprice,inr:inr,total:total }, (err, result) => {
        if (err) throw err;
        else {
            req.flash('success', 'Hurray! You buy this cryptocurrency')
            res.redirect('pay')
        }
    })
}
module.exports = { 
    buy,
    register, 
    login, 
    logout, 
    update, 
    otherdetail, 
    changepass }