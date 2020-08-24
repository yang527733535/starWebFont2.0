import React, { useState } from 'react';
// import styles from './style.less';
import { Button, Modal } from 'antd'
import LoginForm from './loginform'
const Index = () => {
  const [] = useState(false);
  const [loginModal, setloginModal] = useState(false);
  return (
    <div>
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
