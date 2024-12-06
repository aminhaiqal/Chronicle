"use client";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '@/services/firebase-config';
import { RootState } from '@redux/store';

export function useToken() {
    const [token, setToken] = useState<string | null>(null);
    const [isTokenValid, setIsTokenValid] = useState<boolean>(false);

    const storedToken = useSelector((state: RootState) => {
        return typeof state.auth === 'string' || state.auth === null ? state.auth : null;
    });

    const refreshToken = async (forceRefresh = false) => {
        try {
            if (auth.currentUser) {
                const idToken = await auth.currentUser.getIdToken(forceRefresh);
                const idTokenResult = await auth.currentUser.getIdTokenResult();
                const currentTime = Date.now();
                
                setToken(idToken);

                if (idTokenResult.expirationTime) {
                    const expirationTime = Number(idTokenResult.expirationTime);
                    const isValid = !isNaN(expirationTime) && currentTime < expirationTime;
                    setIsTokenValid(isValid);
                } else {
                    setIsTokenValid(false); // Handle the case where expirationTime is not valid
                }

                return idToken;
            } else {
                throw new Error("User not authenticated");
            }
        } catch (error) {
            console.error("Error fetching ID token:", error);
            setIsTokenValid(false);
            throw error;
        }
    };

    useEffect(() => {
        if (storedToken) {
            setToken(storedToken);
        } else {
            refreshToken(true);
        }
    }, [storedToken]);

    return { token, isTokenValid, getIdToken: refreshToken };
}
