module.exports = {
	getPublicId: (link) => {
		let file_name = link.split(/\//).pop();
		let public_id = file_name.split(".")[0];
		return public_id;
	},
};
