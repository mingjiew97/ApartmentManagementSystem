package com.mercury.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mercury.server.bean.Bank;
import com.mercury.server.dao.BankDao;

@Service
public class BankService {
	@Autowired
	BankDao bd;
	
	public Bank getByUsername(String username) {
		return bd.findByUsername(username);
	}
	
	public boolean saveBank(Bank b) {
		try {
			Bank tempB = bd.findByUsername(b.getUsername());
			if (tempB == null) {
				bd.save(b);
			} else {
				bd.deleteById(tempB.getAccountNumber());
				bd.save(b);
			}
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
