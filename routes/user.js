const express = require("express");
const router = express.Router({mergeParams: true});
const user = require("../models/user.js");
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const {savedredirecturl} = require("../utils/middleware.js")
const userController = require("../controller/user.js");

router
    .route("/signup")
    .get(userController.rendersignup)
    .post(wrapasync(userController.signup))

router
    .route("/login")
    .get(userController.renderlogin)
    .post(savedredirecturl,passport.authenticate('local',{failureRedirect:"/login",failureFlash:true}),userController.login);

router.get("/logout",userController.logout);

module.exports = router;