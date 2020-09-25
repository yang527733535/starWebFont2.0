import React, { useState } from 'react';
import styles from './index.less'
import { Card, Divider, message } from 'antd'
import { login } from '@/services/video'
import { history } from 'umi'
import { Form, Input, Button, Checkbox } from 'antd';
import loginimg from './login.jpg'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const onFinish = async values => {
  console.log('values: ', values);

  const data = await login(values)
  console.log('data: ', data);
  if (data.code === 200) {
    message.success("登录成功")
    localStorage.setItem("token", data.data.token)
    localStorage.setItem("userinfomation", JSON.stringify(data.data.user))
    history.push('/test/userinfo')
    // userinfo
  }
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const Index = () => {
  const [] = useState(false);
  return <div
    className={styles.myloginbox}
  >
    <div className={styles.leftimg}>
      <img src={loginimg}></img>

    </div>
    <div className={styles.rigthcontent}>
      <div className={styles.myLoginContent_R}>
        <div className={styles.myLoginContent_LoginForm}>
          <div style={{ marginBottom: 20 }}
            className={styles.LoginTitle}>
            登录
            </div>

          <div style={{ marginTop: 20 }} className={styles.myForm}>
            <Form
              onFinish={onFinish}
              className="login-form">
              <div className={styles.myForm_Username}>
                账号
                </div>
              <Form.Item
                name='telephone'
                className={styles.formItem}>
                <Input
                  // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="telephone"
                />
              </Form.Item>
              <div className={styles.myForm_Username}>
                密码
                </div>
              <Form.Item
                name='password'
                className={styles.formItem}>
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>


                <div className={styles.myBtnDiv}>
                  <Button
                    block
                    style={{ width: 320 }}
                    className={styles.loginBtn}
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    <span className={styles.sign}>登录</span>
                  </Button>
                </div>
                <div className={styles.myBtnDiv}>
                  <Button
                    block
                    style={{ width: 320, marginTop: 20 }}
                    className={styles.loginBtn}
                    size="large"
                    type="primary"
                    onClick={() => { history.push("/test/content") }}
                    className="login-form-button"
                  >
                    <span className={styles.sign}>返回首页</span>
                  </Button>
                </div>
              </Form.Item>
            </Form>

            <div>
              <span style={{ color: '#ABABAB' }}> Version v1.0.0</span>

            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
};
export default Index;