import axios from "axios"
import { URL } from "."

export const fetchBoardList = ({ page }) => (
  axios.get(`${URL}/board/${page}`)
)

export const deleteBoard = (id) => (
  axios.delete(`${URL}/board/${id}`)
)

export const createBoard = (form) => (
  axios.post(`${URL}/board`, form)
)

export const updateBoard = (form) => (
  axios.put(`${URL}/board`, form)
)

export const fetchBoard = (id) => (
  axios.get(`${URL}/board/detail/${id}`)
)
