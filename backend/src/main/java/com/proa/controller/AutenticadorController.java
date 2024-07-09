package com.proa.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.proa.model.AuthRequest;
import com.proa.model.AuthResponse;


@RestController
@RequestMapping("/v1/auth")
public class AutenticadorController {
	
	@PostMapping
	public ResponseEntity<?> login(@RequestBody AuthRequest authRequest){

		System.out.println("teste");
		AuthResponse authResponse = new AuthResponse();
		
		try {
			
			FirebaseAuth.getInstance().getUser(authRequest.getUid());
			
			String token = FirebaseAuth.getInstance().createCustomToken(authRequest.getUid());
			authResponse.setOk(true);
			authResponse.setUserToken(token);
			return ResponseEntity.ok(authResponse);
			
		} catch (FirebaseAuthException e) {
			authResponse.setOk(false);
			authResponse.setMessage(e.getMessage());
			return ResponseEntity.badRequest().body(authResponse);
		}
		
	}
	
}
