const express = require('express');
const loginRouter = express.Router();
const passport = require('../lib/passport');


loginRouter.get('/', (req, res) => {
	res.render("login");
})

// post route allowing user to login - authenticates through passport local stratergy and specified session to false as I would recieve an error otherwise
loginRouter.post('/', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login/unauthorized' }), (req, res) => {
	console.log("route " + req.body.username);
})

loginRouter.get('/unauthorized', (req, res) => {
	res.status(401).json({error: "User not found!!"})
})

loginRouter.get('/logout', (req, res) => {
	req.session.destroy();
	global.user = false;
	res.redirect('/');
})

loginRouter.get('/test', (req, res) => {
	console.log("TEST");
	console.log(req.session);
	res.json(req.user);
})

module.exports = loginRouter;