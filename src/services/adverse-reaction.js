import request from '@/utils/request';

export async function queryAdverseReactionTpls(params) {
  return request('/adverseReaction/queryAdverseReactionTpls', {
    params,
  });
}

export async function saveAdverseReaction(data) {
  return request('/adverseReaction/saveAdverseReactionTpl', {
    method: 'POST',
    data,
  });
}

export async function getAdverseReactionTpl(id) {
  return request(`/adverseReaction/getAdverseReactionTpl?tplId=${id}`);
}

export async function deleteAdverseReactionTpl(data) {
  return request('/adverseReaction/deleteAdverseReactionTpl', {
    method: 'POST',
    data,
  });
}
