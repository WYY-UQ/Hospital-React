import request from '@/utils/request';

export async function queryCommodities(params) {
  return request("/commodity/queryCommodities",{
    params
  });
}

export async function saveCommodity(data) {
  return request('/commodity/saveCommodity', {
    method: 'POST',
    data,
  });
}

export async function getCommodity(id) {
  return request(`/commodity/getCommodity?commodityId=${id}`);
}

export async function disableCommodity(data) {
  return request('/commodity/disableCommodity', {
    method: 'POST',
    data,
  });
}
