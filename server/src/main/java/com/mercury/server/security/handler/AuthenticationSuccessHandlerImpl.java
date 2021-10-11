package com.mercury.server.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.mercury.server.bean.User;
import com.mercury.server.security.SecurityUtils;

@Component
public class AuthenticationSuccessHandlerImpl extends SimpleUrlAuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		System.out.println("sucessHandler");
		SecurityUtils.sendAuthenticationSuccessResponse(response, HttpServletResponse.SC_OK, "Login successfully.", null, (User)authentication.getPrincipal());
	}
	
}
