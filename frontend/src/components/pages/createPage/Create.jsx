import React, { useState } from 'react';
import Home from '../home_page/Home';
import './create.css';
import {useNavigate} from "react-router-dom";

function Create() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // "error" or "success"
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addUser = { name, email, age };

    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        // Display an error message
        setAlertMessage(result.error || "Something went wrong!");
        setAlertType("error");
      } else {
        // Display a success message
        setAlertMessage("User successfully added!");
        setAlertType("success");

        // Clear the form fields
        setName("");
        setEmail("");
        setAge(0);
        navigate("/all");
      }

      // Clear the alert after 3 seconds
      setTimeout(() => {
        setAlertMessage('');
        setAlertType('');
      }, 3000);
    } catch (error) {
      console.error("Failed to submit data:", error);
      setAlertMessage("Failed to submit data. Please try again.");
      setAlertType("error");
    }
  };

  return (
    <div>
      <Home />
      <div className="create-form-container">
        <h2 className="form-title">User Form</h2>

        {/* Alert Box */}
        {alertMessage && (
          <div className={`alert-box ${alertType}`}>
            {alertMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
