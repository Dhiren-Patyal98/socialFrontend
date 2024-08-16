import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; 

function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    image: null, 
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0], 
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("firstname", formData.firstname);
    formDataToSend.append("lastname", formData.lastname);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("password", formData.password);
    if (formData.image) {
      formDataToSend.append("image", formData.image); 
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          password: "",
          image: null,
        });
        
        alert("Registration successful!");
        navigate("/");
      } else {
        alert(data.msg || "Registration failed.");
      }
    } catch (error) {
      alert("An error occurred.");
    }
  };

  return (
    <div className="yo-body">
      <div className="App">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className="input-box">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="file"
                name="image"
                accept="image/*" 
                onChange={handleChange}
              />
            </div>
            <button type="submit">Register</button>
            <div className="register-link">
              <p>
                Already have an account? <Link to="/">Login here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
