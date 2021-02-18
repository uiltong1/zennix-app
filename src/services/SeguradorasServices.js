import { http } from './config'

export default {
  get: () => {
    return http.get('seguradoras')
  },
  register: (params) => {
    return http.post('seguradoras', params)
  },
  edit: (param) => {
    return http.get(`seguradoras/${param}/edit`)
  },
  update: (id, params) => {
    return http.put(`seguradoras/update/${id}`, params)
  },
  show: (id) => {
    return http.get(`seguradoras/show/${id}`)
  },
  toggle: (param) => {
    return http.put(`seguradoras/${param}/toggle`)
  }
}
