import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { reqEditUserInfo } from '@/services/user'
const Index = ({ userinfo, closeModalAndReqNowUserData }) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };

  const onFinish = async values => {
    console.log('Success:', values);
    let { id } = userinfo
    const res = await reqEditUserInfo(values, id)
    console.log('res: ', res);
    if (res.data.code === 1) {
      message.success("修改成功")
      //关闭弹窗 拉取最新的
      closeModalAndReqNowUserData()
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const [userdesc, setuserdesc] = useState({})

  useEffect(() => {
    let userdesc = localStorage.getItem("userinfomation")
    userdesc = JSON.parse(userdesc)
    setuserdesc(userdesc)
  }, [])

  console.log(userinfo)

  return <div>

    <Form
      {...layout}
      name="basic"
      initialValues={{
        name: userinfo.name,
        user_desc: userinfo.user_desc
      }}
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
        label="个人简介"
        name="user_desc"
        rules={[{ required: false, message: 'Please input your password!' }]}
      >
        <Input.TextArea />
      </Form.Item>



      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

  </div>
};
export default Index;