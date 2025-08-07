const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js")
const ExpressError = require("../utils/ExpressError.js")
const { listingSchema, reviewSchema } = require("../schema.js");
const listing = require("../models/listing.js")


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
router.get("/new",(req,res)=>{
    res.render("listings/new")
})

/*show route*/
router.get("/:id",async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id).populate("reviews");
    // console.log(list)
     res.render("listings/show", { list }); 
})

/*create route*/
    // let result = listingschema.validate(req.body); // Validate the request body against the schema
    // if (result.error) { 
    //     throw new ExpressError(400, result.error); 
    // }
    // (removed duplicate create route)
router.post("/", validatelisting, wrapasync(async (req, res) => {
    let newlist = new listing(req.body.listing);
    await newlist.save();
    res.redirect("/listings");
}))



/*edit route*/
router.get("/:id/edit",wrapasync (async(req,res)=>{
    let{id}=req.params;
    const list = await listing.findById(id)
    res.render("listings/edit",{list})
}))

/*update route*/
router.put("/:id",validatelisting,wrapasync (async(req,res)=>{
    let {id} = req.params
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings")
}))


/*delete route*/
router.delete("/:id",wrapasync (async(req,res,next)=>{
    let {id} = req.params
    console.log("delete ",id)
    let result=await listing.findByIdAndDelete(id);
    console.log(result)
    res.redirect("/listings")
}))

module.exports = router;