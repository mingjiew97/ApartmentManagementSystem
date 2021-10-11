package com.mercury.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mercury.server.bean.User;
import com.mercury.server.service.UserService;

@RestController
public class UserController {
	@Autowired
	UserService userService;
	
	@GetMapping("/users")
	public List<User> getUsers() {
		return userService.getAllUsers();
	}
	
	@PostMapping("/users")
	public Map<String, Object> postSample(@RequestBody User user) {
		Map<String, Object> response = new HashMap<>();
		userService.register(user);
		response.put("success", userService.insertUser(user));
		return response;
	}
	
	@PostMapping("/users/register")
	public Map<String, Object> register(@RequestBody User user) {
		Map<String, Object> response = new HashMap<>();
		userService.register(user);
		if (userService.containsUser(user)) {
			response.put("containsUser", true);
			if (userService.insertUser(user)) {
				response.put("insertUser", true);
			} else {
				response.put("insertUser", false);
			}
		} else {
			response.put("containsUser", false);
			response.put("insertUser", true);
		}
		
		return response;
	}
	
	@PutMapping("/users/edit-user-info")
	public Map<String, Object> editUserInformation(@RequestBody User user) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", userService.editUser(user));
		return response;
	}
	
	@PutMapping("/users/change-password")
	public Map<String, Object> changePassword(@RequestBody User user) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", userService.changePassword(user));
		return response;
	}
	
	@GetMapping("/users/{username}")
	public User getUserByUsername(@PathVariable String username) {
		return userService.getUserByUsername(username);
	}

}
