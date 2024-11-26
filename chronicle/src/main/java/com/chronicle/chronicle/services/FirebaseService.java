package com.chronicle.chronicle.services;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.stereotype.Service;

@Service
public class FirebaseService {
    public static void initializeFirebase() throws IOException {
        FileInputStream serviceAccount = new FileInputStream("src/main/resources/chronicle-d679f-firebase-adminsdk-97v1w-44594ea257.json");

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        FirebaseApp.initializeApp(options);

    }

    public FirebaseToken verifyIdToken(String idToken) throws Exception {
        return FirebaseAuth.getInstance().verifyIdToken(idToken);
    }
}
