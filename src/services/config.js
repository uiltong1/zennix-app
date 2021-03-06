import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://zennix-api.herokuapp.com/api/'
})

http.interceptors.request.use(async (config) => {
  try {
    const token = await sessionStorage.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  } catch (error) {
    console.log(error)
  }
})
