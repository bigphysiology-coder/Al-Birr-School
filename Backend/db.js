// =============================================
//  DATABASE CONNECTION
// =============================================
const { Pool } = require("pg");

const pool = new Pool({
  user:     process.env.DB_USER     || "postgres",
  host:     process.env.DB_HOST     || "db.ftloknnpyczdquukwmxn.supabase.co",
  database: process.env.DB_NAME     || "postgres",
  password: process.env.DB_PASS     || "F!L&DHjg8i4g86z",
  port:     process.env.DB_PORT     || 5432,
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL connected successfully!"))
  .catch((err) => console.error("❌ Database connection error:", err.message));

module.exports = pool;