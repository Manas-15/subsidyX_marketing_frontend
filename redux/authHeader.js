export function authHeader() {
  let accessToken = JSON.parse(localStorage.getItem("accessToken"));

  if (accessToken) {
    return { Authorization: "Bearer " + accessToken };
  } else {
    return {};
  }
}
