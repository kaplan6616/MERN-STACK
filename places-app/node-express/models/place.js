const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    title : {type:String, required:true},
    description : {type:String, required:true},
    creator : {type:mongoose.Types.ObjectId, required:true,ref:"User"},
    address : {type:String, required:true},
    // image : {type:String, required:true},
    location : {
        lat:{type:Number,required:true},
        lng:{type:Number,required:true}
    }
});

module.exports = mongoose.model("Place",placeSchema);
