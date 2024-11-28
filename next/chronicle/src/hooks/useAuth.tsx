// hooks/useAuth.ts
import { useCallback } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase-config";

export function useAuth() {
    const handleAuth = useCallback(async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();

            console.log("User signed up:", user);
            console.log("ID Token:", idToken);
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
                    return { user, idToken };
                } catch (signInError) {
                    console.error("Error during sign in:", signInError);
                    throw new Error("Incorrect password or other sign-in issue.");
                }
            } else {
                console.error("Error during sign up:", error);
                throw new Error("Unable to authorize.");
            }
        }
    }, []);

    return { handleAuth };
}
