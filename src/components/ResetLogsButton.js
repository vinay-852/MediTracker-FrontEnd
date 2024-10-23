import React from 'react';
import { Button, message } from 'antd';
import api from '../api'; // Import your custom API module

const ResetLogsButton = () => {
  const token = localStorage.getItem('token'); // Get JWT token from localStorage

  // Function to reset logs
  const resetLogs = async () => {
    try {
      // API call to reset the logs
      const response = await api.delete('/users/logs/reset', {
        headers: {
          Authorization: `Bearer ${token}`, // Include Authorization header with token
          'Content-Type': 'application/json',
        },
      });

      // Success notification
      message.success('Logs reset successfully');
      console.log('Logs reset:', response.data);
    } catch (error) {
      // Error notification
      console.error('Error resetting logs:', error);
      message.error('Failed to reset logs');
    }
  };

  return (
    <Button type="danger" onClick={resetLogs}>
      Reset Logs
    </Button>
  );
};

export default ResetLogsButton;
