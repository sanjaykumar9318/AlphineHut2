const express = require("express");
const router = express.Router({mergeParams: true});
const ExpressError = require("../utils/ExpressError.js")
const wrapasync = require("../utils/wrapasync.js")
const { listingSchema, reviewSchema } = require("../schema.js");
const listing = require("../models/listing.js")
const review = require("../models/review")


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);  
    if(error){
        let errmsg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(400, errmsg);
    }
    next();
}

/*reviews route*/
router.post("/",validateReview,wrapasync(async(req,res)=>{
    let {id} = req.params;
    let listingfound = await listing.findById(id);
    let newreview = new review(req.body.review); //this is inserting but in new way
    listingfound.reviews.push(newreview);
    await newreview.save();
    await listingfound.save();
    req.flash("success", "Review added successfully!");
    res.redirect(`/listings/${id}`) // Redirect to the listing's show page after adding the review;
}))


/*delete review route*/
router.delete("/:reviewId",wrapasync(async(req,res)=>{
    let {id, reviewId} = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`) 
    }))

module.exports = router;
