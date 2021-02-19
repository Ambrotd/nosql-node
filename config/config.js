const mongoose = require('mongoose');

let app_port = 4000;
//DB data
let mongo_port = 27017;
let mongo_host = "localhost";

let DB = `mongodb://${mongo_host}:${mongo_port}/spsd`;
//Users to populate the db
let users = [
    {
        username: "admin",
        password: "SeCuR3P@sS",
        email: "admin@abt.es",
        role: "admin",
        
    },
    {
        username: "dani",
        password: "weakPass",
        email: "dani@house.es",
        role: "user",
        
    },    
    {
        username: "SuperT",
        password: "password1",
        email: "supert@house.com",
        role: "user",
        
    },
];

//Setting DB schema for user
const schema = mongoose.Schema;

let userSchema = new schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String
    }
},{
    collection: 'users'
});

//Function check login
let loginCheck = (req,res, next) =>{
    if (req.session.user && req.cookies.id){
        res.redirect('/welcome');
    }else{
        next();
    }
};
const User = mongoose.model('User', userSchema)
module.exports ={
    DB,
    app_port,
    users,
    User,
    loginCheck
};
