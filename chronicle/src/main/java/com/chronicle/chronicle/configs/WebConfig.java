package com.chronicle.chronicle.configs;

import jakarta.servlet.Filter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.chronicle.chronicle.middleware.FirebaseAuthFilter;

@Configuration
public class WebConfig {
    @Bean
    public Filter firebaseAuthFilter() {
        return new FirebaseAuthFilter();
    }
}
