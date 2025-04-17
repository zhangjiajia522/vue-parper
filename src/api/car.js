import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getCar() {
  return request({
    url: '/vue-element-admin/cars',
    method: 'get'
  })
}

export function addCar(data) {
  return request({
    url: '/vue-element-admin/car',
    method: 'post',
    data
  })
}

export function updateCar(id, data) {
  return request({
    url: `/vue-element-admin/car/${id}`,
    method: 'put',
    data
  })
}

export function deleteCar(id) {
  return request({
    url: `/vue-element-admin/car/${id}`,
    method: 'delete'
  })
}
