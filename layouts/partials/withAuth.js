import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");

        if (token === undefined || token === null) {
          router.push("/login");
        } else {
          setIsAuthenticated(true);
        }
      }
    }, []); // Empty dependency array ensures this effect runs only once

    if (!isAuthenticated) {
      return null; // Render nothing while redirecting
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
