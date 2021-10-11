package com.mercury.server.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mercury.server.bean.Card;
import com.mercury.server.service.CardService;

@RestController
public class CardController {
	@Autowired
	CardService cs;

	@GetMapping("/card/{username}")
	public Card getCardByUsername(@PathVariable String username) {
		return cs.getByUsername(username);
	}
	
	@PostMapping("/card")
	public Map<String, Object> saveBank(@RequestBody Card card) {
		Map<String, Object> response = new HashMap<>();
		response.put("successs", cs.saveCard(card));
		return response;
	}
}
