import instance from "./api";
import TokenService from "../redux/Services/tokenService";
import { userActions } from "./Actions/userAction";

const setup = (store, router) => {
  instance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      // console.log(
      //   "Access Tokennnnnnnnnnnnnnnnnnnn",
      //   TokenService.getLocalAccessToken()
      // );
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const { dispatch } = store;

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err?.config;
      if (originalConfig?.url !== "/" && err?.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          //   try {
          const rs = await instance.post("users/refresh", {
            refresh_token: TokenService.getLocalRefreshToken(),
          });
          const { access_token, refresh_token } = rs?.data;
          if (rs?.data?.detail === "Token has expired") {
            console.log("DETAILLLLLLLLLLLLLLLLLLLLLLLL", rs?.data?.detail);
            dispatch(userActions.logout());
            router.push("/login");
          } else {
            //   dispatch(userActions.refreshToken(refresh_token));
            TokenService?.updateLocalAccessToken(access_token);
            return instance(originalConfig);
          }
          //   } catch (err) {
          //     console.log(err?.toString());
          //     router.push("/login");
          //     return Promise.reject(err);
          //   }
        }
      }
      return Promise.reject(err);
    }
  );
};
export default setup;
