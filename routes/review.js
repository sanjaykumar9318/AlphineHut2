const express = require("express");
const router = express.Router({mergeParams: true});
const ExpressError = require("../utils/ExpressError.js")
const wrapasync = require("../utils/wrapasync.js")
const { loginRequired,isreviewauthor} = require("../utils/middleware.js");
const reviewController = require("../controller/review.js");
const { reviewSchema } = require("../schema.js");

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);  
    if(error){
        let errmsg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(400, errmsg);
    }
    next();
}

/*reviews route*/
router.post("/",loginRequired,validateReview,wrapasync(reviewController.review));

/*delete review route*/
router.delete("/:reviewId",loginRequired,isreviewauthor,wrapasync(reviewController.deleteReview));

module.exports = router;
