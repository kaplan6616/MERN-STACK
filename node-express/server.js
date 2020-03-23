const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require("./routes/places-routes")
const HttpError = require("./models/http-error")
const app = express();

app.use(bodyParser.json());

app.use("/api/places",placesRoutes) // only requests that starts with /api/places will forward to placesRoutes router.

app.use((error,req,res,next) =>{
    throw new HttpError("Could Not find this route",404);
});

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occured!"})
});
app.listen(5000);
