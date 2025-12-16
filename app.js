var createError = require("http-errors");
// const { createServer } = require('node:http');
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
var indexRouter = require("./routes/index");

// const { Server } = require('socket.io');
// const server = createServer(app);
// const io = new Server(server);
// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

var cors = require("cors");
var connectDB = require("./config/db.config");
app.use(cors());

connectDB()
// var client = require('./config/redis.config')
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1", indexRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express on Vercel!" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log("err.message:", err.message);
  res.status(err.status || 500).json({
    message: "Internal Server Error",
    error:  err.message  // tránh leak lỗi ở production
  });
});


module.exports = app;
