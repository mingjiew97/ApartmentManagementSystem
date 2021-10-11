package com.mercury.server.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mercury.server.bean.Maintenance;
import com.mercury.server.dao.MaintenanceDao;
import com.mercury.server.dao.ServiceDao;

@Transactional
@Service
public class MaintenanceService {
	@Autowired
	MaintenanceDao md;
	
	@Autowired
	ServiceDao sd;
	
	public boolean addNewMaintenance(Maintenance newMaintenance) {
		try {
			md.save(newMaintenance);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public boolean completeMaintenanceById(Maintenance newMaintenance) {
		try {
			sd.changeServiceStatusToInProgress("Completed", newMaintenance.getServiceId());
			md.completeMaintenanceById(newMaintenance.getActualEndTime(), newMaintenance.getFinishedMessage(), newMaintenance.getStatus(), newMaintenance.getMaintenaceId());
			System.out.println(newMaintenance.getStatus());
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public Maintenance getById(Long maintenanceId) {
		return md.findByMaintenaceId(maintenanceId);
	}
	
	public List<Maintenance> getAllMaintenance() {
		return md.findAll();
	}
	
	public List<Maintenance> getByStaff(String username) {
		return md.findByStaffName(username);
	}
	
	public boolean deleteById(Long maintenanceId) {
		try{
			md.deleteById(maintenanceId);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public Maintenance getByServiceId(Long serviceId) {
		return md.findByServiceId(serviceId);
	}
	
}
