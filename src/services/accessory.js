import request from '@/utils/request';

export async function queryAccessorys(params) {
  return request('/accessory/queryAccessorys', {
    params,
  });
}

export async function saveAccessory(data) {
  return request('/accessory/saveAccessory', {
    method: 'POST',
    data,
  });
}

export async function getAccessory(id) {
  return request(`/accessory/getAccessory?accessoryId=${id}`);
}

export async function deleteAccessory(data) {
  return request('/accessory/deleteAccessory', {
    method: 'POST',
    data,
  });
}
