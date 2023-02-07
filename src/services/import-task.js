import request from '@/utils/request';

export async function queryTasks(params) {
  return request('/importTask/queryTasks', {
    params,
  });
}

export async function saveTask(data) {
  return request('/importTask/saveTask', {
    method: 'POST',
    data,
  });
}
