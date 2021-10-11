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

import com.mercury.server.bean.Maintenance;
import com.mercury.server.service.MaintenanceService;

@RestController
public class MaintenanceController {
	@Autowired
	MaintenanceService ms;
	
	@PostMapping("/maintenances")
	public Map<String, Object> addMaintenance(@RequestBody Maintenance newMaintenance) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", ms.addNewMaintenance(newMaintenance));
		return response;
	}
	
	@PutMapping("/maintenances")
	public Map<String, Object> completeMaintenanceById(@RequestBody Maintenance newMaintenance) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", ms.completeMaintenanceById(newMaintenance));
		return response;
	}
	
	@GetMapping("/maintenances")
	public List<Maintenance> getAllMaintenance() {
		return ms.getAllMaintenance();
	}
	
	@GetMapping("/maintenances/id/{maintenanceId}")
	public Maintenance getById(@PathVariable Long maintenanceId) {
		return ms.getById(maintenanceId);
	}
	
	@GetMapping("/maintenances/serviceId/{serviceId}")
	public Maintenance getByServiceId(@PathVariable Long serviceId) {
		return ms.getByServiceId(serviceId);
	}
	
	@GetMapping("/maintenances/check-staff/{username}")
	public Map<String, Object> checkStaffMaintenanceAmount(@PathVariable String username) {
		Map<String, Object> response = new HashMap<>();
		List<Maintenance> temp = ms.getByStaff(username);
		for (Maintenance m : temp) {
			if (m.getStatus().equals("Completed")) {
				continue;
			} else {
				response.put("success", false);
				return response;
			}
		}
		response.put("success", true);
		return response;
	}
	
	@GetMapping("/maintenances/staff/{username}")
	public Maintenance getByStaffName(@PathVariable String username) {
		List<Maintenance> temp = ms.getByStaff(username);
		for (Maintenance m : temp) {
			if (m.getStatus().equals("In Progress")) {
				return m;
			}
		}
		return null;
	}
	
	@DeleteMapping("/maintenances/{maintenanceId}")
	public Map<String, Object> deleteLeaseByLeaseId(@PathVariable Long maintenanceId) {
		Map<String, Object> response = new HashMap<>();
		if (ms.getById(maintenanceId) == null) {
			response.put("success", false);
		} else {
			response.put("success", ms.deleteById(maintenanceId));
		}
		return response;
	}

}
