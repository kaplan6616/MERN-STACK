const HttpError = require("../models/http-error");
const uuid = require('uuid/v4');
const User = require("../models/user")
const getUsers = async(req,res,next) => {
    let users = null;
    try {
        users = await User.find({},"email name"); // or User.find({},"-password");
    } catch (error) {
        return next(new HttpError("Something went wrong while getting users",500));
    }
    res.json({users:users.map(u=>u.toObject({
        getters:true
    }))})
}

const login = async(req,res,next) => {
    const {email,password} = req.body;
    let identifiedUser = null;
    try {
        identifiedUser = await User.findOne({email:email});
    } catch (error) {
        return next(new HttpError("Something went wrong",500));
    } 
    if(!identifiedUser){
        return next(new HttpError("Could not identify user",401));
    }else{
        if(identifiedUser.password === password){
            res.json({user:identifiedUser,message:"Logged In"});
        }
        else{
            return next(new HttpError("Password is wrong",401));
        }
    }

}


const signup = async(req,res,next) => {
    const {name,email,password} = req.body;
    let existingUser = null;
    try {
        existingUser = await User.findOne({email:email});
    } catch (error) {
        return next(new HttpError("Something went wrong",500));
    }

    if(existingUser){
        return next( new HttpError("Could not create user with that email. E-mail has aldready taken",401));
    }
    const createdUser = new User({
        name:name,
        email:email,
        image:'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
        password:password,
        places:[]
    })
    try {
        await createdUser.save();
    } catch (error) {
        return next(new HttpError("Something went wrong while signing up in save",500));
    }
    res.status(201).json({user:createdUser.toObject({
        getters:true
    })}); // getters true remove _ from id property
}


exports.getUsers = getUsers;
exports.login= login;
exports.signup= signup;


// Throwing HTTP error is not the correct way. return new() must use. While throwing Http error sometimes not working.