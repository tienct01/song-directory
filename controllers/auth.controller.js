async function authCheck(req, res, next) {
	try {
		const { authcode } = req.query;
		if (authcode === "duytiendeptrai") {
			req.session.auth = true;
		}
		return res.redirect("/");
	} catch (error) {
		next(error);
	}
}
async function logout(req, res, next) {
	try {
		req.session.destroy();
		return res.redirect("/");
	} catch (error) {
		next(error);
	}
}

module.exports = {
	authCheck,
	logout,
};
