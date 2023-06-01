const authHeader = () => {
  // return authorization header with jwt token

  let accessToken = JSON.parse(localStorage.getItem("state"));
  console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC", accessToken);

  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  } else {
    return {};
  }
};

export default authHeader;
