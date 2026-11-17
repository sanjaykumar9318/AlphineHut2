const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const sessionoptions = {
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: true,
}
app.use(session(sessionoptions));
app.use(flash());

app.get("/register",(req,res)=>{
    let {name="anonymous"} = req.query
    req.session.name = name; // Store the name in the session
    console.log(req.session.name) //cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true 
    if (name === "anonymous") {
        req.flash('error', 'Welcome, anonymous user!')
    } else {
        req.flash('success', `Welcome, ${name}!`)}
    res.redirect('/welcome'); // Redirect to welcome page

})
app.get("/welcome", (req, res) =>{
  res.locals.error = req.flash("error"); // Make error messages available in the template
  res.locals.messages = req.flash("success"); // Make flash messages available in the template
  res.render("page.ejs",{name: req.session.name});  
})

// app.get("/reqcount", (req, res) => {
//     if(req.session.count) {
//     req.session.count++;}
//     else {
//         req.session.count = 1;
//     }
//   res.send(`Request count is: ${req.session.count}`);  
// });

// app.get("/reqcount", (req, res) => {
//   res.send("Test route is working!");  
// });



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});