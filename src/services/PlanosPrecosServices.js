import { http } from './config'

export default {
  get: () => {
    return http.get('planos')
  },
  post: (params) => {
    return http.post('plano_precos', params)
  },
  edit: (param) => {
    return http.get(`plano_precos/${param}/edit`)
  }
}
