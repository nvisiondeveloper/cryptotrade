const express = require('express')
const router = express.Router()
const flash = require('express-flash')
const con = require('../db_connect')
const { register, 
    login, 
    logout,
    update ,
    otherdetail,
    changepass} = require('../Controllers/auth');

const { trade,
    pay,
    profile,
    settings,
    getcoin,
    dashboard} = require('../Controllers/index');

// Index page route
router.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('dashboard', {
            title: "Dashboard",
            name: req.session.email,
        });
    }
    else {
        res.render('login')
    }
})

//register page route
router.get('/register', (req, res) => {
    res.render('register')
})

//login page route
router.get('/login', (req, res) => {
    res.render('login')
})


//authentication routes
router.post('/login', login)
router.post('/register', register)
router.get('/logout', logout)
router.post('/update', update)
router.post('/changepass',changepass)
router.post('/otherdetail',otherdetail)


// logged in user routes
router.get('/dashboard',dashboard)
router.get('/trade', trade)
router.get('/pay', pay)
router.get('/profile', profile)
router.get('/settings',settings)
router.get('/:id',getcoin)


module.exports = router