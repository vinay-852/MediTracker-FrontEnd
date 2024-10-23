import React, { useState, useEffect } from 'react';
import { Table, Input, Button, TimePicker, message, Divider, Radio } from 'antd';
import { Line } from '@ant-design/charts';
import { TableOutlined, BarChartOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../api';
import Layout from '../components/layout';

const MedicineSchedule = () => {
  const [compartments, setCompartments] = useState({
    compartment1: [],
    compartment2: [],
    compartment3: [],
    compartment4: [],
  });
  const [medicineName, setMedicineName] = useState('');
  const [time, setTime] = useState(null);
  const [selectedCompartment, setSelectedCompartment] = useState('compartment1');
  const [viewMode, setViewMode] = useState('table');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const { data } = await api.get('/schedules', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompartments(data.compartments);
      } catch (error) {
        message.error('Failed to fetch medicine schedule');
      }
    };
    fetchSchedule();
  }, [token]);

  const handleAddMedicine = async () => {
    if (!medicineName || !time) {
      message.error('Please enter both medicine name and time!');
      return;
    }

    const newMedicine = { name: medicineName, time: time.format('HH:mm'), dateCreated: new Date().toLocaleString() };
    try {
      const { data } = await api.post(`/schedules/${selectedCompartment}`, newMedicine, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompartments(data.compartments);
      setMedicineName('');
      setTime(null);
      message.success('Medicine added successfully!');
    } catch (error) {
      message.error('Failed to add medicine');
    }
  };

  const handleDeleteMedicine = async (compartment, index) => {
    try {
      const { data } = await api.delete(`/schedules/${compartment}/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompartments(data.compartments);
      message.success('Medicine deleted successfully!');
    } catch (error) {
      message.error('Failed to delete medicine');
    }
  };

  const getGraphData = () => {
    const medicines = compartments[selectedCompartment];
    return medicines.map((item, index) => ({
      name: item.name,
      time: item.time,
      medicineIndex: index,
      dateCreated: item.dateCreated,
    }));
  };

  const config = {
    data: getGraphData(),
    xField: 'medicineIndex',
    yField: 'time',
    seriesField: 'name',
    xAxis: {
      label: {
        formatter: (value) => `Medicine ${value}`,
      },
    },
    yAxis: {
      type: 'time',
      label: {
        formatter: (value) => `${value} (HH:mm)`,
      },
    },
    point: {
      size: 5,
      shape: 'diamond',
    },
    tooltip: {
      customContent: (title, items) => {
        if (items && items.length) {
          const { name, time } = items[0].data;
          return `<div style="padding: 10px;"><strong>${name}</strong><br/>Time: ${time}</div>`;
        }
        return null;
      },
    },
    height: 200,
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    background: '#ffffff',
  };

  const columns = [
    {
      title: 'Medicine Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record, index) => (
        <Button onClick={() => handleDeleteMedicine(selectedCompartment, index)} icon={<DeleteOutlined />} />
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ padding: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='schedule-page'>
        <div style={{ marginBottom: '5%' }}>
          <Radio.Group
            value={selectedCompartment}
            onChange={(e) => setSelectedCompartment(e.target.value)}
          >
            <Radio.Button value="compartment1">Compartment 1</Radio.Button>
            <Radio.Button value="compartment2">Compartment 2</Radio.Button>
            <Radio.Button value="compartment3">Compartment 3</Radio.Button>
            <Radio.Button value="compartment4">Compartment 4</Radio.Button>
          </Radio.Group>
        </div>

        <div style={{ marginBottom: '5%', width: '100%', maxWidth: '600px' }}>
          <Input
            placeholder="Medicine name"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            style={{ marginBottom: '10px', width: '100%' }}
          />
          <TimePicker
            value={time}
            onChange={(time) => setTime(time)}
            format="HH:mm"
            style={{ marginBottom: '10px', width: '100%' }}
          />
        </div>
        <Button type="primary" onClick={handleAddMedicine} style={{ marginBottom: '5%' }} icon={<PlusOutlined />}>
          Add Medicine
        </Button>

        <Divider />

        <Button
          onClick={() => setViewMode(viewMode === 'table' ? 'graph' : 'table')}
          icon={viewMode === 'table' ? <BarChartOutlined /> : <TableOutlined />}
        >
          {viewMode === 'table' ? 'Switch to Graph View' : 'Switch to Table View'}
        </Button>

        <Divider />

        {viewMode === 'table' ? (
          <Table
            columns={columns}
            dataSource={compartments[selectedCompartment]}
            rowKey={(record, index) => index}
            pagination={false}
            scroll={{ x: true }}
          />
        ) : (
          <div style={{ width: '100%', maxWidth: '800px', background: '#fafafa', padding: '5%' }}>
            {getGraphData().length > 0 ? (
              <Line {...config} />
            ) : (
              <p>No medicines available to display on the graph.</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MedicineSchedule;