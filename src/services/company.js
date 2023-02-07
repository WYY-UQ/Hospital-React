import request from '@/utils/request';

export async function queryCompanies(params) {
  return request('/company/queryCompanies', {
    params,
  });
}

export async function saveCompany(data) {
  return request('/company/saveCompany', {
    method: 'POST',
    data,
  });
}

export async function getCompany(id) {
  return request(`/company/getCompany?companyId=${id}`);
}

export async function deleteCompany(data) {
  return request('/company/deleteCompany', {
    method: 'POST',
    data,
  });
}
