const { DataTypes } = require("sequelize");
const sequelize = require("../database.js");
const Author = require("./author.js");

const Song = sequelize.define("Song", {
	songName: {
		type: DataTypes.STRING,
	},
	songFile: {
		type: DataTypes.STRING,
	},
	thumbnail: {
		type: DataTypes.STRING,
	},
});
Song.belongsTo(Author, {
	foreignKey: "authorId",
});

Song.sync();
module.exports = Song;
