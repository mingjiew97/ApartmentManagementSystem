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

import com.mercury.server.bean.HOAPackage;
import com.mercury.server.service.PackageService;

@RestController
public class PackageController {
	@Autowired
	PackageService ps;
	
	@GetMapping("/packages")
	public List<HOAPackage> getAllPackages() {
		return ps.getAllPackages();
	}
	
	@GetMapping("/packages/id/{id}")
	public HOAPackage getPackageById(@PathVariable Long id) {
		return ps.getPackageById(id);
	}
	
	@GetMapping("/packages/{username}")
	public List<HOAPackage> getPackageByUsername(@PathVariable String username) {
		return ps.getPackagesByUsername(username);
	}
	
	@GetMapping("/packages/trackingNumber/{trackingNumber}")
	public Map<String, Object> getPackageByTrackingNumber(@PathVariable String trackingNumber) {
		Map<String, Object> response = new HashMap<>();
		if (ps.getPackageByTrackingNumber(trackingNumber) == null || ps.getPackageByTrackingNumber(trackingNumber).size() == 1) {
			response.put("success", false);
		} else {
			response.put("success", true);
		}
		return response;
	}
	
	@DeleteMapping("/packages/{id}")
	public Map<String, Object> deletePackageById(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", ps.deletePackage(id));
		return response;
	}
	
	@PostMapping("/packages/post-package")
	public Map<String, Object> addPackage(@RequestBody HOAPackage newP) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", ps.addPackage(newP));
		return response;
	}
	
	@PutMapping("/packages/edit-package")
	public Map<String, Object> editPackage(@RequestBody HOAPackage newP) {
		Map<String, Object> response = new HashMap<>();
		response.put("success", ps.editPackage(newP));
		return response;
	} 
}
