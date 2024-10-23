import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Button, Drawer, Tooltip } from 'antd';
import { MedicineBoxFilled, BellOutlined, ScheduleOutlined, DashboardOutlined, MenuOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const Header = () => {
  const [username, setUsername] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUsername(null);
    navigate('/login');
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <AntHeader className="header" style={{ backgroundColor: '#f0f2f5', padding: '0 20px', display: 'flex', alignItems: 'center' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src="https://img.icons8.com/dotty/80/pills.png" // Using the provided icon URL
          alt="Medicine Logo" 
          style={{ width: '40px', height: '40px' }} // Adjust size as needed
        />
        <span style={{ marginLeft: '8px', fontWeight: 'bold', fontSize: '18px' }}>MediMate</span>
      </Link>

      {isMobile ? (
        <>
          <Button className="menu-button" type="primary" icon={<MenuOutlined />} onClick={showDrawer} style={{ marginLeft: 'auto' }} />
          <Drawer title="Menu" placement="right" closable={true} onClose={onClose} visible={visible}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
              {username ? (
                <>
                  <Link to="/schedule">
                    <Button type="link" icon={<ScheduleOutlined />} style={{ padding: 0, fontSize: '1rem' }}>
                      Schedule
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button type="link" icon={<DashboardOutlined />} style={{ padding: 0, fontSize: '1rem' }}>
                      Dashboard
                    </Button>
                  </Link>
                  <Button type="link" icon={<BellOutlined />} onClick={handleLogout} style={{ padding: 0, fontSize: '1rem' }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button type="link" icon={<LoginOutlined />} style={{ padding: 0, fontSize: '1rem' }}>
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button type="link" icon={<UserAddOutlined />} style={{ padding: 0, fontSize: '1rem' }}>
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </Drawer>
        </>
      ) : (
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '16px', alignItems: 'center' }}>
          {username ? (
            <>
              <Link to="/schedule">
                <Tooltip title="Schedule">
                  <Button type="link" icon={<ScheduleOutlined />} style={{ fontSize: '1rem' }}>
                    Schedule
                  </Button>
                </Tooltip>
              </Link>
              <Link to="/dashboard">
                <Tooltip title="Dashboard">
                  <Button type="link" icon={<DashboardOutlined />} style={{ fontSize: '1rem' }}>
                    Dashboard
                  </Button>
                </Tooltip>
              </Link>
              <Button type="link" icon={<BellOutlined />} onClick={handleLogout} style={{ fontSize: '1rem' }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Tooltip title="Login">
                  <Button type="link" icon={<LoginOutlined />} style={{ fontSize: '1rem' }}>
                    Login
                  </Button>
                </Tooltip>
              </Link>
              <Link to="/register">
                <Tooltip title="Register">
                  <Button type="link" icon={<UserAddOutlined />} style={{ fontSize: '1rem' }}>
                    Register
                  </Button>
                </Tooltip>
              </Link>
            </>
          )}
        </div>
      )}
    </AntHeader>
  );
};

export default Header;
