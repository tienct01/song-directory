const Author = require("../models/author.js");
const {
	uploadImage,
	destroyAsset,
} = require("../services/cloudinarySerivices.js");
const fs = require("fs/promises");
const { getPublicId } = require("../utils/getPublicId.js");

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

		const resultImage = await uploadImage(
			process.cwd() + "/uploads/" + req.file.filename
		);

		await Author.create({
			authorName: authorName,
			dob: dob,
			avatar: resultImage.url,
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

		const author = await Author.findByPk(id);

		const deletedId = await Author.destroy({
			where: {
				id: id,
			},
		});
		if (!deletedId) return res.redirect("/notfound");
		const publicId = getPublicId(author.avatar);
		destroyAsset(publicId, "image");
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
