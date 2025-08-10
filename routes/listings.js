const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js")
const ExpressError = require("../utils/ExpressError.js")
const { listingSchema, reviewSchema } = require("../schema.js");
const listing = require("../models/listing.js")
const { loginRequired, isowner } = require("../utils/middleware.js");
const listingcontroller = require("../controller/lisitng.js");
const multer  = require('multer')
const {storage} = require("../cloudconfig.js")
const upload = multer({storage })

const validatelisting = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if(error){
        let errmsg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(400, errmsg);
    }
    next();
}

/*indexroute*/
/*create route*/
    // let result = listingschema.validate(req.body); // Validate the request body against the schema
    // if (result.error) { 
    //     throw new ExpressError(400, result.error); 
    // }
    // (removed duplicate create route)
router
    .route("/")
    .get(wrapasync (listingcontroller.index))
    .post(loginRequired,upload.single("listing[image]"),wrapasync(listingcontroller.create));

/*new route*/
router.get("/new",loginRequired,listingcontroller.new);

/*show route*/
/*update route*/
/*delete route*/
router
    .route("/:id")
    .get(listingcontroller.show)
    .put(loginRequired,isowner,upload.single("listing[image]"),validatelisting,wrapasync (listingcontroller.update))
    .delete(loginRequired,isowner,wrapasync (listingcontroller.delete))

/*edit route*/
router.get("/:id/edit",loginRequired,isowner,wrapasync (listingcontroller.edit));

module.exports = router;