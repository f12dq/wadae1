require('dotenv').config;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('./lib/passport');

// Connecting database
const db = require('./lib/sqlcon');

const app = express();

// Sessions
const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);
const sessionStore = new MySQLStore( { }, db.promise());

// Environmental Variables
WEB_PORT = process.env.WEB_PORT || 3000;

// Creating an ExpressSession
app.use(expressSession({
    // Specify the session store used.
    store: sessionStore,

    // A Secret used to digitally sign session cookie (use something unguessable such as random hexbytes)
    secret: '83dd6cace723fab697ee5206c46e66f9',

    // Resave is regarding the internals of how the session saves work,we set it to false if we use a mysql store.
    resave: false,

    // Do setup the session before modifying session variables, false = we dont want to do that
    saveUninitialized: false,

    // This is important, rolling asks if we want to reset the cookie for every HTTP response, generally with sessions they have
    // a timeout (10min innactivity) from page refresh which would cause what ever the user was doing to timeout. this is annoying.
    // True is the sensible setting.
    rolling: true,

    // Destroy session (removes it from data store) once it is set to null or deleted.
    unset: 'destroy',

    // useful if using a proxy when accessing server, this allows the session variable to be passed through a proxy.
    proxy: true,

    // Properties of the session cookie
    cookie: {
        maxAge: 600000, // 600000ms = 10 mins expiry time
        httpOnly: false // allows client-side code to access the cookie (otherwise it would be kept to the HTTP messages)
    }
}));


// Using passport as middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Bootstrap css and js files.
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))

// Middleware to pass user session to all templates
// Creating a Global variable (User)
global.user = false;
app.use("*", async (req, res, next) => {
  if (req.session.passport && !global.user) {
    const user = req.user;
    global.user = user; // global variable it can be accessed anywhere (including ejs)
  }
  next();
});

// --- Users Router ---
app.get("/users/logged", (req, res) => {
	if(req.user){
		res.json(req.user);
		return;
	}
	res.json({ error: "User must be logged for any action" });
});


app.use('/acc/book', (req, res, next) => {
	console.log("BOOKING")
	// console.log(user);
	if(!user){
		return res.json({message: "Loggin first!"})
	}
	next();
});

// --- Accommidation Router ---
const accRouter = require("./routes/accRoutes")
app.use('/acc', accRouter);


// --- login Router ---
const loginRouter = require("./routes/loginRoutes")
app.use('/login', loginRouter);

// --- Locations Router ---
const locRouter = require("./routes/locRoutes")
app.use('/loc', locRouter);


app.get('/', (req, res) => {
	// console.log(user);
    res.render("home");
});




app.listen(WEB_PORT, () => {
    console.log(`App is online and is to be accesed at localhost:${WEB_PORT}`);
});