const expressAsyncHandler = require("express-async-handler");
const db = require("../db/queries.js");
const cloudinary = require("cloudinary").v2;

exports.getDemographics = expressAsyncHandler(async (req, res, next) => {
	const demographics = await db.findDemographics();
	if (demographics) {
		return res.json(demographics);
	}
});

exports.getTopics = expressAsyncHandler(async (req, res, next) => {
	const topics = await db.findTopics();
	if (topics) {
		return res.json(topics);
	}
});

exports.getOne = expressAsyncHandler(async (req, res, next) => {
	console.log(req.body, "this is req get one");
});

exports.uploadWorksheet = expressAsyncHandler(async (req, res, next) => {
	const file = req.file;
	console.log(req.body, "req body");

	console.log(file, "file");

	const uploadedResult = await cloudinary.uploader
		.upload(file)
		.catch((error) => console.log(error, "error"));
    
    console.log(uploadedResult, 'uplaoded result')

	// const uploadResult = await cloudinary.uploader
	// .upload(
	//     'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
	//         public_id: 'shoes',
	//     }
	// )
	// .catch((error) => {
	//     console.log(error);
	// });
});
