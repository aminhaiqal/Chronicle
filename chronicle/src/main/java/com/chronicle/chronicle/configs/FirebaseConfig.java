package com.chronicle.chronicle.configs;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseAuth firebaseAuth() {
        try {
            FileInputStream serviceAccount = new FileInputStream(
                getClass().getClassLoader().getResource("chronicle-d679f-firebase-adminsdk-97v1w-44594ea257.json").getFile()
            );

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            // Initialize Firebase app if not already initialized
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }

            return FirebaseAuth.getInstance();
        } catch (IOException e) {
            throw new RuntimeException("Failed to initialize FirebaseAuth", e);
        }
    }
}
