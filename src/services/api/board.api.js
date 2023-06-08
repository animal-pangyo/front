import axios from "axios"
import { URL } from "."

export const fetchBoardList = ({ page, name }) => (
  axios.get(`${URL}/posts/${name}?page=${page}`)
)

export const deleteBoard = ({ id }) => (
  axios.delete(`${URL}/posts/${id}`)
)

export const createBoard = ({ form, name }) => (
  axios.post(`${URL}/posts`, {
    title: form.subject,
    content: form.conent,
    user_id: form.userId, 
    board_type: name
  })
)

export const updateBoard = ({ form }) => (
  axios.patch(`${URL}/posts/${form.id}`, {
    title: form.subject,
    content: form.conent,
  })
)

export const fetchBoard = ({ id }) => (
  axios.get(`${URL}/posts/${id}`)
)

export const transformBoard = (server) => {
  return {
    subject: server.title,
    content: server.content,
    userId: server.user_id
  }
};