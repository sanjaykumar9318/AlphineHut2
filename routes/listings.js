const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js")
const ExpressError = require("../utils/ExpressError.js")
const { listingSchema, reviewSchema } = require("../schema.js");
const listing = require("../models/listing.js")
const { loginRequired, isowner } = require("../utils/middleware.js");



const validatelisting = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if(error){
        let errmsg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(400, errmsg);
    }
    next();
}

/*indexroute*/
router.get("/",wrapasync (async(req,res)=>{
     const all_list=await listing.find({});
     res.render("listings/index", { all_list }); 
}))

/*new route*/
router.get("/new",loginRequired,(req,res)=>{
    res.render("listings/new")
})

/*show route*/
router.get("/:id",async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner"); // Populate the owner field to get user details
    // console.log(list)
    if(!list){
        req.flash("error", "Listing not found!");
        res.redirect("/listings");
    }
     res.render("listings/show", { list }); 
})

/*create route*/
    // let result = listingschema.validate(req.body); // Validate the request body against the schema
    // if (result.error) { 
    //     throw new ExpressError(400, result.error); 
    // }
    // (removed duplicate create route)
router.post("/",loginRequired, validatelisting, wrapasync(async (req, res) => {
    let newlist = new listing(req.body.listing);
    newlist.owner = req.user._id; // Set the owner to the currently logged-in user
    await newlist.save();
    req.flash("success", "New listing created successfully!");
    res.redirect("/listings");
}))



/*edit route*/
router.get("/:id/edit",loginRequired,isowner,wrapasync (async(req,res)=>{
    let{id}=req.params;
    const list = await listing.findById(id)
    if(!list){
        req.flash("error", "Listing not found!");
        res.redirect("/listings");
    }
    res.render("listings/edit",{list})
}))

/*update route*/
router.put("/:id",loginRequired,isowner,validatelisting,wrapasync (async(req,res)=>{
    let {id} = req.params
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success", "Listing updated successfully!");
    res.redirect("/listings")
}))


/*delete route*/
router.delete("/:id",loginRequired,isowner,wrapasync (async(req,res,next)=>{
    let {id} = req.params
    console.log("delete ",id)
    let result=await listing.findByIdAndDelete(id);
    console.log(result)
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings")
}))

module.exports = router;