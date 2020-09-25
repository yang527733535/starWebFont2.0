import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd'
import axios from 'axios'
import Qs from 'qs'
const uploadAva = ({ NowUserinfo, userinfo }) => {
  const [] = useState(false);
  const [imagetoken, setimagetoken] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [loading, setloading] = useState(false);

  const [key, setkey] = useState("");
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
      filename: file.name,
      userId: userinfo.id,
    }
    console.log(myfilename)
    const val = localStorage.getItem('token')
    await axios({
      headers: {
        'Authorization': `Bearer ${val}`
      },
      method: 'post',
      //     target: 'http://192.168.10.69:8080/',
      // url: 'http://localhost:8080/api/auth/uploadtoken',
      // url: 'http://121.196.194.151:8080/api/auth/uploaduseravatartoken',
      url: 'http://121.196.194.151:8080/api/auth/uploaduseravatartoken',
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
          message.success("修改头像成功")
          NowUserinfo()

        })
          .catch(onError);
      };
    })



  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return <div>


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
  </div>
};
export default uploadAva;
