import React, { useState, useEffect } from 'react';

import axios from 'axios'
import Qs from 'qs'
import { Upload, message, Form, Input, Button, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

const Index = () => {
  const [key, setkey] = useState("");
  const [key2, setkey2] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [loading, setloading] = useState(false);
  const [imagetoken, setimagetoken] = useState("");
  const [showFormModal, setshowFormModal] = useState(false);
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 17 },
  };
  const onFinish = values => {
    delete values.avatar
    const myparam = { ...values, key, key2 }
    const val = localStorage.getItem('token')
    axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${val}`
      },
      method: 'post',
      url: 'http://192.168.10.69:8080/api/auth/createVideo',
      // url: 'http://121.196.194.151:8080/api/auth/createVideo',
      data: Qs.stringify(myparam)
    }).then((res) => {
      console.log('res: ', res);
      if (res.status === 200) {
        message.success('投稿成功')
        setshowFormModal(false)
      }
    }).catch((res) => {
      console.log(res.response)
      message.error('请先登录')
    })

  };

  function beforeUpload(file) {

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;

  }


  function beforeUpload2(file) {
    console.log(file.type)
    const isJpgOrPng = file.type === 'video/mp4';
    if (!isJpgOrPng) {
      message.error('You can only upload audio/mp4 file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 100;
    if (!isLt2M) {
      message.error('Image must smaller than 100MB!');
    }
    return isJpgOrPng && isLt2M;

  }


  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  async function mycustomRequest({
    action,
    file,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials,
  }) {
    // 在这里暂停一秒


    const myfilename = {
      filename: file.name
    }
    console.log(myfilename)
    const val = localStorage.getItem('token')
    await axios({
      headers: {
        'Authorization': `Bearer ${val}`
      },
      method: 'post',
      //     target: 'http://192.168.10.69:8080/',
      url: 'http://192.168.10.69:8080/api/auth/uploadtoken',
      // url: 'http://121.196.194.151:8080/api/auth/uploadtoken',
      data: Qs.stringify(myfilename)
    }).then((res) => {
      console.log(res)
      // 在这里要把东西存起来
      const imagetoken = res.data.data.signedPutURL
      const imageUrl = res.data.data.signedGetURL
      const { key } = res.data.data
      // setimageUrl()
      const reader = new FileReader();
      console.log(file)
      reader.readAsArrayBuffer(file);
      let fileData = null;
      reader.onload = (e) => {
        // 在文件读取结束后执行的操作
        fileData = e.target.result;
        console.log(fileData)
        // 使用 axios 进行文件上传的请求
        console.log("123----imagetoken", imagetoken)
        axios.put(imagetoken, fileData, {
          withCredentials,
          headers,
          onUploadProgress: ({ total, loaded }) => {
            // 进行上传进度输出，更加直观
            onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
          },
        }).then(response => {
          console.log(response)
          onSuccess(response, file);
          setimageUrl(imageUrl)
          setkey(key)
        })
          .catch(onError);
      };
    })



  }

  async function mycustomRequest2({
    action,
    file,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials,
  }) {
    // 在这里暂停一秒


    const myfilename = {
      filename: file.name
    }
    console.log(myfilename)
    const val = localStorage.getItem('token')
    await axios({
      headers: {
        'Authorization': `Bearer ${val}`
      },
      method: 'post',
      url: 'http://192.168.10.69:8080/api/auth/uploadvideotoken',
      // url: 'http://121.196.194.151:8080/api/auth/uploadvideotoken',
      data: Qs.stringify(myfilename)
    }).then((res) => {
      console.log(res)
      // 在这里要把东西存起来
      const imagetoken = res.data.data.signedPutURL
      const imageUrl = res.data.data.signedGetURL
      const { key } = res.data.data
      // setimageUrl()
      const reader = new FileReader();
      console.log(file)
      reader.readAsArrayBuffer(file);
      let fileData = null;
      reader.onload = (e) => {
        // 在文件读取结束后执行的操作
        fileData = e.target.result;
        console.log(fileData)
        // 使用 axios 进行文件上传的请求
        console.log("123----VIDEOtoken", imagetoken)
        axios.put(imagetoken, fileData, {
          withCredentials,
          headers,
          onUploadProgress: ({ total, loaded }) => {
            // 进行上传进度输出，更加直观
            onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
          },
        }).then(response => {
          console.log(response)
          onSuccess(response, file);
          // setimageUrl(imageUrl)
          setkey2(key)
        })
          .catch(onError);
      };
    })



  }
  return <div>

    <Button

      onClick={() => { setshowFormModal(true) }}
      type="primary">投稿</Button>

    <Modal
      footer={null}
      onCancel={() => { setshowFormModal(false) }}
      visible={showFormModal}
    >
      <Form {...layout}
        name="nest-messages"
        onFinish={onFinish}
      // validateMessages={validateMessages}
      >
        <Form.Item name='title' label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='info' label="info" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='url' label="Video" rules={[{ required: true }]}>
          <Upload
            headers={{
              'Content-Type': 'audio/mp4',
            }}
            action={imagetoken}
            name="avatar"
            // listType="picture-card"
            // className="avatar-uploader"
            // showUploadList={false}
            showUploadList={true}
            beforeUpload={beforeUpload2}
            customRequest={mycustomRequest2} // 自定义上传的方法
          >
            <Button>
              <UploadOutlined /> Click to Upload
       </Button>
          </Upload>
        </Form.Item>
        <Form.Item name='avatar' label="avatar"
          rules={[{ required: false }]}>
          <Upload
            headers={{
              'Content-Type': 'image/png',
            }}
            action={imagetoken}
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={mycustomRequest} // 自定义上传的方法
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    </Modal>




  </div>
};
export default Index;