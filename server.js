const express = require("express");
const app = express();
const sequelize = require("./database.js");
const methodOverride = require("method-override");
const session = require("express-session");
const Sequelize = require("connect-session-sequelize")(session.Store);

require("dotenv").config();
const songRouter = require("./routes/song.route.js");
const authorRouter = require("./routes/author.route.js");
const authRouter = require("./routes/auth.route.js");
const errorHandler = require("./middlewares/errorHandler.js");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//Connect database
sequelize
	.authenticate()
	.then(() => console.log("Connection has been established successfully."))
	.catch((error) => console.error("Unable to connect to the database:", error));

//Create store
const store = new Sequelize({
	db: sequelize,
});
store.sync();
app.use(
	session({
		cookie: {
			path: "/",
			httpOnly: true,
			secure: false,
			maxAge: 24 * 60 * 60 * 1000,
		},
		secret: "duytiendeptrai",
		resave: false,
		saveUninitialized: true,
		store: store,
	})
);
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("uploads"));

app.get("/", async (req, res) => {
	return res.redirect(302, "/songs");
});
app.use("/songs", songRouter);
app.use("/authors", authorRouter);
app.use("/", authRouter);
app.use("/notfound", (req, res) => {
	return res.render("notfound");
});
app.use(errorHandler);

app.listen(process.env.PORT || 4000, () => {
	console.log("http://localhost:" + process.env.PORT);
});
