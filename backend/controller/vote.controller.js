const VoteModel = require('../model/vote.mode.js');
let getVoteDetails = (req, res) => {
    VoteModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
}

let createCandidate = (req, res) => {
    let candidateDetails = new VoteModel({
        candidate: req.body.candidate,
        symbol: req.body.symbol,
        party: req.body.party,
        voters : [],
        count: 0,
    })
    candidateDetails.save((err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(result);
        }
    })
}

let deleteCadidate = (req, res) => {
    let name = req.params.name;
    console.log(name)
    VoteModel.deleteOne({ candidate: name }, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    })
}
let updateCandidate = (req, res) => {
    let candidate = req.body.candidate;
    let count = req.body.count;
    let vote = req.body.username;

    VoteModel.findOneAndUpdate(
        { candidate: candidate },
        { $set: { count: count }, $push: { vote: vote } },
        { new: true },
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        }
    );
}

module.exports = { getVoteDetails, createCandidate, deleteCadidate, updateCandidate }