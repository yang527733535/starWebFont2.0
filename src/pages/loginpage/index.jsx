import React, { useEffect, useState } from 'react';
import styles from './index.less'
import { Card, Divider, message } from 'antd'
import { login } from '@/services/video'
import { history } from 'umi'
import { Form, Input, Button, Checkbox } from 'antd';
import loginimg from './login.jpg'
import { reqSendEmail, reqRegister } from '@/services/user'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const Index = () => {
  let timeChange;
  const [] = useState(false);
  const [formtype, setformtype] = useState(2); //1 是登录 2 是注册
  const [registerEmail, setregisterEmail] = useState();
  const [time, setTime] = useState(60);
  const [yzm, setyzm] = useState();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnContent, setBtnContent] = useState('获取验证码');


  const onFinish = async values => {


    if (formtype === 2) {
      // 我是走注册接口
      delete values.yzm
      values.verification_Code = yzm
      console.log('values: ', values);
      let res = await reqRegister(values)
      if (res.code === 1) {
        message.success('注册成功')
        setformtype(1)
      } else {
        message.error("注册失败")
      }
      return
    }

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

  const sendEmail = async () => {
    console.log(registerEmail)
    let myparar = {
      email: registerEmail,
    }
    let data = reqSendEmail(myparar)
    console.log('data: ', data);
  }

  useEffect(() => {
    clearInterval(timeChange);
  }, []);

  useEffect(() => {
    if (time > 0 && time < 60) {
      setBtnContent(`${time}s后重发`);
    } else {
      clearInterval(timeChange);
      setBtnDisabled(false);
      setTime(60);
      setBtnContent('获取验证码');
    }
  }, [time]);

  const countDown = () => {
    sendEmail()
    timeChange = setInterval(() => setTime(t => --t), 1000);
    setBtnDisabled(true);
  }

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
            <span
              onClick={() => { setformtype(1) }}
              className={formtype === 1 ? styles.LoginTitle_selectspan : null}> 登录</span>
            <span> | </span>
            <span
              className={formtype === 2 ? styles.LoginTitle_selectspan : null}
              onClick={() => { setformtype(2) }} style={{ cursor: 'pointer' }}>注册</span>

          </div>
          {
            formtype === 1 ?
              <div style={{ marginTop: 20 }} className={styles.myForm}>
                <Form
                  onFinish={onFinish}
                  className="login-form">
                  <div className={styles.myForm_Username}>
                    账号
            </div>
                  <Form.Item
                    name='email'
                    className={styles.formItem}>
                    <Input
                      // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="email"
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
              : <div style={{ marginTop: 20 }} className={styles.myForm}>
                <Form
                  onFinish={onFinish}
                  className="login-form">
                  <div className={styles.myForm_Username}>
                    邮箱
                </div>
                  <Form.Item
                    name='email'
                    label=""
                    rules={[{ type: 'email' }]}
                    className={styles.formItem}>
                    <Input
                      type="email"
                      onChange={(e) => {
                        setregisterEmail(e.target.value)
                      }}
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
                      <Form.Item
                        name='yzm'
                        className={styles.formItem}
                      >
                        <Input
                          onChange={(e) => {
                            setyzm(e.target.value)
                          }}
                          // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          // type="password"
                          placeholder="验证码"
                          style={{ marginRight: 10 }}
                        />
                        <Button

                          disabled={btnDisabled}
                          onClick={countDown}
                        >{btnContent}</Button>
                      </Form.Item>
                    </div>
                    <div className={styles.myBtnDiv}>
                      <Button
                        block
                        style={{ width: 320, marginTop: 20 }}
                        className={styles.loginBtn}
                        size="large"
                        type="primary"
                        htmlType="submit"
                        // onClick={() => { history.push("/test/content") }}
                        className="login-form-button"
                      >
                        <span className={styles.sign}>注册  </span>
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
                <div>
                  <span style={{ color: '#ABABAB' }}> Version v1.0.0</span>
                </div>
              </div>

          }

        </div>
      </div>

    </div>

  </div>
};
export default Index;