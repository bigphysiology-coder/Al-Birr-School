const pool = require("./db");

async function testConnection() {
  try {
    console.log("🔍 Testing database connection...");
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Database connected:", result.rows[0]);
    
    console.log("\n🔍 Testing uploads folder...");
    const fs = require("fs");
    const path = require("path");
    const uploadDir = path.join(__dirname, "uploads");
    
    if (fs.existsSync(uploadDir)) {
      console.log("✅ Uploads folder exists");
      const files = fs.readdirSync(uploadDir);
      console.log("📁 Files in uploads:", files);
    } else {
      console.log("❌ Uploads folder missing");
    }
    
    console.log("\n✅ All tests passed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

testConnection();
