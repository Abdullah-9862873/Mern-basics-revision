import React, { useEffect, useState } from 'react';
import Home from '../home_page/Home';
import './read.css';
import {useNavigate} from "react-router-dom";


function Read() {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(""); // Holds error or success message
  const [successMessage, setSuccessMessage] = useState(""); // Holds success message

  // Fetch data from the backend
  async function getData() {
    try {
      const response = await fetch("http://localhost:5000/api/user"); // Correct URL for your backend
      const result = await response.json();

      if (!response.ok) {
        setError(result.error); // Set error message if response is not ok
      } else {
        setError(""); // Clear the error if the fetch is successful
        setData(result); // Set fetched data to the state
      }
    } catch (error) {
      setError("Failed to fetch data"); // Show error message on network failure
    }
  }

  useEffect(() => {
    getData(); // Fetch data when the component mounts
  }, []);

  // Delete function
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/user/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error); // If there's an error in deletion, display it
    } else {
      setSuccessMessage("Deleted Successfully"); // Display success message
      getData(); // Re-fetch the data after deletion
      setTimeout(() => {
        setSuccessMessage(""); // Clear success message after 2 seconds
      }, 2000);
    }
  };

  // Edit function (just a placeholder here)
  const handleEdit = (id) => {
    navigate(`/${id}`);
  };

  return (
    <div>
      <Home />
      {/* Display the success message at the top */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <div className="card-container">
        {data && data.length > 0 ? (
          data.map((user) => (
            <div key={user._id} className="user-card">
              <div className="card-content">
                <h3 className="user-name">{user.name}</h3>
                <p className="user-email">Email: {user.email}</p>
                <p className="user-age">Age: {user.age}</p>
              </div>
              <div className="card-actions">
                <button onClick={() => handleEdit(user._id)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(user._id)} className="delete-button">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p> // If no data is fetched, show this message
        )}
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}

export default Read;
