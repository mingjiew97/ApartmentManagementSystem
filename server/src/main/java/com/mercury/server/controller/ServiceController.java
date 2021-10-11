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

import com.mercury.server.bean.UserService;
import com.mercury.server.service.ServiceService;

@RestController
public class ServiceController {
	@Autowired
	ServiceService ss;
	
	@GetMapping("/services")
	public List<UserService> getServices() {
		return ss.getAllService();
	}
	
	@PostMapping("/services")
	public Map<String, Object> addService(@RequestBody UserService newService) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", ss.addService(newService));
		return response;
	}
	
	@GetMapping("/services/{roomNumber}")
	public List<UserService> getServiceByRoomNumber(@PathVariable String roomNumber) {
		return ss.getServiceByRoomNumber(roomNumber);
	}
	
	@GetMapping("/services/id/{serviceId}")
	public UserService getServiceByServiceId(@PathVariable String serviceId) {
		return ss.getServiceById(Long.parseLong(serviceId));
	}
	
	@PutMapping("/services")
	public Map<String, Object> editService(@RequestBody UserService newService) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", ss.editService(newService));
		return response;
	}
	
	@PutMapping("/staff/services")
	public Map<String, Object> editServiceStaff(@RequestBody UserService newService) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", ss.changeServiceStatusToInProgress(newService));
		return response;
	}
	
	@PutMapping("/complete/services")
	public Map<String, Object> editServiceComplete(@RequestBody UserService newService) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", ss.changeServiceStatusToComplete(newService.getServiceId()));
		return response;
	}
	
	@DeleteMapping("/services/{serviceId}")
	public Map<String, Object> deleteService(@PathVariable Long serviceId) {
		Map<String, Object> response = new HashMap<>();
		if (ss.getServiceById(serviceId) == null) {
			response.put("success", false);
		} else {
			response.put("success", ss.deleteService(serviceId));
		}
		return response;
	}
}
