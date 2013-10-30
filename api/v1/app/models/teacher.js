var orm = require("../../config/models");
var Sequelize = orm.Sequelize();

module.exports = {
    "model": {
        "id": {
            "type": Sequelize.INTEGER,
            "primaryKey": true,
            "autoIncrement": true
        }
    },

    "relations": {
        "belongsTo": "person"
    },

    "options": {
        "freezeTableName": true,
        "underscored": true,
        "paranoid": true
    }
};