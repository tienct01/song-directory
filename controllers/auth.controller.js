async function authCheck(req, res) {
	const { authcode } = req.query;
	if (authcode === "duytiendeptrai") {
		req.session.auth = true;
	}
	return res.redirect("/");
}
async function logout(req, res) {
	req.session.destroy();
	return res.redirect("/");
}

module.exports = {
	authCheck,
	logout,
};
