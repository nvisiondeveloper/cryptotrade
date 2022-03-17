const { Result } = require('postcss');
const con = require('../db_connect')

const trade = (req, res) => {
    if (req.session.loggedin) {
        res.render('trade', {
            title: "trade",
            name: req.session.name,
            active2: true
        });
    }
    else {
        req.flash('info', 'Please First Login');
        res.redirect('login')
    }
}

const pay = (req, res) => {
    if (req.session.loggedin) {
       
        console.log(req.session.coins);
            res.render('pay', {
                title: "pay",
                id:req.session.index,
                name: req.session.name,
                privateKey : req.session.privateKey,
                publicAddress: req.session.publicAddress,
                coin:req.session.coins,                
                active3: true
            });
     
       
    }
    else {
        req.flash('info', 'Please First Login');
        res.redirect('login')
    }
}

const profile = (req,res) =>{
    if (req.session.loggedin) {
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
            active4:true
        });
    }
    else {
        req.flash('info', 'Please First Login');
        res.redirect('login')
    }
}

const settings = (req,res)=>{
    if (req.session.loggedin) {
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
        });
    }
    else {
        req.flash('info', 'Please First Login');
        res.redirect('login')
    }
}
const getcoin = (req,res)=>{
    var id = req.params.id;
    res.render('coin_details',{
        name: req.session.name,
        email:req.session.email,
        id:id
    })
}
const dashboard = (req, res) => {
    if (req.session.loggedin) {
        req.flash('success', 'Welcome to CryptoTrade');
        res.render('dashboard', {
            title: "Dashboard",
            name: req.session.name,
            privateKey : req.session.privateKey,
            publicAddress: req.session.publicAddress,
            active1: true
        });
    }
    else {
        req.flash('info', 'Please First Login');
        res.redirect('login')
    }
}

module.exports = {
    trade,
    pay,
    profile,
    settings,
    getcoin,
    dashboard}