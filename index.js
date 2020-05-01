const express=require("express");

const app=express(); //class nd object

app.set('view engine','ejs');

app.use("/css",express.static('css'));
app.use("/fonts",express.static('fonts'));
app.use("/img",express.static('img'));
app.use("/js",express.static('js'));
app.use("/sass",express.static('sass'));
app.use("/webfonts",express.static('webfonts'));

app.get("/index",function(req,res){
	res.render("index.ejs");
});
app.get("/about",function(req,res){
	res.render("about.ejs");
});
app.get("/blog",function(req,res){
	res.render("blog.ejs");
});
app.get("/cart",function(req,res){
	res.render("cart.ejs");
});
app.get("/category",function(req,res){
	res.render("category.ejs");
});
app.get("/checkout",function(req,res){
	res.render("checkout.ejs");
});
app.get("/confirmation",function(req,res){
	res.render("confirmation.ejs");
});
app.get("/elements",function(req,res){
	res.render("elements.ejs");
});
app.get("/footer",function(req,res){
	res.render("footer.ejs");
});
app.get("/header",function(req,res){
	res.render("header.ejs");
});
app.get("/login",function(req,res){
	res.render("login.ejs");
});
app.get("/signup",function(req,res){
	res.render("signup.ejs");
});
app.get("/single-blog",function(req,res){
	res.render("single-blog.ejs");
});
app.get("/single-product",function(req,res){
	res.render("single-product.ejs");
});
app.get("/tracking",function(req,res){
	res.render("tracking.ejs");
});
app.get("/contact",function(req,res){
	res.render("contact.ejs");
});

app.listen(3000,function(req,res){
	console.log("Server running on port 3000");
});//to create server
