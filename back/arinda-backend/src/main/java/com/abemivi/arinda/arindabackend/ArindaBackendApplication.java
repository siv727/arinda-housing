package com.abemivi.arinda.arindabackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ArindaBackendApplication {

    public static void main(String[] args) {
        // Load .env file if it exists (local development only)
        // In production (Render), real environment variables are set in the dashboard
        Dotenv dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .load();

        dotenv.entries().forEach(entry -> {
            if (System.getenv(entry.getKey()) == null) {
                System.setProperty(entry.getKey(), entry.getValue());
            }
        });

        SpringApplication.run(ArindaBackendApplication.class, args);
    }

}
