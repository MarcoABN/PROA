package com.proa.autenticador;

import java.io.IOException;
import java.io.InputStream;

import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.ClassPathResource;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import ch.qos.logback.classic.Logger;



@Configuration
public class FirebaseConfig {
	
	private static final Logger log = (Logger) LoggerFactory.getLogger(FirebaseConfig.class);
	
	
	@Bean
	@Primary
	public void firebaseInit() {
		try {
			InputStream in = new ClassPathResource("firebaseconfigPROA.json").getInputStream();
			
			FirebaseOptions options = new FirebaseOptions.Builder()
							.setCredentials(GoogleCredentials.fromStream(in))
							.build();
			
			if (FirebaseApp.getApps().isEmpty()) {
				FirebaseApp.initializeApp(options);
			}
				
			log.info("---Firebase iniciado!---");	
		}catch (IOException e) {
			e.printStackTrace();
		}
	}
}
