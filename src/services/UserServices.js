import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.line.me/oauth2/v2.1',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default {
  getToken(code) {
    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', 'https://selikastraying.github.io')
    params.append('client_id', '1655687599')
    params.append('client_secret', '1c0ef1f39fd1f7050ed4e1f265876f47')

    return apiClient
      .post('/token', params)
      .then(res => {
        return res.data
      })
      .catch(error => {
        console.error(error)
      })
  },
  getProfile(token) {
    const params = new URLSearchParams()
    params.append('id_token', token)
    params.append('client_id', '1655687599')

    return apiClient
      .post('/verify', params)
      .then(res => {
        return res.data
      })
      .catch(error => {
        console.error(error)
      })
  }
}
