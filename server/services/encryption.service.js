import bcryptjs from "bcryptjs";

const encryptPassword = async function (rawPassword) {
	const saltRounds = 10;
	const encryptedPassword = await bcryptjs.hash(rawPassword, saltRounds);
	return encryptedPassword;
};

const isPasswordValid = async function (incomingPassword, passwordFromDB) {
	const decryptedPassword = await bcryptjs.compare(incomingPassword, passwordFromDB)
	return decryptedPassword;
};

export {encryptPassword, isPasswordValid}
