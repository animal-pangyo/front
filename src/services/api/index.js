export const URL = import.meta.env.MODE === 'development' ? '' : '';
// 'http://ec2-52-65-235-128.ap-southeast-2.compute.amazonaws.com:8080'

export const setAuthorization = (token, userId) => {
  localStorage.setItem('token', token);
  localStorage.getItem('userid', userId);
}

export const getAuthorization = () => {
  return localStorage.getItem('token') || '';
}

export const getUserId = () => {
  return localStorage.getItem('userid') || '';
}