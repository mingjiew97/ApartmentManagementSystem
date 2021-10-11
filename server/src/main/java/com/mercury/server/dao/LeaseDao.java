package com.mercury.server.dao;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.mercury.server.bean.Lease;

public interface LeaseDao extends JpaRepository<Lease, Long>{
	Lease findByLeaseId(Long leaseId);
	Lease findByRoomNumber(String roomNumber);
	
	@Modifying
	@Query("update Lease l set l.partyA = ?1, l.partyB = ?2, l.rent = ?3, l.deposit = ?4, l.leaseStartDate = ?5, l.leaseEndDate = ?6 where l.leaseId = ?7")
    void editLeaseByLeaseId(String partyA, String partyB, float rent, float deposit, Date leaseStartDate, Date leaseEndDate, Long leaseId);
}
