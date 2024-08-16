import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostDisplay.css";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";

const PostDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});

 
  const handleClick = (postId) => {
    setLikedPosts(prevLikedPosts => ({
      ...prevLikedPosts,
      [postId]: !prevLikedPosts[postId]
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await axios.get(
          "http://localhost:5000/api/posts/getpost"
        );
        const fetchedPosts = postsResponse.data;

        
        const sortedPosts = fetchedPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedPosts);

        const usersResponse = await axios.get(
          "http://localhost:5000/api/user/getalluser"
        );
        setUsers(usersResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getUserById = (userId) => {
    return users.find((user) => user._id === userId);
  };

  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="post-container">
      <h1>POSTS</h1>
      {posts.map((post) => {
        const user = getUserById(post.userid);

        return (
          <div key={post._id} className="post-card">
            {post.image && (
              <img
                src={`http://localhost:5000/uploads/${post.image}`}
                alt="Post"
                className="post-image"
              />
            )}
            <div className="post-content">
              <div className="post-header">
                {user && (
                  <div className="user-info">
                    {/* <img src={`http://localhost:5000/uploads/`} alt="User" className="user-profile-image" /> */}
                    <span className="user-name">
                      {user.firstname} {user.lastname}
                    </span>
                  </div>
                )}
              </div>
              <p className="post-comment">{post.comment}</p>
              <div className="post-actions">
                <button
                  className="action-button"
                  onClick={() => handleClick(post._id)}
                >
                  {likedPosts[post._id] ? <FaHeart color="red" /> : <FaRegHeart />}
                </button>
                <button className="action-button">
                  <FaRegComment />
                </button>
              </div>
              <p className="post-date">{formatDate(post.createdAt)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostDisplay;
