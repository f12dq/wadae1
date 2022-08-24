const express = require('express');
const locRouter = express.Router();
const db = require('../lib/sqlcon');

// Setting up accommodation Controller

const locationsController = require('../controllers/locationsController');
const locController = new locationsController(db);



// Routes
locRouter.get("/search/:ID", locController.findLocationByID.bind(locController));



module.exports = locRouter;
