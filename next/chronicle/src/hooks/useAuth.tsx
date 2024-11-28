// hooks/useAuth.ts
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase-config";
import { authRequest, authSuccess, authFailure } from "@redux/authSlice";
import { useToast } from "@/hooks/use-toast.ts";
import { ToastAction } from "@/components/ui/toast"

export function useAuth() {
    const dispatch = useDispatch();
    const { toast } = useToast()

    const handleAuth = useCallback(async (email: string, password: string) => {
        dispatch(authRequest());

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();

            console.log("User signed up:", user);
            console.log("ID Token:", idToken);

            dispatch(authSuccess({ user, idToken }));
            return { user, idToken };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.code === "auth/email-already-in-use") {
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
                    const idToken = await user.getIdToken();

                    console.log("User signed in:", user);
                    console.log("ID Token:", idToken);

                    dispatch(authSuccess({ user, idToken }));
                    return { user, idToken };
                } catch (signInError) {
                    console.error("Error during sign in:", signInError);
                    dispatch(authFailure("Incorrect password or other sign-in issue."));
                    toast({
                        variant: "destructive",
                        title: "Authentication Error",
                        description: "Unable to authorize.",
                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                    });
                    throw new Error("Incorrect password or other sign-in issue.");
                }
            } else {
                console.error("Error during sign up:", error);
                dispatch(authFailure("Unable to authorize."));
                toast({
                    variant: "destructive",
                    title: "Authentication Error",
                    description: "Unable to authorize.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
                throw new Error("Unable to authorize.");
            }
        }
    }, [dispatch, toast]);

    return { handleAuth };
}
