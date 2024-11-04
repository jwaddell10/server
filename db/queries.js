const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const { session } = require("passport");

module.exports = {
	findUser: async (username) => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					username: username,
				},
			});
			return user;
		} catch (error) {
			throw new Error(error);
		}
	},
	createUser: async (username, password) => {
		try {
			const securePassword = await bcrypt.hash(password, 10);
			const user = await prisma.user.create({
				data: {
					username: username,
					password: securePassword,
				},
			});
			return user;
		} catch (error) {
			throw new Error(error);
		}
	},
	findDemographics: async () => {
		try {
			const demographics = await prisma.demographic.findMany();
			return demographics;
		} catch (error) {
			throw new Error(error);
		}
	},
	findTopics: async () => {
		try {
			const topics = await prisma.topic.findMany();
			return topics;
		} catch (error) {
			throw new Error(error);
		}
	},
	findFolder: async (id) => {
		try {
			const folder = await prisma.folder.findUnique({
				where: {
					id,
				},
			});
			console.log(folder, "folder in find");
			return folder;
		} catch (error) {
			throw new Error(error);
		}
	},
	findFolders: async () => {
		try {
			const folders = await prisma.folder.findMany();
			return folders;
		} catch (error) {
			throw new Error(error);
		}
	},
	createFolder: async (title) => {
		try {
			const folder = await prisma.folder.create({
				data: {
					title: title,
					createdAt: new Date(),
				},
			});
			return folder;
		} catch (error) {
			throw new Error(error);
		}
	},
	deleteFolder: async (id) => {
		try {
			const deletedFolder = await prisma.folder.delete({
				where: {
					id,
				},
			});
			return deletedFolder;
		} catch (error) {
			throw new Error(error);
		}
	},
	findWorksheets: async () => {
		try {
			const worksheets = await prisma.worksheets.findMany();
			return worksheets
		} catch (error) {
			throw new Error(error);
		}
	},
	createWorksheet: async (user, title) => {
		try {
			const worksheet = await prisma.worksheets.create({
				data: {
					// author: user,
					title: title,
					createdAt: new Date(),
				},
			});
			return worksheet;
		} catch (error) {
			throw new Error(error);
		}
	},

	// author      User          @relation(fields: [id], references: [id])
	// // topics      Topic[]       @relation
	// Demographic Demographic[]
	// createdAt   DateTime      @db.Date
	// Folder      Folder[]
};
