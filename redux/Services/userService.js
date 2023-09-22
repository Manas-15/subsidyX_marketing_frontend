import api from "../api";

export const userService = {
  signup,
  generateOTP,
  validateOtp,
  login,
};

async function signup(userData) {
  return await api.post(`users/create`, userData);
}

async function generateOTP(credential) {
  return await api.post(`users/otp-auth`, credential);
}

async function validateOtp(data) {
  return await api.post(`users/otp-login`, data);
}

async function login(userData) {
  return await api.post(`users/login`, userData);
}
