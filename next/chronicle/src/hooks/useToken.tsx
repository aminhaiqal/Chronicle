import { useEffect, useState } from 'react';
import { auth } from '@/services/firebase-config';

export function useToken() {
    const [token, setToken] = useState<string | null>(localStorage.getItem("idToken"));

    useEffect(() => {
        const storedIdToken = localStorage.getItem("idToken");
        if (storedIdToken) {
            setToken(storedIdToken);
        }
    }, []);

    const getIdToken = async (forceRefresh = false) => {
        try {
            if (auth.currentUser) {
                const newToken = await auth.currentUser.getIdToken(forceRefresh);
                setToken(newToken);
                localStorage.setItem("idToken", newToken);
                return newToken;
            }
            throw new Error("User not authenticated");
        } catch (error) {
            console.error("Error fetching ID token:", error);
            throw error;
        }
    };

    return { token, getIdToken };
}