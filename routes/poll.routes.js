const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vote = require('../models/Vote');

const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '712966',
    key: 'f3c70a3a387dfd76c59a',
    secret: 'e70555579d7a8f05cd1e',
    cluster: 'ap1',
    encrypted: true
});

router.route('/')
    .get((req, res) => {
        Vote.find().then(votes => { res.json({ success: true, votes: votes })});
    })
    .post((req, res) => {
        const newVote = {
            os: req.body.os,
            points: 1
        };
        
        new Vote(newVote).save().then(vote => {
            pusher.trigger('os-poll', 'os-vote', {
              points: parseInt(vote.points),
              os: vote.os
            });
        
            return res.json({ success: true, message: 'Thank you for voting' });
        });
    })

module.exports = router;