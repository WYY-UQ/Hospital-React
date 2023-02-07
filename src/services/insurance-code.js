import request from '@/utils/request';

export async function queryMedicalInsurances(params) {
  return request('/medicalInsurance/queryMedicalInsurances', {
    params,
  });
}

export async function saveCommodityMedicalInsurances(data) {
  return request('/medicalInsurance/saveCommodityMedicalInsurances', {
    method: 'POST',
    data,
  });
}

export async function getCommodityMedicalInsurances(id) {
  return request(`/medicalInsurance/getCommodityMedicalInsurances?commodityId=${id}`);
}

export async function deleteCommodityMedicalInsurances(data) {
  return request('/medicalInsurance/deleteCommodityMedicalInsurances', {
    method: 'POST',
    data,
  });
}
