const mongoose = require('mongoose');
const model = mongoose.model('trips')

const tripsList = async (req, res) => {
    model
        .find({}) // empty filter for all
        .exec((err, trips) => {
            if (!trips) {
                return res
                    .status(404)
                    .json ({"message" : "Trip not found"})
            }
            else if (err) {
                return res
                    .status(404)
                    .json(err)
            }
            else{
                return res
                    .status(200)
                    .json(trips)
            }
        });
};

// GET:/trips/:tripCode - returns a single trip
const tripsFindCode = async (req, res) => {
    model
        .find({'code' : req.params.tripCode}) 
        .exec((err, trip) => {
            if (!trip) {
                return res
                    .status(404)
                    .json ({"message" : "Trip not found"})
            }
            else if (err) {
                return res
                    .status(404)
                    .json(err)
            }
            else{
                return res
                    .status(200)
                    .json(trip)
            }
        });
};

module.exports = {
    tripsList,
    tripsFindCode,
}