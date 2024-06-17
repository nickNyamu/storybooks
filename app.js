const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const {engine} = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo"); //Pass session to connect-mongo to store session in the database
const connectDB = require("./config/db");

//Load config
dotenv.config({ path: "./config/config.env" });

//Passport config
require("./config/passport")(passport); //Pass passport to the config file

connectDB();

const app = express();

//Express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));


// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Configure Handlebars view engine
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

//Passport middleware
app.use(passport.initialize()); //Initialize passport
app.use(passport.session()); //Use passport session having installed express-session

// Static folder
app.use(express.static(path.join(__dirname, "public")));


// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
