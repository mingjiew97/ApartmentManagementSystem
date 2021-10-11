package com.mercury.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mercury.server.bean.User;
import com.mercury.server.mail.EmailService;

@RestController
public class TestController {
	
	@Autowired
	private EmailService es;
	
	@GetMapping("/test")
	public Map<String, Object> test() {
		Map<String, Object> response = new HashMap<>();
		try {
			es.TestSendMessage();
			response.put("success", true);
		} catch (Exception e) {
			response.put("success", false);
		}
		return response;
	}

}
