import { db } from "../db.js";
import jwt from "jsonwebtoken";

// ✅ Fetch all posts
export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).send(err);
    }

    console.log("Fetched Posts Data:", data); // Debugging
    return res.status(200).json(data);
  });
};

// ✅ Fetch a single post
export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

// ✅ Add a new post
export const addPost = (req, res) => {
  const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.error("❌ No token provided!");
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      console.error("❌ Token verification failed:", err);
      return res.status(403).json("Token is not valid!");
    }

    // Debugging: Log incoming request data
    console.log("🔹 Received Data:", req.body);

    if (!req.body.title || !req.body.desc || !req.body.cat || !req.body.date) {
      console.error("❌ Missing required fields:", req.body);
      return res.status(400).json("Missing required fields!");
    }

    const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";
    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat, req.body.date, userInfo.id];

    console.log("📌 Query Values:", values);

    db.query(q, [values], (err, data) => {
      if (err) {
        console.error("❌ Database Error:", err);
        return res.status(500).json(err);
      }
      console.log("✅ Post has been created.");
      return res.json("Post has been created.");
    });
  });
};


// ✅ Delete a post (Fix: Read Token from Headers)
export const deletePost = (req, res) => {
  const token = req.cookies.access_token  || req.headers.authorization?.split(" ")[1]; // 🔹 Read token from headers
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

// ✅ Update a post
export const updatePost = (req, res) => {
  const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.error("❌ No token provided!");
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      console.error("❌ Token verification failed:", err);
      return res.status(403).json("Token is not valid!");
    }

    const postId = req.params.id;
    const { title, desc, img, cat } = req.body;

    if (!postId || !title || !desc || !cat) {
      console.error("❌ Missing required fields:", { postId, title, desc, cat });
      return res.status(400).json("Missing required fields!");
    }

    const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      // req.body.date,
      // userInfo.id,
    ];

    console.log("🔄 Updating post with values:", values);

    db.query(q, values, (err, data) => {
      if (err) {
        console.error("❌ Database Error:", err);
        return res.status(500).json(err);
      }

      console.log("✅ Post updated successfully!");
      return res.json("Post has been updated.");
    });
  });
};

 