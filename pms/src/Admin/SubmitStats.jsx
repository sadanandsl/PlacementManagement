// components/SubmitStats.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubmitStats = () => {
  const [stats, setStats] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedStat, setEditedStat] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/stats');
        setStats(response.data);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message
      }
    };

    fetchStats();
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedStat(stats[index]);
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
    setEditedStat({});
  };

  const handleSaveEdit = async (index) => {
    try {
      // Assuming you have an API endpoint for updating the stats
      await axios.put(`http://localhost:3001/api/stats/${stats[index]._id}`, editedStat);
      alert('Placement statistics updated successfully!');
      setStats((prevStats) => {
        const updatedStats = [...prevStats];
        updatedStats[index] = editedStat;
        return updatedStats;
      });
      setEditIndex(-1);
      setEditedStat({});
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStat({ ...editedStat, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Assuming you have an API endpoint for submitting new stats
      await axios.post('http://localhost:3001/api/stats', editedStat);
      alert('Placement statistics submitted successfully!');
      setStats((prevStats) => [...prevStats, editedStat]);
      setEditedStat({});
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <h2>Submit Placement Stats</h2>
      <form>
        {/* Include your input fields for stats */}
        <label>
          Companies Visited:
          <input
            type="text"
            name="companiesVisited"
            value={editedStat.companiesVisited || ''}
            onChange={handleInputChange}
            disabled={editIndex !== -1}
          />
        </label>
        <br />
        <label>
          Placed Students:
          <input
            type="text"
            name="placedStudents"
            value={editedStat.placedStudents || ''}
            onChange={handleInputChange}
            disabled={editIndex !== -1}
          />
        </label>
        <br />
        {/* Add more input fields if needed */}

        {/* Buttons for editing and submitting */}
        {editIndex === -1 ? (
          <button type="button" onClick={() => handleEdit(stats.length)}>
            Edit
          </button>
        ) : (
          <>
            <button type="button" onClick={handleSaveEdit}>
              Save
            </button>
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </>
        )}
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>

      {/* Display the current stats */}
      <h2>Current Placement Stats</h2>
      <ul>
        {stats.map((stat, index) => (
          <li key={stat._id}>
            <p>Companies Visited: {stat.companiesVisited}</p>
            <p>Placed Students: {stat.placedStudents}</p>
            {/* Display more stats if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmitStats;
