import api from "../api";

export const userService = {
  signup,
  login,
};

async function signup(userData) {
  return await api.post(`users/create`, userData);
}

async function login(userData) {
  return await api.post(`users/login`, userData);
}
