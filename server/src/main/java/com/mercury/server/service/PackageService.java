package com.mercury.server.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mercury.server.bean.HOAPackage;
import com.mercury.server.dao.PackageDao;

@Transactional
@Service
public class PackageService {
	@Autowired
	PackageDao pd;
	
	public HOAPackage getPackageById(Long id) {
		return pd.getOne(id);
	}
	
	public List<HOAPackage> getAllPackages() {
		return pd.findAll();
	}
	
	public List<HOAPackage> getPackagesByUsername(String username) {
		return pd.findByRenterId(username);
	}
	
	public boolean addPackage(HOAPackage newP) {
		try {
			pd.save(newP);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public boolean editPackage(HOAPackage newP) {
		try {
			pd.editPackage(newP.getPackagePickedUpTime(), newP.getStatus(), newP.getId());
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public List<HOAPackage> getPackageByTrackingNumber(String trackingNumber) {
		return pd.findByTrackingNumber(trackingNumber);
	}
	
	public boolean deletePackage(Long id) {
		try {
			pd.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

}
