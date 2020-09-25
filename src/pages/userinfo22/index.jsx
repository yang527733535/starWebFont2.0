import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Button, Modal, Card, Col, Row, Divider } from 'antd'
import LoginForm from './loginform'
import UploadAva from './avatarForm'
import { history } from 'umi'
import { getNowUserinfo, GetUserVideoListApi } from '@/services/user'
import EditForm from './EditForm'
import UploadVideoForm from './uploadform'
const Index = () => {
  async function NowUserinfo() {
    const userinfodata = await getNowUserinfo()
    console.log('userinfodata: ', userinfodata);
    setuserinfo(userinfodata.data.user)
  }
  useEffect(() => {
    document.title = '个人中心'
    let data = localStorage.getItem("token")
    if (data === null) {
      return
    }
    //这里最稳妥的还是直接通过token来获取用户的信息
    NowUserinfo()
    GetUserVideoList()
  }, [])


  useEffect(() => {
    let token = localStorage.getItem("token")
    if (token === null) {
      console.log('我没有登录')
      history.push('/loginandresgister')
    }

  }, [])

  async function GetUserVideoList() {
    setcardloading(true)
    let { id } = userinfo
    let res = await GetUserVideoListApi(id)
    setcardloading(false)
    let { data } = res
    console.log('data: ', data);
    setuserVideoList(data.data)
  }
  const [uploadModal, setuploadModal] = useState(false);
  const [cardloading, setcardloading] = useState(false);
  const [userVideoList, setuserVideoList] = useState([]);
  const [userinfo, setuserinfo] = useState({});
  const [AvatarModal, setAvatarModal] = useState(false);
  const [loginModal, setloginModal] = useState(false);
  const [EditUserInfoModal, setEditUserInfoModal] = useState(false);
  console.log(userVideoList)
  return (
    <div>
      <Row style={{ marginTop: 5 }} gutter={[16, 16]} >
        <Col flex={2}>
          <Card hoverable style={{ height: 300, minWidth: 300 }}>
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
                <Button onClick={() => {
                  setEditUserInfoModal(true)
                }} type='primary'>修改信息</Button>
                <Button onClick={() => { setAvatarModal(true) }} type='primary'>更换头像</Button>
                <Button type='primary'>修改密码</Button>
                <Button
                  onClick={() => {
                    localStorage.clear()
                    history.push('/loginandresgister')
                  }}
                >退出登录</Button>
              </div>
            </div>
          </Card>
        </Col>
        <Col flex={6}>
          <Card
            extra={<Button
              onClick={() => { setuploadModal(true) }}
            >上传视频</Button>}
            loading={cardloading}
            hoverable
            title='我的投稿'
            style={{ height: 2600, minWidth: 300 }}>
            {
              userVideoList?.map((item) =>
                <div
                  onClick={() => {
                    history.push({
                      pathname: '/test/videopage',
                      query: {
                        id: item.id,
                      },
                    });
                  }}
                  key={item.id}>
                  <div className={styles.myVideoItem}>
                    <div className={styles.myVideoItem_img}>
                      <img src={item.avatar}></img>
                    </div>
                    <div className={styles.myVideoItem_desc}>
                      <div className={styles.myVideoItem_desc_NAME}>{item.title}</div>
                      <div className={styles.myVideoItem_desc_desc}>
                        {item.info}
                      </div>
                    </div>
                  </div>
                  <Divider></Divider>
                </div>


              )
            }
          </Card>
        </Col>
      </Row>


      <Modal
        destroyOnClose
        title='修改信息'
        visible={EditUserInfoModal}
        footer={null}
        onCancel={() => {
          setEditUserInfoModal(false)
        }}
      >
        <EditForm
          closeModalAndReqNowUserData={() => {
            setEditUserInfoModal(false)
            NowUserinfo()
          }}
          userinfo={userinfo}></EditForm>

      </Modal>

      <Modal
        destroyOnClose
        visible={AvatarModal}
        title='修改头像'
        footer={null}
        onCancel={() => { setAvatarModal(false) }}
      >
        <div className={styles.AvatarModal}>
          <div className={styles.imgword}>
            当前头像
          </div>
          <UploadAva

            userinfo={userinfo}
            NowUserinfo={NowUserinfo} />
          <div className={styles.NowAvatar} >
            <div>

              <img src={userinfo?.avatar}></img >
            </div>

          </div>
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


      {/* 这个是视频投稿的MODAL */}
      <Modal
        visible={uploadModal}
        footer={null}
        onCancel={() => { setuploadModal(false) }}
      >

        <UploadVideoForm
          userInfo={userinfo}
        ></UploadVideoForm>
      </Modal>

    </div>
  )
};
export default Index;
