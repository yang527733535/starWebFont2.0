import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';

import { register } from '@/services/user'
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};


const Index = ({ closeModal }) => {

  const [] = useState(false);
  const onFinish = async values => {
    console.log('values: ', values);
    const data = await register(values)
    console.log('data: ', data);
    if (data.code === 1) {
      message.success("注册成功")
      closeModal(closeModal)
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  return <div>
    <Form
      {...layout}
      name="basic"


      onFinish={onFinish}
      onFinishFailed={onFinishFailed}

    >
      <Form.Item
        label="用户名"
        name="name"
        rules={[{
          required: true,
          message: 'Please input your username!',
        }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="手机号码"
        name="telephone"
        rules={[{
          required: true,
          message: '请输入正确的手机号码!',
          pattern: /^1(3[0-9]|5[189]|8[6789])[0-9]{8}$/
        }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{
          required: true,
          message: 'Please input your password!'
        }]}
      >
        <Input.Password />
      </Form.Item>




      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form></div>
};
export default Index;
