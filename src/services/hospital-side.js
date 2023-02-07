import request from '@/utils/request';

export async function getHospitalDrug(params) {
  return request('/hospitalSide/getHospitalDrug', {
    params,
  });
}

export async function queryHospitalDrugs(params) {
  return request('/hospitalSide/queryHospitalDrugs', {
    params,
  });
}

export async function queryHospitalDrugsToAdd(params) {
  return request('/hospitalSide/queryHospitalDrugsToAdd', {
    params,
  });
}

export async function getHospitalDrugToAdd(params) {
  return request('/hospitalSide/getHospitalDrugToAdd', {
    params,
  });
}

export async function queryHospitalDrugChanges(params) {
  return request('/hospitalSide/queryHospitalDrugChanges', {
    params,
  });
}

export async function getHospitalDrugChange(params) {
  return request('/hospitalSide/getHospitalDrugChange', {
    params,
  });
}

export async function saveHospitalDrug(data) {
  return request('/hospitalSide/saveHospitalDrug', {
    method: 'POST',
    data,
  });
}

export async function addHospitalDrug(data) {
  return request('/hospitalSide/addHospitalDrug', {
    method: 'POST',
    data,
  });
}

export async function reviewHospitalDrugChange(data) {
  return request('/hospitalSide/reviewHospitalDrugChange', {
    method: 'POST',
    data,
  });
}

export async function apiSearch(params) {
  return request('/hospitalSide/filterSearch', {
    method: 'GET',
    params,
  });
}

export async function apiCardSearch(params) {
  return request('/hospitalSide/cardSearch', {
    method: 'GET',
    params,
  });
}

export async function apiDrugs(params) {
  return request('/hospitalSide/listSearch', {
    method: 'GET',
    params,
  });
}

export async function apiCategory(params) {
  return request('/hospitalSide/querySearchCategories', {
    method: 'GET',
    params,
  });
}

export async function apiDrugDetail(params) {
  return request('/hospitalSide/getSearchDetail', {
    method: 'GET',
    params,
  });
}

export async function apiCollect(commodityId) {
  return request('/hospitalSide/addToHospital', {
    method: 'POST',
    data: { commodityId },
  });
}
