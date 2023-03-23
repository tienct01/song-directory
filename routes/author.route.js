const express = require("express");
const {
	index,
	create,
	store,
	update,
	destroy,
} = require("../controllers/author.controller.js");
const upload = require("../middlewares/upload.js");
const auth = require("../middlewares/auth.js");
const router = express.Router();

router.get("/", index);
router.get("/create", create);
router.post("/", upload.single("avatar"), store);
router.put("/:authorId", update);
router.delete("/:id", auth, destroy);

module.exports = router;
