package com.mercury.server.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.mercury.server.bean.Lease;
import com.mercury.server.dao.LeaseDao;

@Transactional
@Service
public class LeaseService {
	@Autowired
	LeaseDao leaseDao;
	
	public List<Lease> getAllLease() {
		return leaseDao.findAll();
	}
	
	public boolean addNewLease(Lease newLease) {
		try {
			leaseDao.save(newLease);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public Lease getLeaseByRoomNumber(String roomNumber) {
		return leaseDao.findByRoomNumber(roomNumber);
	}
	
	public Lease getLeaseByLeaseId(Long leaseId) {
		return leaseDao.findByLeaseId(leaseId);
	}
	
	public boolean deleteLeaseByLeaseId(Long leaseId) {
		try {
			leaseDao.deleteById(leaseId);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
//	@Query("update Lease l set l.paryA = ?1, l.partyB = ?2, l.rent = ?3, l.deposit = ?4, l.leaseStartDate = ?5, l.leaseEndDate = ?6 where l.leaseId = ?7")
	public boolean editLeaseByLeaseId(Lease lease) {
		try {
			leaseDao.editLeaseByLeaseId(lease.getPartyA(), lease.getPartyB(), lease.getRent(), lease.getDeposit(), lease.getLeaseStartDate(), lease.getLeaseEndDate(), lease.getLeaseId());
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
