import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Aman@005",
  database: "ecommerce_sql",
});

export default pool;
