import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getOrder() {
  return request({
    url: '/vue-element-admin/orders',
    method: 'get'
  })
}

export function addOrder(data) {
  return request({
    url: '/vue-element-admin/order',
    method: 'post',
    data
  })
}

export function updateOrder(id, data) {
  return request({
    url: `/vue-element-admin-admin/order/${id}`,
    method: 'put',
    data
  })
}

export function deleteOrder(id) {
  return request({
    url: `/vue-element-admin/order/${id}`,
    method: 'delete'
  })
}

export function OrderCreate(postData) {
  return request({
    url: '/api/vue-element-admin/create',
    method: 'post',
    data: postData
  })
}
