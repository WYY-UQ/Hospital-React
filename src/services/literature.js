import request from '@/utils/request';

export async function queryLiteratures(params) {
  return request('/literature/queryLiteratures', {
    params,
  });
}

export async function queryLiteratureChapters(params) {
  return request('/literature/queryLiteratureChapters', {
    params,
  });
}

export async function queryLiteratureStructs(params) {
  return request('/literature/queryLiteratureStructs', {
    params,
  });
}

export async function saveLiterature(data) {
  return request('/literature/saveLiterature', {
    method: 'POST',
    data,
  });
}

export async function saveLiteratureChapter(data) {
  return request('/literature/saveLiteratureChapter', {
    method: 'POST',
    data,
  });
}

export async function getLiterature(id) {
  return request(`/literature/getLiterature?literatureId=${id}`);
}

export async function deleteLiterature(data) {
  return request('/literature/deleteLiterature', {
    method: 'POST',
    data,
  });
}

export async function reviewLiteratureStruct(data) {
  return request('/literature/reviewLiteratureStruct', {
    method: 'POST',
    data,
  });
}

export async function deleteLiteratureChapter(data) {
  return request('/literature/deleteLiteratureChapter', {
    method: 'POST',
    data,
  });
}
export async function saveLiteratureScan(data) {
  return request('/literature/saveLiteratureScan', {
    method: 'POST',
    data,
  });
}

export async function getLiteratureChapter(id) {
  return request(`/literature/getLiteratureChapter?chapterId=${id}`);
}

export async function queryScansToBind(id) {
  return request(`/literature/queryScansToBind?literatureId=${id}`);
}

export async function getLiteratureScan(id) {
  return request(`/literature/getLiteratureScan?literatureId=${id}`);
}
