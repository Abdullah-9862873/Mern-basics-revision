import React, { useState, useEffect } from 'react';
import Home from "../home_page/Home";
import "./update.css";
import { useParams, useNavigate } from 'react-router-dom';

function Update() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [error, setError] = useState('');
  const { id } = useParams(); // Get the user id from URL
  const navigate = useNavigate();

  // Fetch the user data based on the id from URL params
  useEffect(() => {
    const getSingleUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${id}`);
        const result = await response.json();

        if (!response.ok) {
          setError(result.error); // Show error if fetching fails
        } else {
          setName(result.name);
          setEmail(result.email);
          setAge(result.age);
          setError(""); // Clear any existing error
        }
      } catch (error) {
        setError("Failed to fetch user data");
      }
    };

    getSingleUser();
  }, [id]);

  // Handle the form submit to update the user details
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = { name, email, age };

    try {
      const response = await fetch(`http://localhost:5000/api/user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error); // Show error if update fails
      } else {
        setError(""); // Clear error if update succeeds
        navigate("/all"); // Redirect to the 'read' page after successful update
      }
    } catch (error) {
      setError("Failed to update user data");
    }
  };

  return (
    <div>
      <Home />
      <div className="update-container">
        <h2>Update User</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleUpdate} className="update-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              required
            />
          </div>

          <button type="submit" className="update-button">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
