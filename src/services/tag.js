import request from '@/utils/request';

export async function queryTags(params) {
  return request('/tag/queryTags', {
    params,
  });
}

export async function saveTag(data) {
  return request('/tag/saveTag', {
    method: 'POST',
    data,
  });
}

export async function getTag(id) {
  return request(`/tag/getTag?tagId=${id}`);
}

export async function disableTag(data) {
  return request('/tag/disableTag', {
    method: 'POST',
    data,
  });
}
