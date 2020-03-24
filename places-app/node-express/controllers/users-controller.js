const HttpError = require("../models/http-error");
const uuid = require('uuid/v4');
const DUMMY_USERS = [
    {
      id: 'u1',
      name: 'Sinan Kaplan',
      email: "test@test.com",
      places: 3,
      password:"12345"
    }
];

const getUsers = (req,res,next) => {
    res.json({users:DUMMY_USERS})
}

const login = (req,res,next) => {
    const {email,password} = req.body;
    const identifiedUser = DUMMY_USERS.find(u =>{
        if(u.email === email && u.password === password){
            return u;
        }
    });
    if(!identifiedUser){
        throw new HttpError("Could not identify user",401);
    }
    res.json({user:identifiedUser,message:"Logged In"});

}


const signup = (req,res,next) => {
    const {name,email,password,places} = req.body;
    const hasUser = DUMMY_USERS.find(u=>{
        if(u.email === email){
            return u;
        }
    })
    if(hasUser){
        throw new HttpError("Could not create user with that email. E-mail has aldready taken",401);
        return;
    }
    const createdUser = {
        id : uuid(),
        name : name,
        email : email,
        password : password,
        places: 0
    }
    DUMMY_USERS.push(createdUser);
    res.status(201).json({user:createdUser});
}


exports.getUsers = getUsers;
exports.login= login;
exports.signup= signup;
