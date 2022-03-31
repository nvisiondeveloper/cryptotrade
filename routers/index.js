const express = require('express')
const router = express.Router();
const {body} = require('express-validator');
const con = require('../db_connect');
const { isAuth,isAdmin } = require('../middlewares/verifyToken');
const { register, 
    login, 
    logout,
    update ,
    otherdetail,
    changepass,
    buy} = require('../Controllers/auth');

const { trade,
    pay,
    profile,
    settings,
    getcoin,
    dashboard} = require('../Controllers/index');



// Index page route
router.get('/' ,(req, res) => {
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

//login route and validation

router.post('/login', [ body('email',"Invalid email address")
.notEmpty()
.escape()
.trim().isEmail(),
body('password',"The Password must be of minimum 8 characters length").notEmpty().trim().isLength({ min: 8 }),
],login)

//register validation and route

router.post('/register',[body('name',"The name must be of minimum 5 characters length")
.notEmpty()
.escape()
.trim()
.isLength({ min: 5 }),
body('email',"Invalid email address")
.notEmpty()
.escape()
.trim().isEmail(),
body('password',"The Password must be of minimum 8 characters length").notEmpty().trim().isLength({ min: 8 }),], register)


router.get('/logout', logout)
router.post('/update', update)
router.post('/changepass',changepass)
router.post('/otherdetail',otherdetail)





// logged in user routes
router.get('/trade/:id',isAuth,getcoin)
router.get('/dashboard',isAuth,dashboard)
router.get('/trade', isAuth,trade)
router.get('/pay',isAuth, pay)
router.get('/profile', isAuth,profile)
router.get('/settings',isAuth,settings)



//for buying coins routes
router.post('/buy',buy)



module.exports = router