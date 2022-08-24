const datesDAO = require('./datesDAO');

class AccommodationDAO {

    constructor(conn, table) {
        this.conn = conn;
        this.table = table;
    }

    // Retrieve all accommodations
    findAll(){
        return new Promise( (resolve, reject) => {
            this.conn.query(`SELECT * FROM ${this.table}`, (error, results, fields) => {
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

    // Find accommodation through location
    findAccByLocation(location){
        return new Promise( (resolve, reject) => {
            this.conn.query(`SELECT * FROM ${this.table} WHERE location LIKE ?`,
            [location], (error, results, fields) => {
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

    // Find specific accommodation through location and type
    findAccByLocationType(location, type){
        return new Promise( (resolve, reject) => {
            this.conn.query(`SELECT * FROM ${this.table} WHERE location LIKE ? AND type like ?`,
            [location, type], (error, results, fields) => {
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

module.exports = AccommodationDAO;