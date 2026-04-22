// =============================================
//  DATABASE CONNECTION
// =============================================

const { Pool } = require("pg");
require("dotenv").config();

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set!");
  process.exit(1);
}

// Remove channel_binding parameter if present
const connectionString = process.env.DATABASE_URL.replace("&channel_binding=require", "").replace("?channel_binding=require", "");

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  max: 3,
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL connected successfully!"))
  .catch((err) => console.error("❌ Database connection error:", err.message));

module.exports = pool;


////  LOCAL HOST CONNECTION  ////

// const { Pool } = require("pg");
// require("dotenv").config();

// const pool = new Pool({
//   host:     process.env.DB_HOST,
//   port:     process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user:     process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   ssl: false, 
// });

// pool.connect()
//   .then(() => console.log("✅ Database connected successfully"))
//   .catch((err) => console.error("❌ Database connection error:", err.message));

// module.exports = pool;


//// SUPABASE CONNECTION  ////

// const { Pool } = require("pg");
// require("dotenv").config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false },
// });

// pool.connect()
//   .then(() => console.log("✅ PostgreSQL connected successfully!"))
//   .catch((err) => console.error("❌ Database connection error:", err.message));

// module.exports = pool;