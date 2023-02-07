import request from '@/utils/request';

export async function queryProducts(params) {
  return request('/product/queryProducts', {
    params,
  });
}

export async function saveProduct(data) {
  return request('/product/saveProduct', {
    method: 'POST',
    data,
  });
}

export async function getProduct(id) {
  return request(`/product/getProduct?productId=${id}`);
}

export async function disableProduct(data) {
  return request('/product/disableProduct', {
    method: 'POST',
    data,
  });
}

export async function queryCompanyProducts(params) {
  return request('/product/queryCompanyProducts', {
    params,
  });
}
