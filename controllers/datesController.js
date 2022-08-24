const datesDAO = require("../dao/datesDAO");

class DatesController {

    constructor(db) {
        this.dao = new datesDAO(db, "acc_dates");
    }
	
	async decreaseAvailability(res, req) {
		try {
            const date = await this.dao.decreaseAvailability(req.params.accID, req.params.date, req.params.numP);

            res.json(date);
        } catch (e) {
            res.status(500).json({error: e});
        }
	}
}

module.exports = DatesController;