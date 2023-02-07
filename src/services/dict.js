import request from '@/utils/request';

export async function queryDicts(params) {
  return request('/dict/queryDicts', {
    params,
  });
}

export async function saveDict(data) {
  return request('/dict/saveDict', {
    method: 'POST',
    data,
  });
}

export async function getDict(id) {
  return request(`/dict/getDict?dictId=${id}`);
}

export async function deleteDict(data) {
  return request('/dict/deleteDict', {
    method: 'POST',
    data,
  });
}
