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

import com.mercury.server.bean.Lease;
import com.mercury.server.service.LeaseService;

@RestController
public class LeaseController {
	@Autowired
	LeaseService ls;
	
	@PostMapping("/lease")
	public Map<String, Object> addLease(@RequestBody Lease newLease) {
		Map<String, Object> response = new HashMap<>();
		if (ls.getLeaseByRoomNumber(newLease.getRoomNumber()) != null) {
			response.put("success", false);
		}else {
			response.put("success", ls.addNewLease(newLease));
		}
		return response;
	}
	
	@GetMapping("/lease")
	public List<Lease> getAllLease() {
		return ls.getAllLease();
	}
	
	@GetMapping("/lease/{roomNumber}")
	public Lease getLeaseByRoomNumber(@PathVariable String roomNumber) {
		return ls.getLeaseByRoomNumber(roomNumber);
	}
	
	@DeleteMapping("/lease/{leaseId}")
	public Map<String, Object> deleteLeaseByLeaseId(@PathVariable Long leaseId) {
		Map<String, Object> response = new HashMap<>();
		if (ls.getLeaseByLeaseId(leaseId) == null) {
			response.put("success", false);
		} else {
			response.put("success", ls.deleteLeaseByLeaseId(leaseId));
		}
		return response;
	}
	
	@PutMapping("/lease")
	public Map<String, Object> editLeaseByLeaseId(@RequestBody Lease lease) {
		Map<String, Object> response = new HashMap<>();
		if (ls.getLeaseByLeaseId(lease.getLeaseId()) == null) {
			response.put("success", false);
		} else {
			System.out.println("******************");
			response.put("success", ls.editLeaseByLeaseId(lease));
		}
		return response;
	}
}
