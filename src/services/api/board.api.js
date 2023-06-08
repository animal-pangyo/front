import axios from "axios"
import { URL } from "."

const getContext = (name) => {
  switch(name) {
    case 'free':
    case 'notice':
    case 'faq':
    case 'inquiry':
      return 'posts';
    default:
      return 'stores';
  }
};

export const fetchBoardList = ({ page, name }) => (
  axios.get(`${URL}/${getContext(name)}/${name}?page=${page}`)
)

export const deleteBoard = ({ id, name }) => (
  axios.delete(`${URL}/${getContext(name)}/${id}`)
)

export const createBoard = ({ form, name }) => (
  axios.post(`${URL}/${getContext(name)}`, {
    title: form.subject,
    content: form.conent,
    user_id: form.userId, 
    board_type: name
  })
)

export const updateBoard = ({ form, name }) => (
  axios.patch(`${URL}/${getContext(name)}/${form.id}`, {
    title: form.subject,
    content: form.conent,
  })
)

export const fetchBoard = ({ id, name }) => (
  axios.get(`${URL}/${getContext(name)}/${id}`)
)

export const transformBoard = (server) => {
  return {
    subject: server.title,
    content: server.content,
    userId: server.user_id
  }
};