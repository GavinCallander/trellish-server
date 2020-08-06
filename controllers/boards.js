const DB = require('../models');
const ROUTER = require('express').Router();

ROUTER.post('/', (req, res) => {
    DB.Board.create(req.body)
    .then(newBoard => {
        if (req.body.team !== 'No team') {
            DB.Team.findByIdAndUpdate(
                req.body.team,
                { $push: {boards: newBoard._id}},
                { new: true }
            )
            .then(updatedTeam => {
                res.send({ newBoard, updatedTeam });
            })
            .catch(err => {
                res.status(500).send({ message: 'Internal server error.' });
            })
        }
        else {
            DB.User.findByIdAndUpdate(
                req.user._id,
                { $push: {boards: newBoard._id}},
                { new: true }
            )
            .then(updatedUser => {
                res.send({ newBoard, updatedUser });
            })
            .catch(err => {
                res.status(500).send({ message: 'Internal server error.' });
            })
        };
    });
});

module.exports = ROUTER;