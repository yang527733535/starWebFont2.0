import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { history } from 'umi'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;



export default ({ children, location }) => {

  // Background
  useEffect(() => {

    const { pathname } = location
    console.log('pathname: ', pathname);
    // pathname: "/index"
    if (pathname === "/test/content") {
      setposition(['1'])
    }

    if (pathname === "/test/upload") {
      setposition(['2'])
    }
    if (pathname === "/test/userinfo") {
      setposition(['3'])
    }
  }, [])


  const [position, setposition] = useState([])

  const changepage = (pagetype) => {

    if (pagetype === 1) {
      setposition(['1'])
      history.push("/test/content")
    }
    if (pagetype === 2) {
      setposition(['2'])
      history.push("/test/upload")
    }
    if (pagetype === 3) {
      setposition(['3'])
      history.push("/test/userinfo")
    }

  }

  return (
    <div
      style={{
        backgroundRepeat: "repeat-y",
        backgroundImage: "url(" + require("../../image/backgrond.jpg") + ")"
      }}>
      <Layout
        // http://desk.zol.com.cn/showpic/1920x1200_32845_14.html
        // style={{ backgroundImage: `url(${Background})` }}

        className={styles.laylot}>
        <Header>
          <div></div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={position}
          // defaultSelectedKeys={position}
          >
            <Menu.Item
              onClick={() => { changepage(1) }}
              key="1">首页</Menu.Item>
            <Menu.Item
              onClick={() => { changepage(2) }}
              key="2">投稿</Menu.Item>
            <Menu.Item
              onClick={() => { changepage(3) }}
              key="3">个人中心</Menu.Item>
          </Menu>
        </Header>
        <Content

          style={{
            padding: '10px 50px',

            //  backgroundImage
          }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <div className="site-layout-content">
            {children}
          </div>
        </Content>

      </Layout>
    </div >
  );
}
