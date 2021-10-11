package com.mercury.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mercury.server.bean.LiftSchedule;
import com.mercury.server.service.LiftScheduleService;

@RestController
public class LiftScheduleController {
	@Autowired
	LiftScheduleService lss;
	
	@GetMapping("/liftSchedule")
	public List<LiftSchedule> getAllLiftSchedule() {
		return lss.getAll();
	}
	
	@GetMapping("/liftSchedule/{roomNumber}")
	public List<LiftSchedule> getByRoomNumber(@PathVariable String roomNumber) {
		return lss.getByRoomNumber(roomNumber);
	}
	
	@PostMapping("/liftSchedule")
	public Map<String, Object> addLiftSchedule(@RequestBody LiftSchedule ls) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", lss.addService(ls));
		return response;
	}
	
	@PutMapping("/liftSchedule")
	public Map<String, Object> changeStatus(@RequestBody LiftSchedule ls) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", lss.editStatus(ls));
		return response;
	}
	
	@DeleteMapping("/liftSchedule/{liftScheduleId}")
	public Map<String, Object> deleteById(@PathVariable Long liftScheduleId) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", lss.deleteById(liftScheduleId));
		return response;
	}
}
