// =============================================
//  AL-BIRR ISLAMIC MODEL SCHOOL — Backend Server
// =============================================

const jwt        = require("jsonwebtoken");
const bcrypt     = require("bcryptjs");
const verifyToken = require("./auth");
const express    = require("express");
const nodemailer = require("nodemailer");
const cors       = require("cors");
const dotenv     = require("dotenv");
const multer     = require("multer");
const path       = require("path");
const fs         = require("fs");

// Load environment variables FIRST
dotenv.config();

// Then load database
const pool = require("./db");

const app  = express();
const PORT = process.env.PORT || 5000;

// =============================================
//  FILE UPLOAD CONFIGURATION
// =============================================
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// =============================================
//  MIDDLEWARE
// =============================================
// app.use(cors({
//   origin: [
//     "http://localhost:5000",
//     "http://127.0.0.1:5500",
//     "http://localhost:5500",
//     process.env.FRONTEND_URL,
//   ].filter(Boolean),
//   credentials: true,
// }));
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =============================================
//  EMAIL TRANSPORTER
// =============================================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =============================================
//  ROUTES
// =============================================

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Al-Birr Islamic Model School Server is running! ✅" });
});

// =============================================
//  CONTACT FORM ROUTE
// =============================================
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  try {
    // Save to database
    await pool.query(
      `INSERT INTO contacts (name, email, subject, message)
       VALUES ($1, $2, $3, $4)`,
      [name, email, subject, message]
    );

    // Email to school admin
    await transporter.sendMail({
      from:    process.env.EMAIL_USER,
      to:      process.env.EMAIL_USER,
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <h2>New Message from Al-Birr Islamic Model School Website</h2>
        <table style="border-collapse:collapse; width:100%">
          <tr>
            <td style="padding:8px; border:1px solid #ddd; font-weight:bold">Name</td>
            <td style="padding:8px; border:1px solid #ddd">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px; border:1px solid #ddd; font-weight:bold">Email</td>
            <td style="padding:8px; border:1px solid #ddd">${email}</td>
          </tr>
          <tr>
            <td style="padding:8px; border:1px solid #ddd; font-weight:bold">Subject</td>
            <td style="padding:8px; border:1px solid #ddd">${subject}</td>
          </tr>
          <tr>
            <td style="padding:8px; border:1px solid #ddd; font-weight:bold">Message</td>
            <td style="padding:8px; border:1px solid #ddd">${message}</td>
          </tr>
        </table>
      `,
    });

    // Auto reply to sender
    await transporter.sendMail({
      from:    process.env.EMAIL_USER,
      to:      email,
      subject: "Thank you for contacting Al-Birr Islamic Model School",
      html: `
        <h2>Thank you, ${name}!</h2>
        <p>We have received your message and will get back
           to you within 24 hours.</p>
        <br/>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>Al-Birr Islamic Model School Team</strong></p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Message sent and saved successfully!",
    });

  } catch (error) {
    console.error("Contact error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again.",
    });
  }
});

// =============================================
//  ENROLLMENT ROUTE
// =============================================
// =============================================
//  WHATSAPP SETTINGS ROUTES
// =============================================

// Get WhatsApp settings (public)
app.get("/api/whatsapp", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM whatsapp_settings ORDER BY id DESC LIMIT 1"
    );
    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          phone: "2348012345678",
          message: "Hello! I am interested in enrolling my child at Al-Birr Islamic Model School. Please provide more information.",
        },
      });
    }
    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Get WhatsApp settings error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch WhatsApp settings.",
    });
  }
});

// Update WhatsApp settings (admin only)
app.put("/api/whatsapp", verifyToken, async (req, res) => {
  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({
      success: false,
      message: "Phone and message are required.",
    });
  }

  try {
    // Check if settings exist
    const existing = await pool.query("SELECT id FROM whatsapp_settings LIMIT 1");

    let result;
    if (existing.rows.length > 0) {
      result = await pool.query(
        `UPDATE whatsapp_settings
         SET phone=$1, message=$2, updated_at=CURRENT_TIMESTAMP
         WHERE id=$3 RETURNING *`,
        [phone, message, existing.rows[0].id]
      );
    } else {
      result = await pool.query(
        `INSERT INTO whatsapp_settings (phone, message)
         VALUES ($1, $2) RETURNING *`,
        [phone, message]
      );
    }

    res.status(200).json({
      success: true,
      message: "WhatsApp settings updated successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Update WhatsApp settings error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update WhatsApp settings.",
    });
  }
});

