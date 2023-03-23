async function auth(req, res, next) {
	console.log("in middleware");
	if (req.session.auth) {
		next();
	} else {
		return res.redirect("/notfound");
	}
}
module.exports = auth;
