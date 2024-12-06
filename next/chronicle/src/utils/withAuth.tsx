"use client";

import { useEffect, useState, ComponentType } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@redux/store";
import { useToken } from "@/hooks/useToken";

function withAuth<T extends Record<string, unknown>>(WrappedComponent: ComponentType<T>) {
  const AuthenticatedComponent = (props: T) => {
    const router = useRouter();
    const { token, getIdToken, isTokenValid } = useToken();
    const [loading, setLoading] = useState(true);

    // Use the stored token from Redux state
    const storedToken = useSelector((state: RootState) => state.auth.idToken);

    useEffect(() => {
      const validateToken = async () => {
        try {
          if (!storedToken && !token) {
            throw new Error("No token found");
          }

          if (!token) {
            await getIdToken(true); // Force refresh to ensure validity
          }

          setLoading(false);
        } catch (error) {
          console.error("Token validation failed:", error);
          setLoading(false);
          router.push("/auth"); // Redirect to login if token is invalid
        }
      };

        validateToken();
    }, [token, storedToken, getIdToken, router]);

    if (loading) {
      return <div>Loading...</div>; // Show a loading indicator until validation completes
    }

    if (!isTokenValid) {
      return <div>Unauthorized</div>; // Optional: handle unauthorized access
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
}

export default withAuth;
