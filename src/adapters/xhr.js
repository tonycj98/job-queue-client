import Axios from "axios"

function returnAxiosInstance() {
  return Axios.create({
    baseURL: "http://localhost:3004",
    timeout: 3000,
    headers: {
      "api-key": "z4DNiu1ILV0VJ9fccvzv+E5jJlkoSER9LcCw6H38mpA="
    }
  })
}

export function getAPI(urlPath) {
  const axios = returnAxiosInstance()
  return axios.get(urlPath)
}

export function postAPI(urlPath, requestData) {
  const axios = returnAxiosInstance()
  return axios.post(urlPath, requestData)
}
