const express = require("express");
const router = express.Router();
const {
	index,
	create,
	store,
	destroy,
	show,
} = require("../controllers/song.controller.js");
const upload = require("../middlewares/upload.js");
const auth = require("../middlewares/auth.js");

router.get("/", index);
router.get("/create", create);
router.get("/:id", show);
router.post(
	"/",
	upload.fields([
		{
			name: "song",
			maxCount: 1,
		},
		{
			name: "thumbnail",
			maxCount: 1,
		},
	]),
	store
);
router.delete("/:id", auth, destroy);

module.exports = router;
