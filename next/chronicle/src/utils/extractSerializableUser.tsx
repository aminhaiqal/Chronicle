"use client";

import { SerializableUser } from "@/interfaces/SerializableUser";
import { User } from "firebase/auth";

export const extractSerializableUser = (user: User): SerializableUser => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
});
