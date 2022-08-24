const express = require('express');
const app = express();
const port = 3000;
let bodyParser = require('body-parser');
let server = express();
let cors = require('cors');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());
var mysql = require('mysql');
const { request } = require('express');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "workfor"
});

// DB check
con.connect( err=> {
    if(err) {
        console.log(`Error connecting to mysql: ${err}`);
        process.exit(1); // Quit the Express server with an error code of 1
    } else { 
        // Once we have successfully connected to MySQL, we can setup our
        // routes, and start the server.
        console.log('connected to mysql ok');

        // TASK 1
        // app.get('/accomodation/:location', (req, res) => {
          //  con.query(`SELECT * FROM accomodation `,
          //  (error,results,fields)=> {
          //      if(error) {
         //           res.status(500).json({error: error});
          //      } else {
          //          res.json(results);
         //       } 
         //   });
       // }
       // );
       // app.get('/accomodation/:location', (req, res) => {
          //  con.query(`SELECT * FROM accomodation WHERE location=?`,
          //  [req.params.location], (error,results,fields)=> {
          //      if(error) {
         //           res.status(500).json({error: error});
          //      } else {
          //          res.json(results);
         //       } 
         //   });
       // }
       // );
        //TASK 2
 // app.get('/accomodation/:location/:type', (req, res) => {
          //  con.query(`SELECT * FROM accomodation WHERE location=? AND type=?`,
          //  [req.params.location, req.params.type], (error,results,fields)=> {
          //      if(error) {
         //           res.status(500).json({error: error});
          //      } else {
          //          res.json(results);
         //       } 
         //   });
       // }
       // );
        //TASK 3
            app.use(express.json()); // necessary to read JSON data from the request body
            app.post('/newbooking', (req, res) => {
                con.query('INSERT INTO acc_bookings(ID, accID, thedate, username, npeople) VALUES (?,?,?,?,?)',
                    [req.body.ID, req.body.accID, req.body.thedate, req.body.username, req.body.npeople],
                    (error, results, fields) => {
                        if(error) {
                            res.status(500).json({error: error});
                        } else {
                            res.json({success: 1});
                        } 
                    });
            });
            app.post('/newbooking/:id', (req, res) => {
                con.query('UPDATE acc_dates SET availability=availability-? WHERE thedate=? AND accID=?',
                    [ req.params.id],
                    (err, results, fields) => {
                        if(err) {
                            res.status(500).json({error: err});
                        } else if (results.affectedRows == 0) {
                            res.status(404).json({error: 'not identified ID!'});
                        } else {
                            res.json({updatedRows: results.affectedRows});
                        }
                    });
            });
    //TASK 4
    
          
        // listen on port 3000
        app.listen(port, () => console.log(` app listening on port ${port}!`))
    }
});

