import request from './request'
import decode from 'jwt-decode'

export async function signIn (value) {
  await request({ email: value.email, password: value.password })
    .then((data) => {
      sessionStorage.setItem('nome', data.data.nome)
      sessionStorage.setItem('id', data.data.id)
      sessionStorage.setItem('token', data.data.token)
      sessionStorage.setItem('email', data.data.email)
      return data
    })
    .catch((error) => {
      return error
    })
}

export function signOut () {
  const result = sessionStorage.clear()
  return result
}

export function isSignedIn () {
  const token = sessionStorage.getItem('token')
  if (!token) {
    return false
  }
  try {
    const { exp: expiration } = decode(token)
    const isExpired = !!expiration && Date.now() > expiration * 1000

    if (isExpired) {
      return false
    }
    return true
  } catch (_) {
    return false
  }
}
