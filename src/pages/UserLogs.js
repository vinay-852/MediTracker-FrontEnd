import React, { useState, useEffect } from 'react';
import { Radio, Divider, Spin, message, Table, Button } from 'antd';
import moment from 'moment';
import api from '../api';
import Layout from '../components/layout';
import ResetLogsButton from '../components/ResetLogsButton'; // Import ResetLogsButton

const MedicineAnalysis = () => {
  const [compartments, setCompartments] = useState({
    compartment1: [],
    compartment2: [],
    compartment3: [],
    compartment4: [],
  });
  const [logs, setLogs] = useState([]);
  const [selectedCompartment, setSelectedCompartment] = useState('compartment1');
  const [loading, setLoading] = useState(false);
  const [selectedDate] = useState(moment());
  const token = localStorage.getItem('token');

  // Fetch the medicine schedule and logs
  const fetchScheduleAndLogs = async (date) => {
    setLoading(true);
    try {
      const scheduleResponse = await api.get('/schedules', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const logsResponse = await api.get('/users/logs', {
        headers: { Authorization: `Bearer ${token}` },
        params: { date: date.format('YYYY-MM-DD') },
      });

      setCompartments(scheduleResponse.data.compartments);
      setLogs(logsResponse.data);
    } catch (error) {
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduleAndLogs(selectedDate);
  }, [token, selectedDate]);

  // Helper function to check if a log is within the scheduled time (with 30-minute tolerance)
  const isOnTime = (scheduledTime, loggedTime) => {
    const scheduled = moment(scheduledTime, 'HH:mm');
    const logged = moment(loggedTime, 'HH:mm');
    return Math.abs(logged.diff(scheduled, 'minutes')) <= 30; // 30 minutes tolerance
  };

  // Get today's full date in 'YYYY-MM-DD' format
  const today = moment().format('YYYY-MM-DD');

  // Create a helper function to check if the log matches both today's date and the time
  const isLogOnTimeForToday = (scheduledTime, logEntry) => {
    const scheduled = moment(`${today} ${scheduledTime}`, 'YYYY-MM-DD HH:mm'); // Include today's date
    const logged = moment(logEntry.openedAt); // Log timestamp includes both date and time

    // Compare both the date and time within 30 minutes tolerance
    return Math.abs(logged.diff(scheduled, 'minutes')) <= 30;
  };

  // Create table data to show scheduled and actual times
  const getTableData = () => {
    const compartmentLogs = logs.filter((log) => log.compartment === selectedCompartment);
    const scheduledMedicines = compartments[selectedCompartment];

    return scheduledMedicines.map((medicine, index) => {
      // Find the log entry that matches today's date and time
      const logEntry = compartmentLogs.find((log) =>
        isLogOnTimeForToday(medicine.time, log)
      );

      const actualLogTime = logEntry ? moment(logEntry.openedAt).format('HH:mm') : 'Missed';
      const status = logEntry ? 'On Time' : 'Missed';

      return {
        key: index,
        medicineName: medicine.name,
        scheduledTime: medicine.time,
        actualLogTime: actualLogTime,
        status: status,
      };
    });
  };

  const tableColumns = [
    {
      title: 'Medicine Name',
      dataIndex: 'medicineName',
      key: 'medicineName',
    },
    {
      title: 'Scheduled Time',
      dataIndex: 'scheduledTime',
      key: 'scheduledTime',
    },
    {
      title: 'Actual Log Time',
      dataIndex: 'actualLogTime',
      key: 'actualLogTime',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ color: status === 'On Time' ? 'green' : 'red' }}>{status}</span>
      ),
    },
  ];

  // Handle log button click
  const handleLogClick = () => {
    window.location.href = '/logger'; // Redirect to the logger page
  };

  return (
    <Layout>
      <div className="medicine-analysis-container">
        <Radio.Group
          value={selectedCompartment}
          onChange={(e) => setSelectedCompartment(e.target.value)}
          style={{ marginBottom: '16px' }}
        >
          <Radio.Button value="compartment1">Compartment 1</Radio.Button>
          <Radio.Button value="compartment2">Compartment 2</Radio.Button>
          <Radio.Button value="compartment3">Compartment 3</Radio.Button>
          <Radio.Button value="compartment4">Compartment 4</Radio.Button>
        </Radio.Group>

        <Divider />

        {loading ? (
          <Spin tip="Loading data..." />
        ) : (
          <>
            <Table
              columns={tableColumns}
              dataSource={getTableData()}
              pagination={false}
              bordered
              title={() => 'Schedule and Logs Details'}
            />
          </>
        )}

        <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
          <Button type="primary" onClick={handleLogClick}>
            Go to Logger
          </Button>

          {/* Add Reset Logs Button */}
          <ResetLogsButton />
        </div>
      </div>
    </Layout>
  );
};

export default MedicineAnalysis;
