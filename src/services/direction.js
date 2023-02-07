import request from '@/utils/request';

export async function queryDirections(params) {
  return request('/direction/queryDirections', {
    params,
  });
}

export async function saveDirection(data) {
  return request('/direction/saveDirection', {
    method: 'POST',
    data,
  });
}

export async function getDirection(id) {
  return request(`/direction/getDirection?directionId=${id}`);
}

export async function deleteDirection(data) {
  return request('/direction/deleteDirection', {
    method: 'POST',
    data,
  });
}

export async function getDirectionInfo(id) {
  return request(`/direction/getDirectionInfo?directionId=${id}`);
}

export async function getDirectionSpecsPacks(id) {
  return request(`/direction/getDirectionSpecsPacks?directionId=${id}`);
}

export async function saveDirectionSpecsPacks(data) {
  return request('/direction/saveDirectionSpecsPacks', {
    method: 'POST',
    data,
  });
}

export async function saveDirectionShapeProperty(data) {
  return request('/direction/saveDirectionShapeProperty', {
    method: 'POST',
    data,
  });
}

export async function saveDirectionKeep(data) {
  return request('/direction/saveDirectionKeep', {
    method: 'POST',
    data,
  });
}

export async function saveDirectionUsageAndDosage(data) {
  return request('/direction/saveDirectionUsageAndDosage', {
    method: 'POST',
    data,
  });
}

export async function getDirectionShapeProperty(id) {
  return request(`/direction/getDirectionShapeProperty?directionId=${id}`);
}

export async function getDirectionKeep(id) {
  return request(`/direction/getDirectionKeep?directionId=${id}`);
}

export async function getDirectionAdverseReaction(id) {
  return request(`/direction/getDirectionAdverseReaction?directionId=${id}`);
}

export async function saveDirectionAdverseReaction(data) {
  return request('/direction/saveDirectionAdverseReaction', {
    method: 'POST',
    data,
  });
}

export async function saveDirectionIndication(data) {
  return request('/direction/saveDirectionIndication', {
    method: 'POST',
    data,
  });
}
export async function delDirectionUsageAndDosage(data) {
  return request('/direction/delDirectionUsageAndDosage', {
    method: 'POST',
    data,
  });
}

export async function saveDirectionContraindication(data) {
  return request('/direction/saveDirectionContraindication', {
    method: 'POST',
    data,
  });
}

export async function getDirectionIndication(params) {
  return request('/direction/getDirectionIndication', {
    params,
  });
}

export async function getDirectionContraindication(params) {
  return request('/direction/getDirectionContraindication', {
    params,
  });
}

export async function getDirectionUsageAndDosage(params) {
  return request('/direction/getDirectionUsageAndDosage', {
    params,
  });
}
