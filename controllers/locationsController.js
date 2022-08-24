const locationsDAO = require("../dao/locationsDAO");

class LocationsController {

    constructor(db) {
        this.dao = new locationsDAO(db, "locations");
    }
	
	async findLocationByID(req, res){
		try {
            const loc = await this.dao.findLocationByID(req.params.ID);
            if(loc == null) {
                res.status(404).json({error: `No location in Database...`});
            } else {
                res.json(loc);    
            }
        } catch (e) {
            res.status(500).json({error: e});
        }
	}
}


module.exports = LocationsController;