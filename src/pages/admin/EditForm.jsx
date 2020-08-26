import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { reqEditUser } from '@/services/user'
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};


const Index = ({ EditItem, closeModal }) => {

  const [] = useState(false);
  const onFinish = async values => {


    const data = await reqEditUser(values, EditItem.id)
    console.log('data: ', data);
    if (data.code === 1) {
      message.success("修改成功")
      closeModal()
    }
    //在这里发起请求

  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const { Telephone, Name } = EditItem
  return <div>
    <Form
      {...layout}
      name="basic"

      initialValues={{ name: Name, telephone: Telephone }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}

    >
      <Form.Item
        label="用户名"
        name="name"
        rules={[{ required: false, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="手机号码"
        name="telephone"
        rules={[{
          required: false,
          message: 'Please input your password!'
        }]}
      >
        <Input />
      </Form.Item>



      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form></div>
};
export default Index;
