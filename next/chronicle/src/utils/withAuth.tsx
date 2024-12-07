"use client";

import { useEffect, useState, ComponentType } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@redux/store";
import { getToken } from "@/services/tokenService";
import { authFailure } from "@redux/authSlice";

function withAuth<T extends Record<string, unknown>>(WrappedComponent: ComponentType<T>) {
    const AuthenticatedComponent = (props: T) => {
        const router = useRouter();
        const dispatch = useDispatch();
        const [loading, setLoading] = useState(true);

        // Get the Firebase user from Redux
        const user = useSelector((state: RootState) => state.auth.user);

        useEffect(() => {
            const validateUser = async () => {
                try {
                    if (!user) {
                        throw new Error("No user found in state");
                    }

                    // Attempt to fetch the token
                    const token = await getToken(true);
                    if (!token) {
                        throw new Error("Failed to fetch token");
                    }

                    // If everything is valid, stop loading
                    setLoading(false);
                } catch (error) {
                    console.error("Authentication failed:", error);
                    dispatch(authFailure("Authentication failed"));
                    router.push("/auth"); // Redirect to login
                }
            };

            validateUser();
        }, [user, dispatch, router]);

        if (loading) {
            return <div>Loading...</div>; // Show a loading indicator while validating
        }

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
}

export default withAuth;
