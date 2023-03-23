const { Op } = require("sequelize");
const Author = require("../models/author.js");
const Song = require("../models/song.js");
const fs = require("fs");

async function index(req, res) {
	const { q = "" } = req.query;
	req.session.query = q;
	const songs = await Song.findAll({
		include: {
			model: Author,
		},
		where: {
			[Op.or]: [
				{
					songName: {
						[Op.like]: `%${q}%`,
					},
				},
				{
					"$author.authorName$": {
						[Op.like]: `%${q}%`,
					},
				},
			],
		},
	});
	return res.render("index", {
		songs: songs,
		req,
		query: req.session.query,
		prevSong: req.session.Song,
		auth: req.session.auth,
	});
}

async function show(req, res) {
	const song = await Song.findByPk(req.params.id, {
		include: Author,
	});
	if (!song)
		res.status(404).json({
			message: "Not found",
		});
	req.session.Song = song;
	return res.json(song);
}

async function create(req, res) {
	const authors = await Author.findAll();
	return res.render("songForm", {
		authors,
		req,
	});
}

async function store(req, res) {
	await Song.create({
		songName: req.files["song"][0].originalname,
		songFile: req.files["song"][0].filename,
		thumbnail: req.files["thumbnail"][0].filename,
		authorId: req.body.authorId,
	});
	return res.redirect(302, "/songs");
}

async function destroy(req, res) {
	const { id } = req.params;
	let todeleted = await Song.findByPk(id);
	let deleted = await Song.destroy({
		where: {
			id: id,
		},
	});
	if (!deleted) {
		return res.redirect("/notfound");
	}
	// Delete in uploads folder
	fs.unlink(process.cwd() + "/uploads/" + todeleted.songFile, (err) => {
		if (err) console.log(err);
		else {
			console.log("/uploads/" + todeleted.songFile + " Deleted");
		}
	});
	fs.unlink(process.cwd() + "/uploads/" + todeleted.thumbnail, (err) => {
		if (err) console.log(err);
		else {
			console.log("/uploads/" + todeleted.thumbnail + " Deleted");
		}
	});

	return res.redirect("/songs");
}

module.exports = {
	index,
	create,
	store,
	destroy,
	show,
};
