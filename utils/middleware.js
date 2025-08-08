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
