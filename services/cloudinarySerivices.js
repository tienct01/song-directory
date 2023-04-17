const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
	secure: true,
});

const uploadImage = async (imagePath) => {
	try {
		const result = await cloudinary.uploader.upload(imagePath, {
			use_filename: true,
			unique_filename: false,
			overwrite: true,
		});

		await fs.unlink(imagePath);

		return result;
	} catch (error) {
		throw error;
	}
};
const uploadAudio = async (imagePath) => {
	try {
		const result = await cloudinary.uploader.upload(imagePath, {
			resource_type: "video",
			use_filename: true,
			unique_filename: false,
			overwrite: true,
		});

		await fs.unlink(imagePath);

		return result;
	} catch (error) {
		throw error;
	}
};

const destroyAsset = async (publicId, resourceType) => {
	cloudinary.uploader
		.destroy(publicId, {
			resource_type: resourceType,
		})
		.then((val) => console.log("Success: ", val))
		.catch((reason) => console.log("CloudinaryErr: ", reason));
};

module.exports = { uploadImage, uploadAudio, destroyAsset };
