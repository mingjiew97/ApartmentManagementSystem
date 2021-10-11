package com.mercury.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mercury.server.bean.Bank;

public interface BankDao extends JpaRepository<Bank, Long>{
	Bank findByUsername(String username);
}
