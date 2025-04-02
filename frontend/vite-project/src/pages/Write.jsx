import React, { useState, useTransition } from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw, ContentState } from "draft-js";

import "draft-js/dist/Draft.css"; // Import Draft.js default styles
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Write = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  // State variables
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [isPending, startTransition] = useTransition();

  // ✅ Properly initialize Draft.js editor state
  const [editorState, setEditorState] = useState(() => {
    if (state?.desc) {
      try {
        // 🛑 Check if it's already plain text (not JSON)
        if (typeof state.desc === "string" && !state.desc.startsWith("{")) {
          return EditorState.createWithContent(ContentState.createFromText(state.desc)); 
        }
        const content = convertFromRaw(JSON.parse(state.desc)); // ✅ Convert JSON to ContentState
        return EditorState.createWithContent(content);
      } catch (error) {
        console.error("Error parsing content:", error);
        return EditorState.createEmpty();
      }
    }
    return EditorState.createEmpty();
  });
  
  
  // ✅ Upload function
  const upload = async () => {
    if (!file) return "";

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://localhost:8800/api/upload", formData) 
        return res.data;
      

      //return res.data.filename; // ✅ Return uploaded file name
    } catch (err) {
      console.error("Upload error:", err);
      return "";
    }
  };

  // ✅ Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();

    const contentState = editorState.getCurrentContent();
    const rawContent = JSON.stringify(convertToRaw(contentState));

  
    try {
      // 🔹 Retrieve token from cookies
      // const token = document.cookie
      //   .split("; ")
      //   .find((row) => row.startsWith("access_token="))
      //   ?.split("=")[1];
  
      // if (!token) {
      //   console.error("No authentication token found. Please log in.");
      //   return;
      // }
  
      // 🔹 Upload image only if a file is selected
      let imgUrl = "";
      if (file) {
        imgUrl = await upload();
      }
  
      // 🔹 Define payload
      // const payload = {
      //   title,
      //   desc: value, // Ensure `value` is correctly defined
      //   cat,
      //   img: imgUrl,
      //   date: format(new Date(), "yyyy-MM-dd HH:mm:ss"), // Replacing moment with date-fns
      // };
  
      // 🔹 Include authentication token in headers
      // const headers = {
      //   headers: { Authorization: `Bearer ${token}` },
      //   withCredentials: true, // Ensures cookies are sent
      // };
  
      // 🔹 Send API request
      state ?
        await axios.put(`http://localhost:8800/api/posts/${state.id}`,{
          title,
          desc: rawContent ,
          cat,
          img : imgUrl,
        },{
          withCredentials : true
        }
          //date: format(new Date(), "yyyy-MM-dd HH:mm:ss")
        )
       : 
        await axios.post(`http://localhost:8800/api/posts/`,{title,
          desc: rawContent,
          cat,
          img : imgUrl,
          date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        },
        {
          withCredentials : true}
        
 );
      
  
      // 🔹 Navigate after successful submission
      navigate("/");
    } catch (err) {
      console.error("Error submitting post:", err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer" style={{ border: "1px solid #ccc", padding: "10px" }}>
          <Editor editorState={editorState} onChange={setEditorState} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button disabled={isPending}>Save as Draft</button>
            <button onClick={handleClick} disabled={isPending}>
              {isPending ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          {["art", "science", "technology", "cinema", "design", "food"].map(
            (category) => (
              <div className="cat" key={category}>
                <input
                  type="radio"
                  name="cat"
                  value={category}
                  id={category}
                  checked={cat === category}
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Write;
