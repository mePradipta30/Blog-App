import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";



const Single = () => {
  const [post, setPost] = useState(null); // 🔹 Change initial state to null
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log("Error fetching post:", err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log("Error deleting post:", err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  if (!post) {
    return <p>Loading...</p>; // ✅ Prevents errors while fetching data
  }

  return (
    <div className="single">
      <div className="content">
        {post.img && <img src={`http://localhost:8800/api/upload/${post.img}`} alt="" />}
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {post.date ? formatDistanceToNow(new Date(post.date), { addSuffix: true }) : "N/A"}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="Edit" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="Delete" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: post.desc }}></p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};


export default Single;
