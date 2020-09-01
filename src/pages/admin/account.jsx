import React, { useState, useEffect } from 'react';
import { Card, Table, Modal, Button, Popconfirm, message } from 'antd'
import styles from './index.less'
import { changeUserStatus, reqUserList } from "@/services/user"
import { formatDate } from '@/utils/utils'
import EditForm from './EditForm.jsx'
import EditPwdForm from './EditPwdForm.jsx'
import AddForm from './AddForm.jsx'
const Index = () => {
  const [users, setusers] = useState([]);
  const [EditUserModal, setEditUserModal] = useState(false);
  const [AddUserModal, setAddUserModal] = useState(false);
  const [EidtUserPwdModal, setEidtUserPwdModal] = useState(false);

  const [EditItem, setEditItem] = useState({});

  let columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (item) => {
        return <span>
          {formatDate(item)}
        </span>
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (item) => {
        return <span>
          {formatDate(item)}
        </span>
      }
    },
    {
      title: '用户名',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: '手机号码',
      dataIndex: 'Telephone',
      key: 'Telephone',
    },
    {
      title: '状态',
      dataIndex: 'Status',
      key: 'Status',
      render: (item) => {
        if (item === 0) {
          return <span>启用</span>
        }

        if (item === 1) {
          return <span>禁用</span>
        }

      }
    },
    {
      title: '操作',
      key: '操作',
      render: (item) =>

        (<div>
          <a
            onClick={() => {
              setEditUserModal(true)
              setEditItem(item)
            }}
          >编辑信息</a>
          <a
            onClick={() => {
              setEditItem(item)
              setEidtUserPwdModal(true)
            }}
            style={{ marginLeft: 10 }}>修改密码</a>
          <Popconfirm
            title="确定修改用户状态?"
            onConfirm={() => { changeStatus(item) }}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a

              style={{ marginLeft: 10 }}>修改状态</a>
          </Popconfirm>

        </div>)
    },

  ]

  const changeStatus = async (item) => {
    console.log('Status: ', item.Status);
    let id = item.id
    if (item.Status === 0) {
      const param = {
        status: 1
      }
      const data = await changeUserStatus(param, id)
      console.log('data: ', data);
      if (data.code === 1) {
        message.success('修改成功')
        GetUserList()
      }
    }

    if (item.Status === 1) {
      const param = {
        status: 0
      }
      const data = await changeUserStatus(param, id)
      console.log('data: ', data);
      if (data.code === 1) {
        message.success('修改成功')
        GetUserList()
      }
    }
  }

  async function GetUserList() {
    const data = await reqUserList()
    if (data.code === 200) {
      console.log(data.data.data)
      setusers(data.data.data)
    }
  }
  useEffect(() => {

    GetUserList()
  }, [])


  return <div className={styles.bigWrap}>
    <Modal
      footer={null}
      onCancel={() => { setEditUserModal(false) }}
      visible={EditUserModal}
      destroyOnClose
      title="修改用户信息"
    >
      <EditForm
        closeModal={() => {
          setEditUserModal(false)
          GetUserList()
        }}
        EditItem={EditItem}></EditForm>
    </Modal>

    <Modal
      footer={null}
      onCancel={() => { setAddUserModal(false) }}
      visible={AddUserModal}
      destroyOnClose
      title="创建用户"
    >
      <AddForm
        closeModal={() => {
          setAddUserModal(false)
          GetUserList()
        }}
      ></AddForm>
    </Modal>

    <Modal
      title="修改密码"
      onCancel={() => { setEidtUserPwdModal(false) }}
      visible={EidtUserPwdModal}
      footer={null}
      destroyOnClose
    >
      <EditPwdForm
        EditItem={EditItem}
        closeModal={() => {
          setEidtUserPwdModal(false)
        }}
      ></EditPwdForm>
    </Modal>

    <Card
      title="账号管理"
      extra={<Button onClick={() => { setAddUserModal(true) }}>添加账号</Button>}
    >
      <Table
        rowKey="id"
        dataSource={users}
        columns={columns}
      ></Table>
    </Card>
  </div >
};
export default Index;