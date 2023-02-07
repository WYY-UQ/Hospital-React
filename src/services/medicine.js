import request from '@/utils/request';

export async function saveDrug(data) {
  return request('/drug/saveDrug', {
    method: 'POST',
    data,
  });
}

export async function queryDrugs(params) {
  return request('/drug/queryDrugs', {
    params,
  });
}

export async function getDrug(id) {
  return request(`/drug/getDrug?drugId=${id}`);
}


export async function disableDrug(data) {
  return request('/drug/disableDrug', {
    method: 'POST',
    data,
  });
}
