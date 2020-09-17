const mongoose = require("mongoose");
const Actor = require("../models/actor");
const Movie = require("../models/movie");
module.exports = {
  getAll: function (req, res) {
    Actor.find(function (err, actors) {
      if (err) {
        return res.status(404).json(err);
      } else {
        res.json(actors);
      }
    });
  },
  createOne: function (req, res) {
    let newActorDetails = req.body;
    newActorDetails._id = new mongoose.Types.ObjectId();
    let actor = new Actor(newActorDetails);
    actor.save(function (err) {
      if (err) return res.status(400).json(err);
      else res.json(actor);
    });
  },
  getOne: function (req, res) {
    Actor.findOne({ _id: req.params.id })
      .populate("movies")
      .exec(function (err, actor) {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();
        res.json(actor);
      });
  },
  updateOne: function (req, res) {
    Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (
      err,
      actor
    ) {
      if (err) return res.status(400).json(err);
      if (!actor) return res.status(404).json();
      res.json(actor);
    });
  },
  deleteOne: function (req, res) {
    Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
      if (err) return res.status(400).json(err);
      res.json();
    });
  },
  addMovie: function (req, res) {
    Actor.findOne({ _id: req.params.id }, function (err, actor) {
      if (err) return res.status(400).json(err);
      if (!actor) return res.status(404).json();
      Movie.findOne({ _id: req.body.id }, function (err, movie) {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();
        actor.movies.push(movie._id);
        actor.save(function (err) {
          if (err) return res.status(500).json(err);
          res.json(actor);
        });
      });
    });
  },
  deleteAll: function (req, res) {
    Actor.findOne({ _id: req.params.id }).exec(function (err, actor) {
      if (err) return res.status(400).json(err);
      if (!actor) return res.status(404).json();
      console.log(actor);
      Movie.deleteMany({ _id: { $in: actor.movies } }, function (err) {
        if (err) return res.status(400).json(err);
      });
    });

    // Finally we delete
    Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
      if (err) return res.status(400).json(err);
      res.json("complete");
    });
  },
  getAllDetails: function (req, res) {
    Actor.find({})
      .populate("movies")
      .exec(function (err, actor) {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();
        res.json(actor);
      });
  },
  removeMovie: function (req, res) {
    Actor.findOne({ _id: req.params.actorId }).exec(function (err, actor) {
      if (err) return res.status(400).json(err);
      if (!actor) return res.status(404).json();
      // Remove movie
      for (let i = 0; i < actor.movies.length; i++) {
        if (actor.movies[i] == req.params.movieId) {
          actor.movies.splice(i, 1);
        }
      }
      actor.save(function (err) {
        if (err) return res.status(500).json(err);
        res.json(actor);
      });
    });
  },
};
