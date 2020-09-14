import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Button, Modal, Card, Col, Row, Divider } from 'antd'
import LoginForm from './loginform'
import avatar from './dava.png'
import { json } from 'express';
import UploadAva from './avatarForm'


const Index = () => {
  const [] = useState(false);
  const [userinfo, setuserinfo] = useState({});
  const [AvatarModal, setAvatarModal] = useState(false);


  useEffect(() => {
    document.title = '个人中心'
    let data = localStorage.getItem("userinfomation")
    data = JSON.parse(data)
    setuserinfo(data)

  }, [])

  const [loginModal, setloginModal] = useState(false);
  return (
    <div>

      <Row style={{ marginTop: 5 }} gutter={[16, 16]} >
        <Col flex={2}>
          <Card style={{ height: 300, minWidth: 300 }}>
            <div className={styles.userinfo}>
              <div className={styles.userinfo_avatar}>
                <div className={styles.userinfo_avatar_img}>
                  <img src={userinfo?.avatar}></img >
                </div>
              </div>
              <div className={styles.userinfo_username} >{userinfo?.name}</div>
              <div className={styles.userinfo_desc} >{userinfo?.user_desc}</div>
              <Divider></Divider>
              <div className={styles.userinfo_edit}>
                <Button type='primary'>修改信息</Button>
                <Button onClick={() => { setAvatarModal(true) }} type='primary'>更换头像</Button>
                <Button>修改密码</Button>
              </div>
            </div>

          </Card>
        </Col>
        <Col flex={6}>
          <Card
            title='我的投稿'
            style={{ height: 2600, minWidth: 300 }}>112321323</Card>
        </Col>
      </Row>


      <Modal
        destroyOnClose
        visible={AvatarModal}
        title='修改头像'
        footer={null}
        onCancel={() => { setAvatarModal(false) }}
      >
        <div className={styles.AvatarModal}>
          <UploadAva />
          <Divider type='vertical'></Divider>
        </div>



      </Modal>

      <Modal
        visible={loginModal}
        onCancel={() => { setloginModal(false) }}
        footer={null}
      >
        <LoginForm
          closeModal={() => { setloginModal(false) }}
        ></LoginForm>
      </Modal>
      <Button

        onClick={() => { setloginModal(true) }}
      >Login</Button>
    </div>
  )
};
export default Index;
