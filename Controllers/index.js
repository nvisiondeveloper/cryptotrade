
const con = require('../db_connect')

const trade = (req, res) => {
    let admin;
    if(req.session.isadmin == 1)
    {
        admin = true;   
    }
    else{
        admin = false;
    }
        res.render('trade', {
            title: "trade",
            name: req.session.name,
            active2: true,
            admin
        });
}

const pay = (req, res) => {
    let admin;
    if(req.session.isadmin == 1)
    {
        admin = true;   
    }
    else{
        admin = false;
    }
            res.render('pay', {
                title: "pay",
                id:req.session.index,
                name: req.session.name,
                privateKey : req.session.privateKey,
                publicAddress: req.session.publicAddress,
                coin:req.session.coins,                
                active3: true,
                admin
            });
}

const profile = (req,res) =>{
    let admin;
    if(req.session.isadmin == 1)
    {
        admin = true;   
    }
    else{
        admin = false;
    }
        res.render('profile', {
            title: "profile",
            name: req.session.name,
            email:req.session.email,
            id:req.session.index,
            address:req.session.address,
            state:req.session.state,
            city:req.session.city,
            country:req.session.country,
            gender:req.session.gender,
            active4:true,
            admin
        });
}

const settings = (req,res)=>{
    let admin;
    if(req.session.isadmin == 1)
    {
        admin = true;   
    }
    else{
        admin = false;
    }
    res.render('settings', {
            title: "settings",
            name: req.session.name,
            email:req.session.email,
            id:req.session.index,
            address:req.session.address,
            state:req.session.state,
            city:req.session.city,
            country:req.session.country,
            gender:req.session.gender,
            admin,
    });   
}
const getcoin = (req,res)=>{
    let admin;
    if(req.session.isadmin == 1)
    {
        admin = true;   
    }
    else{
        admin = false;
    }
    var id = req.params.id;
    res.render('coin_details',{
        name: req.session.name,
        email:req.session.email,
        id:id,
        admin,
    })
}
const dashboard = (req, res) => {
    let admin;
    if(req.session.isadmin == 1)
    {
        admin = true;   
    }
    else{
        admin = false;
    }
   
    // req.flash('success', 'Welcome to CryptoTrade');
    res.render('dashboard', {
        title: "Dashboard",
        name: req.session.name,
        privateKey : req.session.privateKey,
        publicAddress: req.session.publicAddress,
        active1: true,
        admin,
    });
}

module.exports = {
    trade,
    pay,
    profile,
    settings,
    getcoin,
    dashboard}