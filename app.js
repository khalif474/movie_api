//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const actors = require("./routers/actor");
const movies = require("./routers/movie");
const app = express();
app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect("mongodb://localhost:27017/movies", function (err) {
  if (err) {
    return console.log("Mongoose - connection error:", err);
  }
  console.log("Connect Successfully");
});
//Configuring Endpoints
//Actor RESTFul endpoionts
app.get("/actors", actors.getAll);
app.post("/actors", actors.createOne);
app.get("/actors/:id", actors.getOne);
app.put("/actors/:id", actors.updateOne);
app.post("/actors/:id/movies", actors.addMovie);
app.delete("/actors/:id", actors.deleteOne);
// Added Ones
app.get("/actorsall", actors.getAllDetails);
app.delete("/actors/:actorId/:movieId", actors.removeMovie);
app.delete("/actorsall/:id", actors.deleteAll);

//Movie RESTFul  endpoints
app.get("/movies", movies.getAll);
app.post("/movies", movies.createOne);
app.get("/movies/:id", movies.getOne);
app.put("/movies/:id", movies.updateOne);
// Added Ones
app.delete("/moviesyear", movies.deleteByYear);
app.get("/moviesall", movies.getAllDetails);
app.get("/movies/:year1/:year2", movies.getMoviesByYear);
app.delete("/movies/:movieId/:actorId", movies.removeActor);
app.delete("/movies/:id", movies.deleteByID);
app.post("/movies/:movieId/:actorId", movies.addActor);
