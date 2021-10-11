package com.mercury.server.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mercury.server.bean.User;
import com.mercury.server.mail.EmailService;
import com.mercury.server.service.UserService;

@RestController
public class EmailController {
	
	@Autowired
	private EmailService es;
	
	@Autowired
	private UserService us;
	
	public String passwordGenerator() {
		int len = 20;
	    String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	    Random rnd = new Random();

	    StringBuilder sb = new StringBuilder(len);
	    for (int i = 0; i < len; i++) {
	        sb.append(AB.charAt(rnd.nextInt(AB.length())));
	    }
	    return sb.toString();
	}
	
	@GetMapping("/sendEmail")
	public Map<String, Object> send(String subject, String content) {
		Map<String, Object> response = new HashMap<>();
		try {
			es.SendMessage(subject, content);
			response.put("success", true);
		} catch (Exception e) {
			response.put("success", false);
		}
		return response;
	}
	
	@GetMapping("/resetPassword/{username}")
	public Map<String, Object> send(@PathVariable String username) {
		User user = us.getUserByUsername(username);
		String newP = passwordGenerator();
		user.setPassword(newP);
		Map<String, Object> response = new HashMap<>();
		try {
			us.changePassword(user);
			es.SendMessage("Password Reset", newP);
			response.put("success", true);
		} catch (Exception e) {
			response.put("success", false);
		}
		return response;
	}
	
	@PutMapping("/resetPassword")
	public Map<String, Object> send(@RequestBody User user) {
//		String newP = passwordGenerator();
//		user.setPassword(newP);
		Map<String, Object> response = new HashMap<>();
		try {
			us.changePassword(user);
			es.PasswordReset();
//			es.SendMessage("Password Reset", newP);
			response.put("success", true);
		} catch (Exception e) {
			response.put("success", false);
		}
		return response;
	}

}
