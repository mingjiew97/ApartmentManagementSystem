package com.mercury.server.service;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mercury.server.dao.ServiceDao;
import com.mercury.server.bean.UserService;


@Transactional
@Service
public class ServiceService {
	@Autowired
	ServiceDao serviceDao;
	
	public boolean addService(UserService newService) {
		try {
			serviceDao.save(newService);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public List<UserService> getAllService() {
		return serviceDao.findAll();
	}
	
	public List<UserService> getServiceByRoomNumber(String roomNumber) {
		return serviceDao.findByRoomNumber(roomNumber);
	}
	
	public boolean editService(UserService newService) {
		try {
			serviceDao.editService(newService.getPreferableStartTime(), newService.getPreferableEndTime(), newService.getInformation(), newService.getServiceId());
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public boolean deleteService(Long serviceId) {
		try {
			serviceDao.deleteById(serviceId);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public UserService getServiceById(Long serviceId) {
		return serviceDao.findByServiceId(serviceId);
	}
	
	public boolean changeServiceStatusToInProgress(UserService newService) {
		try {
			serviceDao.addMaintenanceId(newService.getMaintenanceId(), newService.getServiceId());
			serviceDao.changeServiceStatusToInProgress("In Progress", newService.getServiceId());
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public boolean changeServiceStatusToComplete(Long serviceId) {
		try {
			serviceDao.changeServiceStatusToInProgress("Completed", serviceId);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

}
