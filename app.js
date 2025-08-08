const express = require("express")
const mongoose = require("mongoose")
const app = express()
const path = require("path")
const port = 8080
const ejsmate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError.js")
const methodOverride = require('method-override')
const listingsRoutes = require("./routes/listings.js")  
const reviewRoutes = require("./routes/review.js")
const session = require("express-session")
const flash = require("connect-flash")



app.engine("ejs",ejsmate)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,"public")))
const sessionOptions = {
    secret:"keyboardcat",
    resave: false,  
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7 ,// 7 day
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days,
        httponly: true, // Helps prevent XSS attacks
}}
app.use(session(sessionOptions));
app.use(flash());

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/AlphineHut');
}
main().then(()=>{
    console.log("connection sucessful")
})
.catch(()=>{
    console.log("error caught")
})

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    next();
})
app.use("/listings", listingsRoutes);
app.use("/listings/:id/reviews", reviewRoutes);


app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
});
/*error handler using middleware*/

app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}= err;
    res.status(statusCode).render("listings/error", { err });
})

app.listen(port,()=>{
    console.log("listening to port",port)
})








