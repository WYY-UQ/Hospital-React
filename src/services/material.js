import request from '@/utils/request';

export async function saveSubstance(data) {
  return request('/substance/saveSubstance', {
    method: 'POST',
    data,
  });
}

export async function querySubstances(params) {
  return request('/substance/querySubstances', {
    params,
  });
}

export async function querySubstance(id) {
  return request(`/substance/getSubstance?substanceId=${id}`);
}


export async function disableSubstance(data) {
  return request('/substance/disableSubstance', {
    method: 'POST',
    data,
  });
}
