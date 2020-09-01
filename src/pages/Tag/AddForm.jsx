import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';

import { addTag } from '@/services/user'
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
    const data = await addTag(values)
    console.log('data: ', data);
    if (data.code === 1) {
      message.success('添加成功')
      closeModal()
    }
    if (data.code === 0) {
      message.error(data.msg)
      
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
        label="标签名"
        name="name"
        rules={[{
          required: true,
          message: '请输入你的标签名',
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
