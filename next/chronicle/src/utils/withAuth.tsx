import { ComponentType, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@redux/store";

function withAuth<T extends Record<string, unknown>>(WrappedComponent: ComponentType<T>) {
    const AuthenticatedComponent = (props: T) => {
        const router = useRouter();
        const user = useSelector((state: RootState) => state.auth.user);

        useEffect(() => {
            if (!user) {
                router.push("/auth"); // Redirect to login if not authenticated
            }
        }, [user, router]);

        if (!user) {
            return <div>Loading...</div>; // Optionally show a loading indicator while checking
        }

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
}

export default withAuth;
