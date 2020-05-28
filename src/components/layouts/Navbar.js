import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  LoginOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  UserOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';

import Logo from '../images/logo-bookstore.png';

const { SubMenu } = Menu;

const Navbar = () => {
  const [currentMenu, setCurrentMenu] = useState(
    localStorage.getItem('currentMenu')
  );

  const handleClick = (e) => {
    setCurrentMenu(e.key);
    localStorage.setItem('currentMenu', e.key);
  };

  return (
    <Fragment>
      <Link to='/'>
        <img
          className='logo'
          src={Logo}
          alt='logo'
          onClick={() => {
            setCurrentMenu('books');
            localStorage.setItem('currentMenu', 'books');
          }}
        />
      </Link>
      <Menu
        className='menu-right'
        theme='dark'
        mode='horizontal'
        selectedKeys={currentMenu}
        onClick={handleClick}
      >
        <Menu.Item key='cart' icon={<ShoppingOutlined />}>
          <Link to='#!'>0</Link>
        </Menu.Item>
        <Menu.Item key='login' icon={<LoginOutlined />}>
          <Link to='/login'>Login</Link>
        </Menu.Item>
        <SubMenu title='Hi Tuong'>
          <Menu.Item key='profile' icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key='transactions' icon={<ScheduleOutlined />}>
            Transactions
          </Menu.Item>
          <Menu.Item key='logout' icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Fragment>
  );
};

export default Navbar;