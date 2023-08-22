import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    console.log(isAuthenticated);
    // Redirection logic
    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login page if not authenticated
      return null; // Render nothing while redirecting
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
