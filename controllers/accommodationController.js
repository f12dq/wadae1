const accDAO = require("../dao/accommodationDAO");

class AccommodationController {
    
    constructor(db) {
        this.dao = new accDAO(db, "accommodation");
    }

    // Finds all accommodations in database
    async findAll(req, res){
        try {
            const acc = await this.dao.findAll();
            if(acc == null) {
                res.status(404).json({error: `Accomodation is missing from Database`});
            } else {
                res.json(acc);    
            }
        } catch (e) {
            res.status(500).json({error: e});
        }
    }

    // Calls DAO findAccByLocation method to find a specific accommodation by location
    async findAccByLocation(req, res) {
        try {
            const acc = await this.dao.findAccByLocation(req.params.location);
            if(acc == null) {
                res.status(404).json({error: `Accomodation cannot be located in ${req.params.location}`});
            } else {
                res.json(acc);    
            }
        } catch (e) {
            res.status(500).json({error: e});
        }
    }

    // Calls DAO findAccByLocationType method to find a specific accommodation by Location and Type
    async findAccByLocationType(req, res) {
        try {
            const acc = await this.dao.findAccByLocationType(req.params.location, req.params.type);
            if(acc == null) {
                res.status(404).json({error: `Accomodation cannot be located in ${req.params.location} with Type of: ${req.params.type}`});
            } else {
                res.json(acc);    
            }
        } catch (e) {
            res.status(500).json({error: e});
        }
    }
}

module.exports = AccommodationController;