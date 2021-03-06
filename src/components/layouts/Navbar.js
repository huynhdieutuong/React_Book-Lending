import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  LoginOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  UserOutlined,
  ScheduleOutlined,
  BookOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

import SearchBar from './SearchBar';
import Logo from '../images/logo-bookstore.png';

import AuthContext from '../../contexts/auth/authContext';
import CartContext from '../../contexts/cart/cartContext';

const { SubMenu } = Menu;

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  // Count books in cart
  let count = 0;
  if (cart) {
    cart.forEach((item) => {
      count += item.quantity;
    });
  }

  const handleClick = (e) => {
    localStorage.setItem('currentMenu', e.key);
    localStorage.removeItem('textSubSearch');
  };

  return (
    <Fragment>
      <Link to='/'>
        <img
          className='logo'
          src={Logo}
          alt='logo'
          onClick={() => {
            localStorage.setItem('currentMenu', 'books');
          }}
        />
      </Link>
      <SearchBar />
      <Menu
        className='menu-right'
        theme='dark'
        mode='horizontal'
        selectedKeys={localStorage.getItem('currentMenu')}
        onClick={handleClick}
      >
        <Menu.Item key='cart' icon={<ShoppingOutlined />}>
          <Link to='/cart'>{count}</Link>
        </Menu.Item>
        {!isAuthenticated ? (
          <Menu.Item key='login' icon={<LoginOutlined />}>
            <Link to='/login'>Login</Link>
          </Menu.Item>
        ) : (
          <SubMenu title={`Hi ${user.name}`}>
            <Menu.Item key='profile' icon={<UserOutlined />}>
              <Link to='/profile'>Profile</Link>
            </Menu.Item>
            {user.isAdmin && (
              <Menu.Item key='adminBooks' icon={<BookOutlined />}>
                <Link to='/books'>Books</Link>
              </Menu.Item>
            )}
            {user.isAdmin && (
              <Menu.Item key='users' icon={<UsergroupAddOutlined />}>
                <Link to='/users'>Users</Link>
              </Menu.Item>
            )}
            <Menu.Item key='transactions' icon={<ScheduleOutlined />}>
              <Link to='/transactions'>Transactions</Link>
            </Menu.Item>
            <Menu.Item key='logout' icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Menu.Item>
          </SubMenu>
        )}
      </Menu>
    </Fragment>
  );
};

export default Navbar;
