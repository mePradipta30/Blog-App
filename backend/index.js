import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({ 
  origin: "http://localhost:5173", // Allow frontend
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

// Serve static files from "uploads" directory
app.use("/upload", express.static(path.join(__dirname, "uploads")));

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/vite-project/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Correct Upload Route (Without Full URL)
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json("No file uploaded.");
  res.status(200).json({ filename: req.file.filename });
});

// Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("Connected! Server running on port 8800");
});
