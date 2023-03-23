const Author = require("../models/author.js");

async function index(req, res) {
	const authors = await Author.findAll();
	return res.render("authors", {
		authors: authors,
		req,
		auth: req.session.auth,
	});
}

async function create(req, res) {
	return res.render("authorForm", {
		req,
	});
}

async function store(req, res) {
	const { authorName, dob } = req.body;

	await Author.create({
		authorName: authorName,
		dob: dob,
		avatar:
			(req.file && req.file.filename) || "avatar-1678863707530-697403966.jpg",
	});
	return res.redirect(302, "/authors");
}

async function update(req, res) {
	return res.json({
		method: req.method,
	});
}

async function destroy(req, res) {
	const { id } = req.params;
	const author = await Author.destroy({
		where: {
			id: id,
		},
	});
	if (!author) return res.redirect("/notfound");
	return res.redirect("/authors");
}

module.exports = {
	index,
	create,
	store,
	update,
	destroy,
};
