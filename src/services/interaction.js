import request from '@/utils/request';

export async function queryInteractions(params) {
  return request('/interaction/queryInteractions', {
    params,
  });
}

export async function saveInteraction(data) {
  return request('/interaction/saveInteraction', {
    method: 'POST',
    data,
  });
}

export async function getInteraction(id) {
  return request(`/interaction/getInteraction?interactionId=${id}`);
}

export async function deleteInteraction(data) {
  return request('/interaction/deleteInteraction', {
    method: 'POST',
    data,
  });
}
