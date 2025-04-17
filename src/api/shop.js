import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getShop() {
  return request({
    url: '/vue-element-admin/shops',
    method: 'get'
  })
}

export function addShop(data) {
  return request({
    url: '/vue-element-admin/shop',
    method: 'post',
    data
  })
}

export function updateShop(id, data) {
  return request({
    url: `/vue-element-admin/shop/${id}`,
    method: 'put',
    data
  })
}

export function deleteShop(id) {
  return request({
    url: `/vue-element-admin/shop/${id}`,
    method: 'delete'
  })
}
