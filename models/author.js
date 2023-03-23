const { DataTypes } = require("sequelize");
const sequelize = require("../database.js");

const Author = sequelize.define("Author", {
	authorName: {
		type: DataTypes.STRING,
	},
	dob: {
		type: DataTypes.DATE,
	},
	avatar: {
		type: DataTypes.STRING,
	},
});

Author.sync();
module.exports = Author;
