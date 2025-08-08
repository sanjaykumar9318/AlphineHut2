const express = require("express");
const router = express.Router({mergeParams: true});
const user = require("../models/user.js");
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("users/signup");
})

router.post("/signup", wrapasync(async (req, res) => {
    try{
            let { username, email, password } = req.body;
    let newUser = new user({ email,username })
    const registereduser = await user.register(newUser, password);
    console.log(registereduser);
    req.flash("success", "Welcome to Alphine Hut!");
    res.redirect("/listings");
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}))

router.get("/login", (req, res) => {
    res.render("users/login");
})

router.post("/login",passport.authenticate('local',{failureRedirect:"/login",failureFlash:true}),
async (req, res, next) => {
    req.flash("success", "Welcome back!");
    res.redirect("/listings");

})


module.exports = router;