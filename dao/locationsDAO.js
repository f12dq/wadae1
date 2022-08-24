

class LocationsDAO {

    constructor(conn, table) {
        this.conn = conn;
        this.table = table;
    }
	
	
// 	Find Location by ID
	findLocationByID(ID){
		return new Promise( (resolve, reject) => {
            this.conn.query(`SELECT * FROM ${this.table} WHERE ID = ?`,
            [ID], (error, results, fields) => {
                if(error){
                    reject(error)
                } else if (results.length >= 1) {
                    resolve(results)
                } else {
                    resolve(null)
                };
            });
        });
	}

}

module.exports = LocationsDAO;