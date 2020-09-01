import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';

import { EditUserPwd } from '@/services/user'
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};


const Index = ({ closeModal, EditItem }) => {

  const [] = useState(false);
  const onFinish = async values => {
    console.log('values: ', values);
    console.log(EditItem)
    const data = await EditUserPwd(values, EditItem.id)
    if (data.code === 1) {
      message.success('修改成功')
      closeModal()
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
