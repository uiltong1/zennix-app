import { http } from '../services/config'

function getHeaders () {
  const token = sessionStorage.getItem('token')
  return {
    'Content-type': 'application/json',
    ...token && {
      Authotorization: `Bearer${token}`
    }
  }
}

async function request (body) {
  const response = http.post('auth/login', body)
  return await response
}

export { request as default, request, getHeaders }
