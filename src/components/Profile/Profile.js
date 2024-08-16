import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';  

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); 
    if (userId) {
      axios.get(`http://localhost:5000/api/user/getuser/${userId}`)
        .then(response => {
          setUser(response.data.data);
        })
        .catch(error => {
          console.error('There was an error fetching the user data!', error);
        });
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src={user.image ? `http://localhost:5000/${user.image}` : 'default-profile-image.png'} alt="Profile" />
      </div>
      <div className="profile-details">
        <h1>{user.firstname} {user.lastname}</h1>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>User Type:</strong> {user.usertype}</p>
      </div>
    </div>
  );
};

export default Profile;
