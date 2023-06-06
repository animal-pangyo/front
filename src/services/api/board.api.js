import axios from "axios"
import { URL } from "."

export const fetchBoardList = ({ page, name }) => (
  axios.get(`${URL}/${name}/${page}`)
)

export const deleteBoard = ({ id, name }) => (
  axios.delete(`${URL}/${name}/${id}`)
)

export const createBoard = ({ form, name }) => (
  axios.post(`${URL}/${name}`, form)
)

export const updateBoard = ({ form, name }) => (
  axios.put(`${URL}/${name}`, form)
)

export const fetchBoard = ({ id, name }) => (
  axios.get(`${URL}/${name}/detail/${id}`)
)
