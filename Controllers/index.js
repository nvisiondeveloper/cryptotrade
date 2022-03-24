const { Result } = require('postcss');
const con = require('../db_connect')

const trade = (req, res) => {
        res.render('trade', {
            title: "trade",
            name: req.session.name,
            active2: true
        });
}

const pay = (req, res) => {
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

const profile = (req,res) =>{
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

const settings = (req,res)=>{
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
const getcoin = (req,res)=>{
    var id = req.params.id;
    res.render('coin_details',{
        name: req.session.name,
        email:req.session.email,
        id:id
    })
}
const dashboard = (req, res) => {
    // req.flash('success', 'Welcome to CryptoTrade');
    res.render('dashboard', {
        title: "Dashboard",
        name: req.session.name,
        privateKey : req.session.privateKey,
        publicAddress: req.session.publicAddress,
        active1: true
    });
}

module.exports = {
    trade,
    pay,
    profile,
    settings,
    getcoin,
    dashboard}