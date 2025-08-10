const express = require("express");
const user = require("../models/user.js");

module.exports.rendersignup = (req, res) => {
    res.render("users/signup");
}

module.exports.signup = async (req, res) => {
    try{
            let { username, email, password } = req.body;
    let newUser = new user({ email,username })
    const registereduser = await user.register(newUser, password);
    console.log(registereduser);
    req.login(registereduser, (err) => {
        if (err) {
            req.flash("error", "Login failed!");
            return next(err)
        }
            req.flash("success", "Welcome to Alphine Hut!");
    res.redirect("/listings");
    });

    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderlogin = (req, res) => {
    res.render("users/login");
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back!");
    let redirecturl = res.locals.redirecturl || "/listings";

    res.redirect(redirecturl);

}

module.exports.logout =  (req, res) => {
    req.logout((err) => {   
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    });
}