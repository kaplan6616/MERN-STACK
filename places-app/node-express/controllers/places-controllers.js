const HttpError = require("../models/http-error");
const uuid = require('uuid/v4');
let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  }
];

const getPlaceById = (req,res,next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p =>{
        if(p.id === placeId){
            return p;
        }
    });

    if(!place){
        throw new HttpError('Could not find a place for the provided id',404);;
    }else{
        res.json({place:place});
    }
}

const getPlacesByUserId = (req,res,next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p =>{
        if(p.creator === userId){
            return p;
        }
    })
    if(places.length === 0){
        next(new HttpError('Could Not Find a places for the provided user id.',404));
    }else{
        res.json({places:places});
    }
};

const createPlace = (req,res,next) => {
    const {title,description,coordinates,address,creator} = req.body;
    const newPlace = {
        id:uuid(),
        title:title,
        description:description,
        location:coordinates,
        address:address,
        creator:creator
    };
    DUMMY_PLACES.push(newPlace);
    res.status(201).json({place:newPlace});
};

const updatePlace = (req,res,next) => {
    const {title,description} = req.body;
    const placeId = req.params.pid;
    const place = {...DUMMY_PLACES.find(p =>{
        if(p.id === placeId){
            return p;
        }
    })};
    const placeIndex = DUMMY_PLACES.findIndex(p =>{
        if(p.id === placeId){
            return p;
        }
    });
    place.title = title;
    place.description = description;
    DUMMY_PLACES[placeIndex] = place;
    res.status(200).json({place:place});
};


const deletePlace = (req,res,next) => {
    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p=>{
        if(p.id !== placeId){
            return p;
        }
    })
    res.status(200).json({message:"Place Deleted"});
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId= getPlacesByUserId;
exports.createPlace= createPlace;
exports.updatePlace= updatePlace;
exports.deletePlace= deletePlace;
