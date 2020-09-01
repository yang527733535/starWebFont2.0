import React, { useState, useEffect } from 'react';
import { Card, Table, Modal, Button, Popconfirm, message } from 'antd'
import styles from './index.less'
import { reqTagList, deleteTagById } from "@/services/user"
import { formatDate } from '@/utils/utils'
import EditForm from './EditForm.jsx'
import EditPwdForm from './EditPwdForm.jsx'
import AddForm from './AddForm.jsx'
const Index = () => {
  const [Tags, setTags] = useState([]);
  const [EditUserModal, setEditUserModal] = useState(false);
  const [AddUserModal, setAddUserModal] = useState(false);
  const [EidtUserPwdModal, setEidtUserPwdModal] = useState(false);
  const [tableloading, settableloading] = useState(false);
  const [EditItem, setEditItem] = useState({});

  let columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: "标签名",
      dataIndex: 'name',
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
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={confirmDelete}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a
              onClick={() => {
                setEditItem(item)

              }}
              style={{ marginLeft: 10 }}>删除标签</a>
          </Popconfirm>

        </div>)
    },

  ]

  const changeStatus = (item) => {
    console.log('item: ', item);

  }

  const confirmDelete = async () => {
    console.log('EditItem', EditItem)
    const data = await deleteTagById(EditItem.id)
    console.log('data: ', data);
    if (data.msg === "删除成功") {
      GetTagList()
    }
  }

  async function GetTagList() {
    settableloading(true)
    const data = await reqTagList()
    console.log(data)
    if (data.status === 1) {
      console.log(data.data)
      setTags(data.data)
      settableloading(false)
    }
  }

  useEffect(() => {

    GetTagList()
  }, [])


  return <div className={styles.bigWrap}>
    <Modal
      footer={null}
      onCancel={() => { setEditUserModal(false) }}
      visible={EditUserModal}
      destroyOnClose
    >
      <EditForm
        closeModal={() => {
          setEditUserModal(false)
          GetTagList()
        }}
        EditItem={EditItem}></EditForm>
    </Modal>

    <Modal
      footer={null}
      onCancel={() => { setAddUserModal(false) }}
      visible={AddUserModal}
      destroyOnClose
    >
      <AddForm
        closeModal={() => {
          setAddUserModal(false)
          GetTagList()
        }}
      ></AddForm>
    </Modal>

    <Modal
      title="修改密码"
      onCancel={() => { setEidtUserPwdModal(false) }}
      visible={EidtUserPwdModal}
      footer={null}
    >
      <EditPwdForm
        EditItem={EditItem}
        closeModal={() => {
          setEidtUserPwdModal(false)
        }}
      ></EditPwdForm>
    </Modal>

    <Card
      title="标签管理"
      extra={<Button onClick={() => { setAddUserModal(true) }}>添加标签</Button>}
    >
      <Table
        loading={tableloading}
        rowKey="id"
        dataSource={Tags}
        columns={columns}
      ></Table>
    </Card>
  </div >
};
export default Index;