import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    // const [accessTokenJSON, setAccessTokenJSON] = useState();
    const router = useRouter();

    // useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      console.log(token);

      if (token === undefined || token === null) {
        router.push("/login");
        return null; // Render nothing while redirecting
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // });

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
