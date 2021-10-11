package com.mercury.server.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mercury.server.bean.LiftSchedule;
import com.mercury.server.dao.LiftScheduleDao;

@Transactional
@Service
public class LiftScheduleService {
	@Autowired
	LiftScheduleDao lsd;
	
	public List<LiftSchedule> getAll() {
		return lsd.findAll();
	}
	
	public List<LiftSchedule> getByRoomNumber(String roomNumber) {
		return lsd.findByRoomNumber(roomNumber);
	}
	
	public boolean addService(LiftSchedule ls) {
		try {
			lsd.save(ls);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public boolean editStatus(LiftSchedule ls) {
		try {
			lsd.changeStatus(ls.getApproved(), ls.getLiftScheduleId());
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public boolean deleteById(Long id) {
		try {
			lsd.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
