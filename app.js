
const express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local")
	passportLocalMongoose = 
		require("passport-local-mongoose")
const User = require("./model/User");
let app = express();

mongoose.connect("mongodb://localhost/27017");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================

// Showing signup form
app.get("/signup", function (req, res) {
	res.render("signup");
});

// Handling user signup
app.post("/signup", async (req, res) => {
	const user = await User.create({
	username: req.body.username,
	password: req.body.password
	});
    res.render("login")
});

//Showing login form
app.get("/", function (req, res) {
	res.render("login");
});

//Handling user login
app.post("/", async function(req, res){
	try {
		// check if the user exists
		const user = await User.findOne({ username: req.body.username });
		if (user) {
		//check if password matches
		const result = req.body.password === user.password;
		if (result) {
			res.render("home");
		} else {
			res.status(400).json({ error: "password doesn't match" });
		}
		} else {
		res.status(400).json({ error: "User doesn't exist" });
		}
	} catch (error) {
		res.status(400).json({ error });
	}
});
//Handling user logout 
app.get("/logout", function (req, res) {
	req.logout(function(err) {
		if (err) { return next(err); }
		res.redirect('/');
	});
});

let port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server Has Started!");
});








// const express = require("express"),
//     mongoose = require("mongoose"),
//     passport = require("passport"),//A middleware for Node.js that handles authentication.
//     bodyParser = require("body-parser"),//A middleware for parsing incoming request bodies.
//     LocalStrategy = require("passport-local"),//A strategy for Passport that uses a username and password to authenticate users
//     passportLocalMongoose = 
//         require("passport-local-mongoose")
// //A strategy for Passport that uses a username and password to authenticate users

// const User = require("./model/User");
// const app=express();
// mongoose.connect("mongodb://localhost:27017");
// app.set("view engine","ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(require("express-session")({
//     secret: "I cannot tell you",
//     resave: false,
//     saveUninitialized: false
// }));
// //this code sets up session support for the Express.js application using the express-session middleware. The session ID cookie is signed with the secret "Rusty is a dog", and the session is not saved to the session store if it is uninitialized or unmodified

// app.use(passport.initialize());
// app.use(passport.session());
// //this code sets up authentication for the Express.js application using the Passport.js library. The passport.initialize() middleware is added to the middleware stack to initialize Passport.js, and the passport.session() middleware is added to the middleware stack to enable Passport.js to use the Express.js session middleware to persist user authentication between requests.

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.get("/", function (req, res) {
//     res.render("home");
// });
 
// // Showing secret page
// app.get("/secret", isLoggedIn, function (req, res) {
//     res.render("secret");
// });
 
// // Showing signup form
// app.get("/signup", function (req, res) {
//     res.render("signup");
// });
 
// // Handling user signup
// app.post("/signup", async (req, res) => {
//     const user = await User.create({
//       username: req.body.username,
//       password: req.body.password
//     });
   
//     return res.status(200).json(user);
//   });
 
// //Showing login form
// app.get("/login", function (req, res) {
//     res.render("login");
// });
 
// //Handling user login
// app.post("/login", async function(req, res){
//     try {
//         // check if the user exists
//         const user = await User.findOne({ username: req.body.username });
//         if (user) {
//           //check if password matches
//           const result = req.body.password === user.password;
//           if (result) {
//             res.render("secret");
//           } else {
//             res.status(400).json({ error: "password doesn't match" });
//           }
//         } else {
//           res.status(400).json({ error: "User doesn't exist" });
//         }
//       } catch (error) {
//         res.status(400).json({ error });
//       }
// });
 
// //Handling user logout 
// app.get("/logout", function (req, res) {
//     req.logout(function(err) {
//         if (err) { return next(err); }
//         res.redirect('/');
//       });
// });
 
 
 
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) return next();
//     res.redirect("/login");
// }
 
// let port = process.env.PORT || 3000;
// app.listen(port, function () {
//     console.log("Server Has Started!");
// });