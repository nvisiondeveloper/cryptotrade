const exp = require('constants')
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3001
const con = require('./db_connect')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const flash = require('express-flash');
dotenv.config({path:'./.env'});
var hbs = require('hbs');
//template engine

app.set('view engine','hbs')
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
//public directory path

const publicDirectory = path.join(__dirname,'./public/assets/')

app.use(express.static(publicDirectory))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser());
app.use(flash())

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({ 
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay }
}))
//routes

app.use('/',require('./routers/index'))

//server starting
app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`)
})