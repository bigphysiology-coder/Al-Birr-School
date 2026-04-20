require("dotenv").config();
const pool = require("./db");

const migrateDatabase = async () => {
  try {
    // Add photo column to staff table if it doesn't exist
    await pool.query(`
      ALTER TABLE staff
      ADD COLUMN IF NOT EXISTS photo VARCHAR(255)
    `);

    console.log("✅ Staff table updated with photo column!");

    // Add update_at timestamp to news, events, staff if not exists
    await pool.query(`
      ALTER TABLE news
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    `);

    await pool.query(`
      ALTER TABLE events
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    `);

    await pool.query(`
      ALTER TABLE staff
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    `);

    console.log("✅ All tables migrated successfully!");

  } catch (error) {
    console.error("❌ Migration error:", error.message);
  } finally {
    pool.end();
  }
};

migrateDatabase();
