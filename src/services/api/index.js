import axios from "axios";

export const URL = import.meta.env.MODE === "development" ? "" : "";
// 'http://ec2-52-65-235-128.ap-southeast-2.compute.amazonaws.com:8080'

const newAixos = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthorization = (token, userId) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userid", userId);
  newAixos.defaults.headers.common["authorization"] = `bearer ${token}`;
};

export const getAuthorization = () => {
  return localStorage.getItem("token") || "";
};

export const getUserId = () => {
  return localStorage.getItem("userid") || "";
};

export default newAixos;
