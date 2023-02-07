import request from '@/utils/request';

export async function queryIncompatibilities(params) {
  return request('/incompatibility/queryIncompatibilities', {
    params,
  });
}

export async function saveIncompatibility(data) {
  return request('/incompatibility/saveIncompatibility', {
    method: 'POST',
    data,
  });
}

export async function getIncompatibility(id) {
  return request(`/incompatibility/getIncompatibility?incompatibilityId=${id}`);
}

export async function deleteIncompatibility(data) {
  return request('/incompatibility/deleteIncompatibility', {
    method: 'POST',
    data,
  });
}
