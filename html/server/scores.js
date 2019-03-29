const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

//
// Tickets
//

const scoreSchema = new mongoose.Schema({
  name: String,
  score: Number,
});

const Score = mongoose.model('Score', scoreSchema);

router.get('/', async (req, res) => {
  try {
    let scores = await Score.find();
    scores.sort((a, b) => (a.score > b.score) ? 1 : -1);
    return res.send(scores);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const score = new Score({
    name: req.body.name,
    score: req.body.score,
  });
  try {
    let oldscore = await Score.findOne({name: req.body.name});

    if (oldscore !== null && oldscore.score > req.body.score) {
      await Score.deleteOne({name: req.body.name});
      await score.save();
    }
    if (oldscore == null) {
      await score.save();
    }
    return res.send(score);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', auth.verifyToken, async (req, res) => {
  try {
    if (auth.checkIfAdmin()) {
      await Score.deleteOne({
        _id: req.params.id
      });
      return res.sendStatus(200);
    }
    else {
      return res.status(403).send({
        message: "must login as admin to delete"
      });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
