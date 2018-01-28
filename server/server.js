const express = require("express"),
  path = require("path"),
  logger = require("morgan"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  router = require("./router"),
  config = require("./config/main");

const server = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.database);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

server.listen(config.port);
console.log("Your server is running on port " + config.port + ".");

server.use(logger("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, "public")));

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

router(server);
