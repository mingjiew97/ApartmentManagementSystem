package com.mercury.server.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mercury.server.bean.Bank;
import com.mercury.server.service.BankService;

@RestController
public class BankController {
	@Autowired
	BankService bs;
	
	@GetMapping("/bank/{username}")
	public Bank getBankByUsername(@PathVariable String username) {
		return bs.getByUsername(username);
	}
	
	@PostMapping("/bank")
	public Map<String, Object> saveBank(@RequestBody Bank bank) {
		Map<String, Object> response = new HashMap<>();
		response.put("successs", bs.saveBank(bank));
		return response;
	}
}
