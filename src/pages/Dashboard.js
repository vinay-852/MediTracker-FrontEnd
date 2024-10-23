import React, { useEffect, useState } from 'react';
import { Table, Spin, message, Row, Col } from 'antd';
import api from '../api';
import Layout from '../components/layout';

const ScheduleVisualization = () => {
    const [loading, setLoading] = useState(true);
    const [scheduleData, setScheduleData] = useState([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await api.get('/schedules', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setScheduleData(response.data.compartments);
                setLoading(false);
            } catch (err) {
                message.error('Error fetching schedule');
                setLoading(false);
            }
        };
        fetchSchedule();
    }, []);

    const columns = [
        {
            title: 'Compartment',
            dataIndex: 'compartment',
            key: 'compartment',
        },
        {
            title: 'Task Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Scheduled Time',
            dataIndex: 'time',
            key: 'time',
        },
    ];

    const dataSource = Object.keys(scheduleData).map(compartment => {
        return scheduleData[compartment].map((task, index) => ({
            key: `${compartment}-${index}`,
            compartment,
            name: task.name,
            time: task.time,
        }));
    }).flat();

    return (
        <Layout>
            <Row justify="center" align="middle" className="dashboard-container">
                <Col span={24} className="table-container">
                    {loading ? <Spin /> : <Table dataSource={dataSource} columns={columns} />}
                </Col>
            </Row>
        </Layout>
    );
};

export default ScheduleVisualization;