"use client";

import { User } from 'firebase/auth';
import { SerializableUser } from '@/interfaces/SerializableUser';

export function serializeUser(firebaseUser: User): SerializableUser {
    return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
    };
}

