import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { reqEditUser, reqEditTag } from '@/services/user'
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
    console.log('values: ', values);
    const { id } = EditItem
    const data = await reqEditTag(values, id)
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

  const { name } = EditItem
  return <div>
    <Form
      {...layout}
      name="basic"

      initialValues={{ name: name }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}

    >
      <Form.Item
        label="标签名"
        name="name"
        rules={[{ required: false, message: 'Please input your username!' }]}
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
