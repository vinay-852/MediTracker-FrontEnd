import React from 'react';
import { Button, message } from 'antd';
import api from '../api'; // Import custom API module
import Layout from '../components/layout';

const MedicineLogger = () => {
  const token = localStorage.getItem('token'); // Get JWT token from localStorage

  // Function to log the compartment with current timestamp
  const logCompartment = async (compartment) => {
    const openedAt = new Date().toISOString(); // Get current timestamp in ISO format

    try {
      // API call to log the medicine intake
      const response = await api.post(
        '/users/logs', // Your API URL
        { compartment, openedAt }, // Sending compartment and timestamp
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include Authorization header with token
            'Content-Type': 'application/json',
          },
        }
      );

      // Success notification
      message.success(`Medicine logged for ${compartment} at ${openedAt}`);
      console.log('Log added:', response.data);
    } catch (error) {
      // Error notification
      console.error('Error logging medicine:', error);
      message.error('Failed to log the medicine');
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h1>Medicine Tracker</h1>
        <p>Click a button to log the medicine intake from a compartment:</p>

        <div style={styles.buttonContainer}>
          <Button type="primary" onClick={() => logCompartment('compartment1')}>
            Compartment 1
          </Button>
          <Button type="primary" onClick={() => logCompartment('compartment2')}>
            Compartment 2
          </Button>
          <Button type="primary" onClick={() => logCompartment('compartment3')}>
            Compartment 3
          </Button>
          <Button type="primary" onClick={() => logCompartment('compartment4')}>
            Compartment 4
          </Button>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
};

export default MedicineLogger;