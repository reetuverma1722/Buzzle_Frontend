import { apiPost } from './api';

export const loginUser = async (email, password) => {
  return await apiPost('/auth/login', { email, password });
};

export const registerUser = async (email, password) => {
  return await apiPost('/auth/register', { email, password });
};
