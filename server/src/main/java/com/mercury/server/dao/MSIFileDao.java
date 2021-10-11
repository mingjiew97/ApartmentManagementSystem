package com.mercury.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mercury.server.bean.MSIFile;

public interface MSIFileDao extends JpaRepository<MSIFile, Long> {
	public MSIFile findByName(String name);
}
