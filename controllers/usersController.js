const usersDAO = require("../dao/usersDAO");


class UsersController {

    constructor(db) {
        this.dao = new usersDAO(db, "acc_users");
    }
}

module.exports = UsersController;