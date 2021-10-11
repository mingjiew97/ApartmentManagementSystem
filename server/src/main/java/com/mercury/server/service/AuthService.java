package com.mercury.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.mercury.server.dao.UserDao;
import com.mercury.server.http.AuthenticationSuccessResponse;
import com.mercury.server.http.Response;

@Service
public class AuthService {
	
	@Autowired
	UserDao userDao;
	
	public Response checklogin(Authentication authentication) {
		if (authentication != null) {
			Response response = new AuthenticationSuccessResponse(true, 200, "Logged In!", userDao.findByUsername(authentication.getName()));
			return response;
		} else {
			return new Response(false);
		}
	}

}
