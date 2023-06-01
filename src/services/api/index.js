export const URL = import.meta.env.MODE === 'development' ? '' : '';

export const setAuthorization = (token) => {
  localStorage.setItem('token', token);
}

export const getAuthorization = () => {
  return localStorage.getItem('token') || '';
}