"use client";

import { auth } from '@/services/firebase-config';

export const getToken = async (forceRefresh = false): Promise<string | null> => {
    try {
        if (auth.currentUser) {
            return await auth.currentUser.getIdToken(forceRefresh);
        } else {
            throw new Error('User not authenticated');
        }
    } catch (error) {
        console.error('Error fetching ID token:', error);
        return null;
    }
};
