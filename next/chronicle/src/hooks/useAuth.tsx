"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/services/firebase-config";
import { authRequest, authSuccess, authFailure } from "@redux/authSlice";
import { useToast } from "@/hooks/use-toast.ts";
import { ToastAction } from "@/components/ui/toast"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FirebaseError } from "firebase/app";

export function useAuth() {
    const dispatch = useDispatch();
    const { toast } = useToast();

    const handleUserCredentials = async (userCredential: any, role: string) => {
        const user = userCredential.user;
        const idToken = await user.getIdToken();

        await setDoc(doc(db, "users", user.uid), {
            role: role,
        });

        dispatch(authSuccess({ user }));

        console.log("User signed in:", user);
        return { user, idToken };
    };

    const handleAuth = useCallback(async (email: string, password: string, role: string) => {
        dispatch(authRequest());

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return await handleUserCredentials(userCredential, role);
        } catch (error: FirebaseError | any) {
            if (error.code === "auth/email-already-in-use") {
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    return await handleUserCredentials(userCredential, role);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, toast]);

    return { handleAuth };
}