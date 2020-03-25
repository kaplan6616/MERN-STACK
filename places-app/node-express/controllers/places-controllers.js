const HttpError = require("../models/http-error");
const uuid = require('uuid/v4');
const Place = require("../models/place");
const User = require("../models/user");
const mongoose = require('mongoose');

const getPlaceById = async(req,res,next) => {
    const placeId = req.params.pid;
    try {
        let place = await Place.findById(placeId).exec(); //makes it a real promise
        if(!place){
            throw new HttpError('Could not find a place for the provided id',404);;
        }else{
            res.json({place:place.toObject({
                getters:true
            })});// this code block returns the result to javascript object.
        }
    } catch (e) {
        throw new HttpError("Something went wrong",500);
    }
}

const getPlacesByUserId = async(req,res,next) => {
    const userId = req.params.uid;
    let userWithPlaces = null;
    try {
        // let places = await Place.find({creator:userId}).exec();
        userWithPlaces = await User.findById(userId).populate("places");
        if(userWithPlaces.length === 0){
            next(new HttpError('Could Not Find a places for the provided user id.',404));
        }else{
            res.json({places:userWithPlaces.places.map(place=>place.toObject({
                getters:true
            }))}); // this code block returns the result to javascript object.
        }
    } catch (e) {
        console.log(e)
        throw new HttpError("Something went wrong",500);
    }
};

const createPlace = async (req,res,next) => {
    const {title,description,coordinates,address,creator,image} = req.body;

    const newPlace = new Place({
        title:title,
        description:description,
        location:coordinates,
        address:address,
        creator:creator,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    })
    let user = null;
    try {
        user = await User.findById(creator)
    } catch (error) {
        return next(new HttpError ("Creating place failed",500));
    }
    if(!user){
        return next(new HttpError ("User could not find provided by id",404));
    }
    try {
        // session used in here because if any of these transaction returns an error all of these action will undo automatically
        // In transaction, transactions cannot create collections automatically. We have to create it manually
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await newPlace.save({session:sess});
        user.places.push(newPlace); // in here mongoose automatically adds only place id
        await user.save({session:sess});
        sess.commitTransaction();
        res.status(201).json({place:newPlace});
    } catch (e) {
        console.log(e);
        return next(new HttpError ("Creating place failed",500));
    }
};

const updatePlace = async(req,res,next) => {
    const {title,description} = req.body;
    const placeId = req.params.pid;
    let place = null;
    try {
        place = await Place.findById(placeId).exec(); //makes it a real promise
    } catch (e) {
        return next(new HttpError("Something went wrong",500));
    }

    place.title = title;
    place.description = description;
    try {
        await place.save();
    } catch (error) {
        return next(new HttpError("Something went wrong",500));
    }
    res.status(200).json({place:place.toObject({
        getters:true
    })});
};


const deletePlace = async(req,res,next) => {
    const placeId = req.params.pid;
    let place = null;
    try {
        place = await Place.findById(placeId).populate("creator"); // populate means it searchs everywhere which we ref to Place model. 
    } catch (error) {
        return next(new HttpError("Something went wrong",500));
    }
    if(!place){
        return next(new HttpError("Could not find that place"));
    }else{
        try {
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await place.remove({session:sess});
            place.creator.places.pull(place); // pull remove id from creator
            await place.creator.save({session:sess});
            await sess.commitTransaction();
        } catch (error) {
            return next(new HttpError("Something went wrong",500));
        }
        res.status(200).json({message:"Place Deleted"});
    }
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId= getPlacesByUserId;
exports.createPlace= createPlace;
exports.updatePlace= updatePlace;
exports.deletePlace= deletePlace;
