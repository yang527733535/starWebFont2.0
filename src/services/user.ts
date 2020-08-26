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

export async function EditUserPwd(params, id) {
  return request(`/api/auth/Userpwd/${id}`, {
    method: 'PUT',
    data: params,
  });
}


export async function register(params) {
  return request(`/api/auth/register`, {
    method: 'post',
    data: params,
  });
}



