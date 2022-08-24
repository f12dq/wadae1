

class BookingsDAO {

    constructor(conn, table) {
        this.conn = conn;
        this.table = table;
    }
	
	// Add a booking for a specific accommodation
    bookAccommodation(accID, date, username, people){
        // Book a place of accomodation for a specific amount of people.
        // accID = ID of Accommodation
        // people = Number of people staying
        // date = Date of booking 
        // Adds record to "acc_bookings" table while also reducing availability in the "acc_dates" table
        const sql = `INSERT INTO acc_bookings (accID, npeople, thedate, username) VALUES (?,?,?,?)`;
        const sqlUpdateDate = `UPDATE acc_dates SET availability = availability - ? WHERE thedate = ? AND accID = ?`;

        return new Promise( (resolve, reject) => {
			console.log("Step 0");
            this.conn.query(sql,
            [accID, people, date, username], (error, results, fields) => {
                if(error){
                    reject(error)
                }
				console.log("Step 1");
                this.conn.query(sqlUpdateDate,
                [people, date, accID], (error, results, fields) => {
                    if(error){
                        reject(error)
                    } 
					console.log("Step 2");
					// console.log(results[0]);
                    resolve(results[0]);
                });
            });
        });
    }

}

module.exports = BookingsDAO;