const DB = require('../models');
const ROUTER = require('express').Router();

// POST /teams - create new team and push creating user into it
ROUTER.post('/', (req, res) => {
    console.log(req.user);
    DB.Team.create(req.body)
    .then(newTeam => {
        DB.Team.findByIdAndUpdate(newTeam._id,
            { $push: {users: newTeam._id} },
            { new: true }
        )
        .then(updatedTeam => {
            DB.User.findByIdAndUpdate(
                req.body.userId,
                { $push: {teams: updatedTeam._id} },
                { new: true }
            )
            .then(updatedUser => {
                res.send({ updatedTeam, updatedUser })
            })
            .catch(err => {
                res.status(500).send({ message: 'Internal server error.' });
            })
        })
        .catch(err => {
            res.status(500).send({ message: 'Internal server error.' });
        })
    })
    .catch(err => {
        res.status(503).send({ message: 'Database error.' });
    })
});
// PUT /teams/:id - update users
ROUTER.put('/:id', (req, res) => {
    DB.Team.findByIdAndUpdate(
        req.params.id,
        { $push: {users: req.body.userId} },
        { new: true }
    )
    .then(updatedTeam => {
        DB.User.findByIdAndUpdate(
            req.body.userId,
            { $push: {teams: req.params.id} },
            { new: true }
        )
        .then(updatedUser => {
            res.send({ updatedTeam, updatedUser })
        })
        .catch(err => {
            res.status(500).send({ message: 'Internal server error.' });
        })
    })
    .catch(err => {
        res.status(500).send({ message: 'Internal server error.' });
    });
});
// DELETE /teams/:id - delete team


module.exports = ROUTER;