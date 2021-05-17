import axios from 'axios'
const baseUrl = '/api/posts/'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async (id, obj) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(baseUrl + id, obj, config)
  return response.data
}
const deletePost = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(baseUrl + `/${id}`, config)
}
export default { getAll, create, setToken, deletePost, put }