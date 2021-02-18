import { http } from './config'

export default {
  get: () => {
    return http.get('status_vendas')
  },
  post: (params) => {
    return http.post('status_vendas', params)
  },
  edit: (param) => {
    return http.get(`status_vendas/${param}/edit`)
  },
  update: (id, params) => {
    return http.put(`status_vendas/update/${id}`, params)
  },
  show: (id) => {
    return http.get(`status_vendas/show/${id}`)
  },
  toggle: (param) => {
    return http.put(`status_vendas/${param}/toggle`)
  }
}
