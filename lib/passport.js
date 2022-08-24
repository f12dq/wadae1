const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../lib/sqlcon');

const UsersDAO = require('../dao/usersDAO');

passport.use(new LocalStrategy(async(username, password, done) => {
	
	const usersDao = new UsersDAO(db, "acc_users");
	try {
		const userDetails = await usersDao.login(username, password);
		
		if(userDetails == null) { // Runs if there was a user error logging in
			return done(null, false);
		} else { // Runs if everything was successful
			return done(null, userDetails);
		}
	} catch(e) { // Runs if there is a server error
		return done(e);
	}
}));

passport.serializeUser((userDetails, done) => {
	// console.log(userDetails[0].ID);
	done(null, userDetails[0].ID);
});

passport.deserializeUser(async(userid, done) => {
	try {
		const usersDao = new UsersDAO(db, "acc_users");
		
		const details = await usersDao.findByID(userid);
		
		done(null, details);
	} catch(e) {
		done(e);
	}
})


module.exports = passport;