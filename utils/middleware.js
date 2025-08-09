const listing = require("../models/listing");
const review = require("../models/review");

module.exports.loginRequired = (req, res, next) => {
    console.log(req)
    if (!req.isAuthenticated()) {
        req.session.redirecturl = req.originalUrl; // Save the original URL to redirect after login
        req.flash("error", "You must be logged in to access this page!");
        return res.redirect("/login");
    }
    next();
}

module.exports.savedredirecturl = (req, res, next) => {
    if(req.session.redirecturl){
        res.locals.redirecturl = req.session.redirecturl;
    }
    next();
}


module.exports.isowner = async(req, res, next) => {
    let { id } = req.params;
    let listings = await listing.findById(id);
    if(!listings.owner._id.equals(req.user._id)&&req.user){
        req.flash("error", "You do not have permission to make changes to this listing!");
        return res.redirect(`/listings/${id}`);
    }
next();
}

module.exports.isreviewauthor = async(req, res, next) => {
    let { id,reviewId } = req.params;
    let reviews= await review.findById(reviewId);
    if(!reviews.author.equals(req.user._id)&&req.user){
        req.flash("error", "You do not have permission to make changes to this review!");
        return res.redirect(`/listings/${id}`);
    }
next();
}