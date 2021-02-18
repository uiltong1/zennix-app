import { http } from './config'

export default {
  get: () => {
    return http.get('users')
  },
  register: (params) => {
    return http.post('register', params)
  },
  edit: (param) => {
    return http.get(`users/${param}/edit`)
  },
  update: (id, params) => {
    return http.put(`users/update/${id}`, params)
  },
  show: (id) => {
    return http.get(`users/show/${id}`)
  },
  toggle: (param) => {
    return http.put(`users/${param}/toggle`)
  },
  search: (params) => {
    return http.get('users/search', { params })
  },
  exportar: () => {
    return http.get('users/export', { responseType: 'blob' })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'users.xlsx')
        document.body.appendChild(link)
        link.click()
      })
  }
}
