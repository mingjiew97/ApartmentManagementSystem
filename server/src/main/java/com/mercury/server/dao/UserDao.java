package com.mercury.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.mercury.server.bean.User;

public interface UserDao extends JpaRepository<User, Long>{
	User findByUsername(String username);
		
	@Modifying
	@Query("update User u set u.title = ?1, u.firstName = ?2, u.lastName = ?3 where u.username = ?4")
    void setUserInfoByUsername(String title, String firstName, String lastName, String username);
	
	@Modifying
	@Query("update User u set u.password = ?1 where u.username = ?2")
    void changePassword(String password, String username);
}
