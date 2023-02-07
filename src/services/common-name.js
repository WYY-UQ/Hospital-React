import request from '@/utils/request';

export async function queryCommonNames(params) {
  return request('/commonName/queryCommonNames', {
    params,
  });
}

export async function queryCommonNameSpecGroups(params) {
  return request('/commonName/queryCommonNameSpecGroups', {
    params,
  });
}

export async function saveCommonName(data) {
  return request('/commonName/saveCommonName', {
    method: 'POST',
    data,
  });
}

export async function getCommonName(id) {
  return request(`/commonName/getCommonName?commonNameId=${id}`);
}

export async function disableCommonName(data) {
  return request('/commonName/disableCommonName', {
    method: 'POST',
    data,
  });
}
