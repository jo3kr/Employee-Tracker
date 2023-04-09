import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "employee_tracker",
});

const db = connection.promise();

export default connection;
