const mongoose = require("mongoose");
const schema = mongoose.Schema;
const reviewschema = new schema({
    comment:String,
    rating:{
        type: Number,
        min: 1,
        max: 5,
    },
    createdat:{
        type: Date,
        default: Date.now()
    }
})

const review = mongoose.model("review", reviewschema);
module.exports = review;