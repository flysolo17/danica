const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = async (query, params) => {
  try {
    console.log(query);
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query(query, params);
    console.log("Query Result:", rows);
    connection.release();
    return rows;
  } catch (error) {
    console.error("Query Error: ", error);
    throw error;
  }
};
