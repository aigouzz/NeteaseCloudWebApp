import axios from './request'

export function getRequest (url) {
  return axios.get(url)
}

export function postRequest (url, data) {
  return axios.post(url, data)
}
