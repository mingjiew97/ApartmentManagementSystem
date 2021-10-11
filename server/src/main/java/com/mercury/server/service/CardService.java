package com.mercury.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mercury.server.bean.Card;
import com.mercury.server.dao.CardDao;

@Service
public class CardService {
	@Autowired
	CardDao cd;
	
	public Card getByUsername(String username) {
		return cd.findByUsername(username);
	}
	
	public boolean saveCard(Card c) {
		try {
			Card tempC = cd.findByUsername(c.getUsername());
			if (tempC != null){
				cd.deleteById(tempC.getCardNumber());
			}
			cd.save(c);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
