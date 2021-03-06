import React, { useContext, useEffect } from 'react';
import { Row, Col, PageHeader, Descriptions, Button } from 'antd';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/auth/authContext';

import ChangeAvatar from './ChangeAvatar';
import EditProfileModal from './EditProfileModal';
import ChangePasswordModal from './ChangePasswordModal';
import CreatePasswordModal from './CreatePasswordModal';

const Profile = () => {
  const { user } = useContext(AuthContext);

  const { email, name, phone } = user;

  useEffect(() => {
    localStorage.setItem('currentMenu', 'profile');
  }, []);

  return (
    <Row>
      <Col span={5}>
        <ChangeAvatar />
      </Col>
      <Col span={19}>
        <PageHeader
          className='site-page-header-responsive'
          onBack={() => window.history.back()}
          title={name}
          extra={[
            <Button type='primary'>
              <Link to='/transactions'>Transactions</Link>
            </Button>,
            <EditProfileModal />,
            user.password ? <ChangePasswordModal /> : <CreatePasswordModal />,
          ]}
        >
          <Descriptions size='small' column={1}>
            <Descriptions.Item label='Email'>{email}</Descriptions.Item>
            <Descriptions.Item label='Name'>{name}</Descriptions.Item>
            <Descriptions.Item label='Phone'>{phone}</Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </Col>
    </Row>
  );
};

export default Profile;
