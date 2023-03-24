const Author = require("../models/author.js");

async function index(req, res, next) {
	try {
		const authors = await Author.findAll();
		return res.render("authors", {
			authors: authors,
			req,
			auth: req.session.auth,
		});
	} catch (error) {
		next(error);
	}
}

async function create(req, res, next) {
	try {
		return res.render("authorForm", {
			req,
		});
	} catch (error) {
		next(error);
	}
}

async function store(req, res, next) {
	try {
		const { authorName, dob } = req.body;

		await Author.create({
			authorName: authorName,
			dob: dob,
			avatar:
				(req.file && req.file.filename) || "avatar-1678863707530-697403966.jpg",
		});
		return res.redirect(302, "/authors");
	} catch (error) {
		next(error);
	}
}

async function update(req, res) {
	try {
		return res.json({
			method: req.method,
		});
	} catch (error) {
		next(error);
	}
}

async function destroy(req, res, next) {
	try {
		const { id } = req.params;
		const author = await Author.destroy({
			where: {
				id: id,
			},
		});
		if (!author) return res.redirect("/notfound");
		return res.redirect("/authors");
	} catch (error) {
		next(error);
	}
}

module.exports = {
	index,
	create,
	store,
	update,
	destroy,
};
