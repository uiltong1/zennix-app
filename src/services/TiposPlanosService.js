import { http } from './config'

export default {
  get: () => {
    return http.get('tipos_planos')
  },
  post: (params) => {
    return http.post('tipos_planos', params)
  },
  edit: (param) => {
    return http.get(`tipos_planos/${param}/edit`)
  },
  update: (id, params) => {
    return http.put(`tipos_planos/update/${id}`, params)
  },
  show: (id) => {
    return http.get(`tipos_planos/show/${id}`)
  },
  toggle: (param) => {
    return http.put(`tipos_planos/${param}/toggle`)
  }
}
