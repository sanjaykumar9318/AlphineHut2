const express = require("express");
const listing = require("../models/listing.js")
const review = require("../models/review")
const router = express.Router({mergeParams: true});
const ExpressError = require("../utils/ExpressError.js")
const wrapasync = require("../utils/wrapasync.js")
const { loginRequired,isreviewauthor} = require("../utils/middleware.js");
const reviewController = require("../controller/review.js");

module.exports.review = async(req,res)=>{
    let {id} = req.params;
    let listingfound = await listing.findById(id);
    let newreview = new review(req.body.review); //this is inserting but in new way
    newreview.author = req.user._id; // associate the review with the logged-in user
    listingfound.reviews.push(newreview);
    await newreview.save();
    await listingfound.save();
    req.flash("success", "Review added successfully!");
    res.redirect(`/listings/${id}`) // Redirect to the listing's show page after adding the review;
}

module.exports.deleteReview = async(req,res)=>{
    let {id, reviewId} = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`) 
    }