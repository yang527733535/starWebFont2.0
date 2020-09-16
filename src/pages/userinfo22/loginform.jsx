import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message, Card } from 'antd';
import { login } from '@/services/video'
const LoginForm = ({ closeModal }) => {
  const [] = useState(false);
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 14 },
  };

  const onFinish = async values => {
    console.log('values: ', values);
    const data = await login(values)
    console.log('data: ', data);
    if (data.code === 200) {
      message.success("登录成功")
      localStorage.setItem("token", data.data.token)
      localStorage.setItem("userinfomation", JSON.stringify(data.data.user))
      closeModal()
    }
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>

      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="手机号"
          name="telephone"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>



        <Form.Item {...tailLayout}>
          <Button
            color="blue"
            type="primary"
            htmlType="submit">
            登录
        </Button>
        </Form.Item>
      </Form></div>
  )
};
export default LoginForm;
