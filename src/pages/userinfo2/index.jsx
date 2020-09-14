import React, { useState } from 'react';
import styles from './index.less';
import { Button, Modal, Card, Col, Row } from 'antd'
import LoginForm from './loginform'
const Index = () => {
  const [] = useState(false);
  const [loginModal, setloginModal] = useState(false);
  return (
    <div>

      <Row style={{ marginTop: 5 }} gutter={[16, 16]} >
        <Col flex={2}>
          <Card style={{ height: 600 }}>
            <div className={styles.userinfo}>
              <div className={styles.userinfo_avatar}>

                <div className={styles.userinfo_avatar_img}>avatar</div>
              </div>
            </div>

          </Card>
        </Col>
        <Col flex={6}>
          <Card>112321323</Card>
        </Col>
      </Row>

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
