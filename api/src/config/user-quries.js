const userQueries = {
  INSERT_USER: `INSERT INTO users(person,name,address,phone,position,type,email,password) VALUES (?,?,?,?,?,?,?,?);`,
  GET_USER_BY_ID: `SELECT from users WHERE id = ?;`,
  SIGN_IN_WITH_EMAIL_AND_PASSWORD: `SELECT * from users WHERE email = ?;`,
};

module.exports = { userQueries };
