const getLocalRefreshToken = () => {
  const refresh_token = JSON.parse(localStorage.getItem("refreshToken"));
  return refresh_token;
};
const getLocalAccessToken = () => {
  const access_token = JSON.parse(localStorage.getItem("accessToken"));
  return access_token;
};
const updateLocalAccessToken = (token) => {
  let user = JSON.parse(localStorage.getItem("accessToken"));
  user = token;
  localStorage.setItem("accessToken", JSON.stringify(user));
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
};
export default TokenService;
