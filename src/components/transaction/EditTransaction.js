import React, { useContext, useState, useEffect } from 'react';
import { Form, Select, Button, message, Checkbox } from 'antd';

import Spinner from '../layouts/Spinner';

import TransactionContext from '../../contexts/transaction/transactionContext';

const { Option } = Select;

const EditTransaction = ({ setVisible, single }) => {
  const {
    editTransaction,
    loadAdminDatas,
    adminDatas,
    transaction,
  } = useContext(TransactionContext);

  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values) => {
    let { user, books, isComplete } = values;

    books = books.map((book) => book.slice(0, 24));
    isComplete = JSON.stringify(isComplete);

    const hide = message.loading('Action in progress..', 0);

    setDisabled(true);
    await editTransaction(transaction._id, { user, books, isComplete }, single);

    setTimeout(hide, 0);
    setVisible(false);
    setDisabled(false);
  };

  useEffect(() => {
    loadAdminDatas();
    // eslint-disable-next-line
  }, [adminDatas]);

  if (!adminDatas) return <Spinner />;

  return (
    <Form
      name='normal_login'
      className='login-form'
      onFinish={onFinish}
      initialValues={{
        user: transaction.user._id,
        books: transaction.books.map((book) => `${book._id} - ${book.title}`),
        isComplete: transaction.isComplete,
      }}
    >
      <Form.Item
        name='user'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select an user!',
          },
        ]}
      >
        <Select placeholder='Please select an user'>
          {adminDatas.users.map((user) => (
            <Option
              key={user._id}
              value={user._id}
            >{`${user._id} - ${user.name}`}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name='books'
        rules={[
          {
            required: true,
            message: 'Please select books',
            type: 'array',
          },
        ]}
      >
        <Select mode='multiple' placeholder='Please select books'>
          {adminDatas.books.map((book) => (
            <Option key={book._id} value={`${book._id} - ${book.title}`}>
              {book.title}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name='isComplete' valuePropName='checked'>
        <Checkbox>Mark as Completed</Checkbox>
      </Form.Item>

      <Form.Item style={{ marginBottom: '0' }}>
        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button'
          disabled={disabled}
        >
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditTransaction;
