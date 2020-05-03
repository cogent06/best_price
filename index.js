if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config()//will load all different environment variable and set them inside process.env
}

const express=require("express");
const session = require('express-session');
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const flash = require('express-flash');

const app=express(); //class nd object
const users = [];

const passport = require('passport');
const initilizePassport = require('./passport-config');
initilizePassport(passport,
	email=> users.find(fname => fname.email === email),
	id=> users.find(fname => fname.id === id)
);

//app.use(bodyParser.json());
//var path = require('path');
//var db = require("./db");
//var collection = "user";
//app.use(session({secret: 'ssshhhhh'}));//Here ‘secret‘ is used for cookie handling etc but we have to put some secret for managing Session in Express.


app.set('view engine','ejs');
app.use(flash());

app.use(session({ 
	secret : process.env.SESSION_SECRET,
	resave: false, //will resave out session variable if nothing is change but we don't wanna resave it so false
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended:false }));
app.use("/css",express.static('css'));
app.use("/fonts",express.static('fonts'));
app.use("/img",express.static('img'));
app.use("/js",express.static('js'));
app.use("/sass",express.static('sass'));
app.use("/webfonts",express.static('webfonts'));

app.get("/index",function(req,res){
	res.render("index.ejs" ,{name : 'Cogent'});
});
app.get("/about",function(req,res){
	res.render("about.ejs" ,{name : 'Cogent'});
});
app.get("/blog",function(req,res){
	res.render("blog.ejs" ,{name : 'Cogent'});
});
app.get("/cart",function(req,res){
	res.render("cart.ejs" ,{name : 'Cogent'});
});
app.get("/category",function(req,res){
	res.render("category.ejs",{name : 'Cogent'});
});
app.get("/checkout",function(req,res){
	res.render("checkout.ejs",{name : 'Cogent'});
});
app.get("/confirmation",function(req,res){
	res.render("confirmation.ejs",{name : 'Cogent'});
});
app.get("/elements",function(req,res){
	res.render("elements.ejs",{name : 'Cogent'});
});
app.get("/footer",function(req,res){
	res.render("footer.ejs",{name : 'Cogent'});
});
app.get("/header",function(req,res){
	res.render("header.ejs",{name : 'Cogent'});
});
app.get("/login",function(req,res){
	res.render("login.ejs",{name : 'Cogent'});
});

app.post("/login",passport.authenticate('local',{
	successRedirect: '/index',
	failureRedirect: '/login',
	failureFlash: true   //will show flash msg
}));

app.get("/signup",function(req,res){
	res.render("signup.ejs",{name : 'Cogent'});
});
app.post("/signup",async (req,res)=>{
	try{
		const hashedPassword = await bcrypt.hash(req.body.password,10);
		users.push({
			id: Date.now().toString(),
			fname: req.body.fname,
			lname: req.body.lname,
			email : req.body.email,
			phone: req.body.phone,
			address: req.body.address,
			uname: req.body.uname,
			password: hashedPassword
		})
		res.redirect("/login");
	} catch{
		res.redirect("/signup");
	}
	console.log(users);
});

app.get("/single-blog",function(req,res){
	res.render("single-blog.ejs",{name : 'Cogent'});
});
app.get("/single-product",function(req,res){
	res.render("single-product.ejs",{name : 'Cogent'});
});
app.get("/tracking",function(req,res){
	res.render("tracking.ejs",{name : 'Cogent'});
});
app.get("/contact",function(req,res){
	res.render("contact.ejs",{name : 'Cogent'});
});

app.listen(3000,function(req,res){
	console.log("Server running 5000");
});//to create server