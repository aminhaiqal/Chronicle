"use client";

import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "@/services/firebase-config";
import { authRequest, authSuccess, authFailure } from "@redux/authSlice";
import { useToast } from "@/hooks/use-toast.ts";
import { ToastAction } from "@/components/ui/toast";
import { FirebaseError } from "firebase/app";
import { serializeUser } from "@/utils/serializeUser";

export function useAuth() {
    const dispatch = useDispatch();
    const { toast } = useToast();

    const handleAuth = useCallback(async (email: string, password: string) => {
        dispatch(authRequest());

        try {
            let userCredential: UserCredential;
            try {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
            } catch (error: unknown) {
                if (error instanceof FirebaseError && error.code === "auth/email-already-in-use") {
                    userCredential = await signInWithEmailAndPassword(auth, email, password);
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

            // Serialize user and update Redux state
            const user = userCredential.user;
            const serializableUser = serializeUser(user);
            dispatch(authSuccess({ user: serializableUser }));

            return serializableUser;
        } catch (signInError: unknown) {
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
    }, [dispatch, toast]);

    return { handleAuth };
}
