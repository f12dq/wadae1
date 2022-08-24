
class DatesDAO {

    constructor(conn, table) {
        this.conn = conn;
        this.table = table;
    }
	
	
	// Decrease Availability
	decreaseAvailability(accID, date, people) {
		return new Promise ( (resolve, reject) => {
			this.conn.query(`UPDATE acc_dates SET availability = availability - ? WHERE thedate = ? AND accID = ?`,
                [people, date, accID], (error, results, fields) => {
                    if(error){
                        reject(error)
                    } 
                    resolve(results[0]);
                });
		} )
	}

}

module.exports = DatesDAO;