// src/components/Schedule.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../api';

const Schedule = () => {
  const [schedule, setSchedule] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Initialize empty form structure for each compartment
  const [form, setForm] = useState({
    compartment1: { times: [''], status: true },
    compartment2: { times: [''], status: true },
    compartment3: { times: [''], status: true },
    compartment4: { times: [''], status: true },
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      fetchSchedule();
    } else {
      navigate('/');
    }
  }, [navigate]);

  const fetchSchedule = async () => {
    try {
      const res = await api.get('/schedules');
      setSchedule(res.data);
    } catch (err) {
      setError('Failed to fetch schedule');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (schedule) {
        await api.put(`/schedules/${schedule._id}`, form);
      } else {
        await api.post('/schedules', form);
      }
      fetchSchedule();
    } catch (err) {
      setError('Failed to save schedule');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/schedules/${schedule._id}`);
      setSchedule(null);
    } catch (err) {
      setError('Failed to delete schedule');
    }
  };

  // Function to handle adding a new time instance for a compartment
  const addTimeInstance = (compartment) => {
    setForm({
      ...form,
      [compartment]: {
        ...form[compartment],
        times: [...form[compartment].times, ''],
      },
    });
  };

  // Function to handle changing a time value
  const handleTimeChange = (compartment, index, value) => {
    const updatedTimes = form[compartment].times.map((time, idx) =>
      idx === index ? value : time
    );
    setForm({
      ...form,
      [compartment]: {
        ...form[compartment],
        times: updatedTimes,
      },
    });
  };

  return (
    <div>
      <h2>Schedule</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        {['compartment1', 'compartment2', 'compartment3', 'compartment4'].map((comp, idx) => (
          <div key={idx}>
            <h3>{comp}</h3>
            {form[comp].times.map((time, timeIndex) => (
              <input
                key={timeIndex}
                type="time"
                value={time}
                onChange={(e) => handleTimeChange(comp, timeIndex, e.target.value)}
                required
              />
            ))}
            <button
              type="button"
              onClick={() => addTimeInstance(comp)}
            >
              Add Another Time
            </button>
            <label>
              Active
              <input
                type="checkbox"
                checked={form[comp].status}
                onChange={(e) =>
                  setForm({ ...form, [comp]: { ...form[comp], status: e.target.checked } })
                }
              />
            </label>
          </div>
        ))}
        <button type="submit">{schedule ? 'Update' : 'Add'} Schedule</button>
      </form>
      {schedule && <button onClick={handleDelete}>Delete Schedule</button>}
    </div>
  );
};

export default Schedule;
