import request from '@/utils/request';

export async function queryHospitals(params) {
  return request('/hospital/queryHospitals', {
    params,
  });
}

export async function saveHospital(data) {
  return request('/hospital/saveHospital', {
    method: 'POST',
    data,
  });
}

export async function getHospital(id) {
  return request(`/hospital/getHospital?hospitalId=${id}`);
}

export async function deleteHospital(data) {
  return request('/hospital/deleteHospital', {
    method: 'POST',
    data,
  });
}
