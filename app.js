const express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const hbs = require('express-handlebars'); 
const path = require('path');
const config = require('./config/config');
const routes = require('./routes/routes');
const { EDESTADDRREQ } = require('constants');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true})
    .then(()=> {console.log('Connected to DB')},
    err => {console.log('Error connecting to DB: '+ err)}
);

const app = express();
//app.use(express.static('static'));
app.use(session({
    key: 'id',
    secret: 'SuperSecureKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
//Create template engine
app.engine('hbs',hbs({extname: 'hbs',defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
//remove previous cookies
console.log
app.use((req, res, next)=>{
    if(req.cookies.id && !req.session.user){
        res.clearCookie('id');
    }
    next();
});

app.use('/', routes);

const server = app.listen(config.app_port, ()=> {
    console.log(`Server running on port ${config.app_port}`);
})

