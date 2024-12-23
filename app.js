var createError = require("http-errors");
var path = require("path");
var logger = require("morgan");
const cors = require("cors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const worksheetRouter = require("./routes/worksheet");
const folderRouter = require("./routes/folder");
require("dotenv").config();

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
);
app.use(logger("dev"));
app.use(express.json());
// app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET));
app.use((req, res, next) => {
	// Test
	next();
});
app.use(express.static(path.join(__dirname, "public")));

app.use(
	session({
		cookie: {
			sameSite: "none",
			secure: false,
			maxAge: 3600000, // ms
		},
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		store: new PrismaSessionStore(new PrismaClient(), {
			checkPeriod: 2 * 60 * 1000, //ms
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
	})
);

app.use("/", indexRouter);
app.use(passport.session());

app.use("/users", usersRouter);
app.use("/worksheet", worksheetRouter);
app.use("/folder", folderRouter);
app.use("/uploads", express.static("./uploads"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// send error as JSON instead of rendering a view
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: req.app.get("env") === "development" ? err : {},
	});
});

module.exports = app;
