package com.mercury.server.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mercury.server.bean.User;
import com.mercury.server.dao.UserDao;

@Transactional
@Service
public class UserService {
	
	@Autowired
	UserDao userDao;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	public List<User> getAllUsers() {
		return userDao.findAll();
	}
	
	public void register(User user) {
		// hashing password
		user.setPassword(passwordEncoder.encode(user.getPassword()));
	}
	
	public boolean containsUser(User u){
		boolean result = false;
		try {
			User temp = userDao.findByUsername(u.getUsername());
			if (temp == null) {
				result = true;
			}
		} catch(Exception e) {
			return false;
		}
		return result;
	}
	
	public boolean insertUser(User u) {
		try {
			userDao.save(u);
			return true;
		} catch(Exception e) {
			return false;
		}
	}
	
	public boolean editUser(User u) {
		boolean result = true;
		if (userDao.findByUsername(u.getUsername()) == null) {
			result = false;
		} else {
			try {
				userDao.setUserInfoByUsername(u.getTitle(), u.getFirstName(), u.getLastName(), u.getUsername());
			} catch (Exception e) {
				result = false;
			}
		}
		return result;
	}
	
	public boolean changePassword(User u) {
		boolean result = true;
		if (userDao.findByUsername(u.getUsername()) == null) {
			result = false;
		} else {
			try {
				register(u);
				userDao.changePassword(u.getPassword(), u.getUsername());
			} catch (Exception e) {
				result = false;
			}
		}
		return result;
	}
	
	public User getUserByUsername(String username) {
		return userDao.findByUsername(username);
	}

}
