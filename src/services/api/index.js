export const URL = process.env.mode === 'development' ? '' : '';

export const setAuthorization = (token) => {
  localStorage.setItem('token', token);
}

export const getAuthorization = () => {
  return localStorage.getItem('token') || '';
}