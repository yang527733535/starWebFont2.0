import { request } from 'umi';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}
export async function reqUserList() {
  return request('/api/auth/UserList');
}


export async function queryCurrent() {
  return request<API.CurrentUser>('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}


export async function reqEditUser(params, id) {
  return request(`/api/auth/User/${id}`, {
    method: 'PUT',
    data: params,
  });
}
export async function reqEditTag(params, id) {
  return request(`/api/auth/tag/${id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function reqSendEmail(params: any) {
  return request(`/api/auth/email`, {
    method: 'POST',
    data: params,
  });
}






export async function deleteTagById(id) {
  return request(`/api/auth/tag/${id}`, {
    method: 'DELETE',
  });
}



// 修改用户状态
export async function changeUserStatus(params, id) {
  return request(`/api/auth/Userstatus/${id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function reqEditUserInfo(params, id) {
  console.log(params, id)

  return request(`/api/auth/editUserDesc/${id}`, {
    method: 'PUT',
    data: params,
  });
}






export async function EditUserPwd(params, id) {
  return request(`/api/auth/Userpwd/${id}`, {
    method: 'PUT',
    data: params,
  });
}


export async function reqRegister(params: any) {
  return request(`/api/auth/register`, {
    method: 'POST',
    data: params,
  });
}




export async function register(params: any) {
  return request(`/api/auth/register`, {
    method: 'post',
    data: params,
  });
}

export async function addTag(params) {
  return request(`/api/auth/addtag`, {
    method: 'post',
    data: params,

  });
}






export async function reqTagList() {
  return request('/api/auth/tags');
}


export async function getNowUserinfo() {
  const token = localStorage.getItem("token");
  return request(`/api/auth/me`, {
    method: 'get',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      "Authorization": `Bearer ${token}`
    },
    // data: params,
  });
}

export async function GetUserVideoListApi(id) {
  const token = localStorage.getItem("token");
  return request(`/api/auth/getvideobyuserid/${id}`, {
    method: 'get',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      "Authorization": `Bearer ${token}`
    },
    // data: params,
  });
}

