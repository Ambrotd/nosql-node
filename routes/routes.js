const express = require('express');
const app = express();
const routes = express.Router();
const {loginCheck} = require('../config/config');

let {User, users} = require('../config/config');

let temp= {username:'', loggedin: false};


routes.route('/').get((req,res)=>{
    res.render('index')
});
//Populate users
routes.route('/populate').get((req,res)=>{
    //delete previous  data
    User.deleteMany({}, (err)=>{});
    for ( let i=0; i < users.length; i++){
        user = new User(users[i]);
        console.log(`Adding user ${user}`);
        user.save();
    }
    res.render('populate', { title: 'Populated DB', message: 'DB populated with ' + users.length + ' users.' })
});

routes.route('/login')
    .get(loginCheck,(req,res)=>{
        res.render('login');
    })
    .post((req,res) => {
        let username = req.body.username;
        let passwd = req.body.password;
        let query ={
            username,
            password: passwd
        }
        User.find(query, (err, user)=>{
            if (err){
                console.log(err);
                res.redirect('/');
            }else{
                console.log(user);
                if (user.length >=1){
                    req.session.user=user;
                    req.cookies=user;
                    res.redirect('/welcome');
                }else{
                    res.render('login',{wrongLogin: true});
                }
            }
        });
    });

routes.route('/logout').get((req,res)=>{
    if(req.session.user && req.cookies.id){
        temp.loggedin =false;
        res.clearCookie('id');
        res.redirect('/');
    }else{
        res.redirect('/login');
    }

})

routes.route('/welcome').get((req,res)=>{
    console.log(req.session.user, req.cookies.id)
    if (req.session.user && req.cookies.id){
        temp.loggedin=true;
        temp.username = req.session.user[0].username;
        res.render('welcome', temp);
    }else{
        res.redirect('/login');
    }
});

module.exports = routes;