// =============================================
//  GET ALL CONTACTS ROUTE
// =============================================
app.get("/api/contacts", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM contacts ORDER BY created_at DESC"
    );
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get contacts error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts.",
    });
  }
});

// =============================================
//  DELETE CONTACT ROUTE
// =============================================
app.delete("/api/contacts/:id", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM contacts WHERE id = $1 RETURNING id",
      [req.params.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Contact message deleted successfully.",
    });
  } catch (error) {
    console.error("Delete contact error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete contact message.",
    });
  }
});

// // =============================================
// //  GET ALL ENROLLMENTS ROUTE
// // =============================================
// app.get("/api/enrollments", verifyToken, async (req, res) => {
//   try {
//     const result = await pool.query(
//       "SELECT * FROM enrollments ORDER BY created_at DESC"
//     );
//     res.status(200).json({
//       success: true,
//       data: result.rows,
//     });
//   } catch (error) {
//     console.error("Get enrollments error:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch enrollments.",
//     });
//   }
// });

// =============================================
//  NEWS ROUTES
// =============================================

// Get all news
app.get("/api/news", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM news ORDER BY created_at DESC"
    );
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get news error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch news.",
    });
  }
});

// Add news
app.post("/api/news", verifyToken, async (req, res) => {
  const { title, category, description, icon } = req.body;

  if (!title || !category || !description) {
    return res.status(400).json({
      success: false,
      message: "Title, category and description are required.",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO news (title, category, description, icon)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, category, description, icon || "📰"]
    );
    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Add news error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add news.",
    });
  }
});

// Update news
app.put("/api/news/:id", verifyToken, async (req, res) => {
  const { title, category, description, icon } = req.body;

  if (!title || !category || !description) {
    return res.status(400).json({
      success: false,
      message: "Title, category and description are required.",
    });
  }

  try {
    const result = await pool.query(
      `UPDATE news SET title=$1, category=$2, description=$3, icon=$4
       WHERE id=$5 RETURNING *`,
      [title, category, description, icon || "📰", req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }
    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Update news error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update news.",
    });
  }
});

// Delete news
app.delete("/api/news/:id", verifyToken, async (req, res) => {
  try {
    await pool.query("DELETE FROM news WHERE id = $1", [req.params.id]);
    res.status(200).json({
      success: true,
      message: "News deleted successfully.",
    });
  } catch (error) {
    console.error("Delete news error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete news.",
    });
  }
});

// =============================================
//  EVENTS ROUTES
// =============================================

// Get all events
app.get("/api/events", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events ORDER BY event_date ASC"
    );
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get events error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch events.",
    });
  }
});

