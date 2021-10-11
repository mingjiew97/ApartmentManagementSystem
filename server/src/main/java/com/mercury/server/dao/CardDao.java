package com.mercury.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mercury.server.bean.Card;

public interface CardDao extends JpaRepository<Card, Long>{
	Card findByUsername(String username);
}
