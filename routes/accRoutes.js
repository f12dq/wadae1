const express = require('express');
const accRouter = express.Router();
const db = require('../lib/sqlcon');

// Setting up accommodation Controller
const accommodationController = require('../controllers/accommodationController');
const accController = new accommodationController(db);

// Setting up bookings Controller
const bookingsController = require('../controllers/bookingsController');
const bookController = new bookingsController(db);

accRouter.get("/search", accController.findAll.bind(accController));

accRouter.get("/search/:location", accController.findAccByLocation.bind(accController));

accRouter.get("/search/:type/:location", accController.findAccByLocationType.bind(accController));



accRouter.get("/book", (req, res) => {
	res.render("bookings");
});

accRouter.post("/book/:accID/:numP/:date/:user", bookController.bookAccommodation.bind(bookController));


module.exports = accRouter;
