import { http } from './config'

export default {
  get: () => {
    return http.get('planos')
  },
  create: () => {
    return http.get('planos/create')
  },
  post: (params) => {
    return http.post('planos', params)
  },
  edit: (param) => {
    return http.get(`planos/${param}/edit`)
  },
  update: (id, params) => {
    return http.put(`planos/update/${id}`, params)
  },
  show: (id) => {
    return http.get(`planos/show/${id}`)
  },
  toggle: (param) => {
    return http.put(`planos/${param}/toggle`)
  },
  postPreco: (params) => {
    return http.post('plano_precos', params)
  }
}
