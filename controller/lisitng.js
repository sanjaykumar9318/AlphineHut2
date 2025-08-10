const listing = require("../models/listing"); 
const express = require("express");

module.exports.index = (async(req,res)=>{
     const all_list=await listing.find({});
     res.render("listings/index", { all_list }); 
})

module.exports.new = (req,res)=>{
    res.render("listings/new")
}

module.exports.show = async(req,res)=>{
    let {id} = req.params;
    const list = await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner"); // Populate the owner field to get user details
    // console.log(list)
    if(!list){
        req.flash("error", "Listing not found!");
        res.redirect("/listings");
    }
     res.render("listings/show", { list }); 
}

module.exports.create = async (req, res) => {
    let url = req.file.path
    let filename = req.file.filename
    let newlist = new listing(req.body.listing);
    newlist.owner = req.user._id;
    newlist.image={url,filename}// Set the owner to the currently logged-in user
    await newlist.save();
    req.flash("success", "New listing created successfully!");
    res.redirect("/listings");
}

module.exports.edit = async(req,res)=>{
    let{id}=req.params;
    const list = await listing.findById(id)
    if(!list){
        req.flash("error", "Listing not found!");
        res.redirect("/listings");
    }
    res.render("listings/edit",{list})
}

module.exports.update = async(req,res)=>{
    let {id} = req.params
    let listings = await listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined") {
    let url = req.file.path
    let filename = req.file.filename
    listings.image = {url,filename}
    await listings.save();
    req.flash("success", "Listing updated successfully!");
    res.redirect("/listings")
}}

module.exports.delete = async(req,res,next)=>{
    let {id} = req.params
    console.log("delete ",id)
    let result=await listing.findByIdAndDelete(id);
    console.log(result)
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings")
}