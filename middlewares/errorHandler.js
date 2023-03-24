async function errorHandler(err, req, res, next) {
	console.log(err);
	return res.status(500).send("Internal Server Error");
}

module.exports = errorHandler;
