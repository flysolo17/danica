const connection = require("../config/connection");
const { userQueries } = require("../config/user-quries");
const { hashPassword } = require("../security/encryption");

async function createUser(user) {
  try {
    const hashedPassword = await hashPassword(user.password);
    const params = [
      user.person,
      user.name,
      user.address,
      user.phone,
      user.position,
      +user.type,
      user.email,
      hashedPassword,
    ];
    await connection(userQueries.INSERT_USER, params);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getUserByEmail(email) {
  try {
    const result = await connection(
      userQueries.SIGN_IN_WITH_EMAIL_AND_PASSWORD,
      [email]
    );
    return result;
  } catch (error) {
    return [];
  }
}

module.exports = { createUser, getUserByEmail };
