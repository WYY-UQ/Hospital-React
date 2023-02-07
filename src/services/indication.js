import request from '@/utils/request';

export async function queryIndicationTpls(params) {
  return request('/indication/queryIndicationTpls', {
    params,
  });
}

export async function saveIndicationTpl(data) {
  return request('/indication/saveIndicationTpl', {
    method: 'POST',
    data,
  });
}

export async function getIndicationTpl(id) {
  return request(`/indication/getIndicationTpl?tplId=${id}`);
}

export async function deleteIndicationTpl(data) {
  return request('/indication/deleteIndicationTpl', {
    method: 'POST',
    data,
  });
}
