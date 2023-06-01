import axios from "axios";

export const getUser = () => {

};

export const login = () => (
  axios.post(`${URL}/api/login`)
)

export const join = () => (
  axios.post(`${URL}/api/join`)
);

export const logout = () => (
  axios.post(`${URL}/api/logout`)
);