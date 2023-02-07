import request from '@/utils/request';

export async function queryDissolutions(params) {
  return request('/dissolution/queryDissolutions', {
    params,
  });
}

export async function saveDissolution(data) {
  return request('/dissolution/saveDissolution', {
    method: 'POST',
    data,
  });
}

export async function getDissolution(id) {
  return request(`/dissolution/getDissolution?dissolutionId=${id}`);
}

export async function deleteDissolution(data) {
  return request('/dissolution/deleteDissolution', {
    method: 'POST',
    data,
  });
}
