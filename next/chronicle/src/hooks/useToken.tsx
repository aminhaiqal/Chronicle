// hooks/useToken.ts
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store'; // Adjust import based on your store file
import { useEffect, useState } from 'react';
import { auth } from '@/services/firebase-config';

export function useToken() {
    const [token, setToken] = useState<string | null>(null);
    const idToken = useSelector((state: RootState) => state.auth.idToken);

    useEffect(() => {
        if (idToken) {
            setToken(idToken);
        }
    }, [idToken]);

    const getIdToken = async (forceRefresh = false) => {
        try {
            if (auth.currentUser) {
                const newToken = await auth.currentUser.getIdToken(forceRefresh);
                setToken(newToken);
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