// Add event
app.post("/api/events", verifyToken, async (req, res) => {
  const { title, description, event_date } = req.body;

  if (!title || !description || !event_date) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO events (title, description, event_date)
       VALUES ($1, $2, $3) RETURNING *`,
      [title, description, event_date]
    );
    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Add event error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add event.",
    });
  }
});

// Update event
app.put("/api/events/:id", verifyToken, async (req, res) => {
  const { title, description, event_date } = req.body;

  if (!title || !description || !event_date) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  try {
    const result = await pool.query(
      `UPDATE events SET title=$1, description=$2, event_date=$3
       WHERE id=$4 RETURNING *`,
      [title, description, event_date, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }
    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Update event error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update event.",
    });
  }
});

// Delete event
app.delete("/api/events/:id", verifyToken, async (req, res) => {
  try {
    await pool.query("DELETE FROM events WHERE id = $1", [req.params.id]);
    res.status(200).json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (error) {
    console.error("Delete event error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete event.",
    });
  }
});

// =============================================
//  STAFF ROUTES
// =============================================

// Get all staff
app.get("/api/staff", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM staff ORDER BY created_at ASC"
    );
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get staff error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch staff.",
    });
  }
});

// Add staff
app.post("/api/staff", verifyToken, upload.single("photo"), async (req, res) => {
  const { name, role, bio } = req.body;
  const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !role) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(400).json({
      success: false,
      message: "Name and role are required.",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO staff (name, role, bio, photo)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, role, bio || "", photoPath]
    );
    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    console.error("Add staff error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add staff.",
    });
  }
});

// Update staff
app.put("/api/staff/:id", verifyToken, upload.single("photo"), async (req, res) => {
  const { name, role, bio } = req.body;
  const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !role) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(400).json({
      success: false,
      message: "Name and role are required.",
    });
  }

  try {
    let query, params;

    if (photoPath) {
      // Get old photo to delete
      const oldStaff = await pool.query("SELECT photo FROM staff WHERE id=$1", [req.params.id]);
      if (oldStaff.rows[0]?.photo) {
        const oldPath = path.join(__dirname, oldStaff.rows[0].photo);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      query = `UPDATE staff SET name=$1, role=$2, bio=$3, photo=$4
               WHERE id=$5 RETURNING *`;
      params = [name, role, bio || "", photoPath, req.params.id];
    } else {
      query = `UPDATE staff SET name=$1, role=$2, bio=$3
               WHERE id=$4 RETURNING *`;
      params = [name, role, bio || "", req.params.id];
    }

    const result = await pool.query(query, params);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Staff not found.",
      });
    }
    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    console.error("Update staff error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update staff.",
    });
  }
});

// Delete staff
app.delete("/api/staff/:id", verifyToken, async (req, res) => {
  try {
    // Get staff photo before deleting
    const staff = await pool.query("SELECT photo FROM staff WHERE id=$1", [req.params.id]);
    if (staff.rows[0]?.photo) {
      const photoPath = path.join(__dirname, staff.rows[0].photo);
      if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
    }

    await pool.query("DELETE FROM staff WHERE id = $1", [req.params.id]);
    res.status(200).json({
      success: true,
      message: "Staff deleted successfully.",
    });
  } catch (error) {
    console.error("Delete staff error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete staff.",
    });
  }
});


// =============================================
//  ADMIN LOGIN ROUTE
// =============================================
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;

  // Check username
  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password.",
    });
  }

  // Check password
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password.",
    });
  }

  // Generate JWT token
  const token = jwt.sign(
    { username: username, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.status(200).json({
    success: true,
    message: "Login successful!",
    token: token,
  });
});

// =============================================
//  VERIFY ADMIN TOKEN ROUTE
// =============================================
app.get("/api/admin/verify", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Token is valid.",
    admin: req.admin,
  });
});

// =============================================
//  ADMIN LOGOUT ROUTE
// =============================================
app.post("/api/admin/logout", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
});

// =============================================
//  LOGO ROUTES
// =============================================

// Get current logo
app.get("/api/logo", (req, res) => {
  try {
    const logoPath = path.join(__dirname, "uploads", "logo.png");
    if (fs.existsSync(logoPath)) {
      res.sendFile(logoPath);
    } else {
      res.status(404).json({
        success: false,
        message: "Logo not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch logo.",
    });
  }
});

// Upload logo
app.post("/api/logo", verifyToken, upload.single("logo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    // Delete old logo if exists
    const oldLogoPath = path.join(__dirname, "uploads", "logo.png");
    if (fs.existsSync(oldLogoPath)) {
      fs.unlinkSync(oldLogoPath);
    }

    // Rename uploaded file to logo.png
    const newLogoPath = path.join(__dirname, "uploads", "logo.png");
    fs.renameSync(req.file.path, newLogoPath);

    res.status(200).json({
      success: true,
      message: "Logo uploaded successfully.",
      logoUrl: "/uploads/logo.png",
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    console.error("Logo upload error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to upload logo.",
    });
  }
});


// =============================================
//  START SERVER
// =============================================
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});