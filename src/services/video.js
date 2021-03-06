

import { request } from 'umi';


export async function login (params) {
  return request('/api/auth/login', {
    method: 'POST',
    data: params,
  });
}
const val = localStorage.getItem('token')

export async function videoList () {
  return request('/api/auth/videolist', {
    // params: {
    //   token: "xxx" // 所有请求默认带上 token 参数
    // },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${val}`
    }
  });
}

export async function reqVideoById (id) {
  return request(`/api/auth/getvideobyid/${id}`);
}

export async function reqUserDataById (id) {
  return request(`/api/auth/User/${id}`);
}



export async function reqVideoCommentById (id, pageData) {
  return request(`/api/auth/comment/${id}`, {
    method: 'get',
    params: pageData,
  });

}






export async function getTagsApi () {
  return request(`/api/auth/tags`);
}




export async function reqUploadImg (param) {
  return request('/api/auth/uploadtoken', {
    method: 'POST',
    data: param,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${val}`
    }
  });
}
