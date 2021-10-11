package com.mercury.server.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mercury.server.bean.MSIFile;
import com.mercury.server.dao.MSIFileDao;
import com.mercury.server.http.Response;

@Service
public class MSIFileService {
	
	@Autowired
	MSIFileDao msiFileDao;

	public Response upload(String filename, MultipartFile file) {
		try {
			MSIFile mf = msiFileDao.findByName(filename);
			if (mf == null) { // new
				MSIFile msiFile = new MSIFile();
				msiFile.setName(filename);
				msiFile.setContents(file.getBytes());
				msiFileDao.save(msiFile);
			} else { // update
				mf.setContents(file.getBytes());
				msiFileDao.save(mf);
			}
			return new Response(true);
		} catch (Exception e) {
			return new Response(false, e.getMessage());
		}
	}

	public ResponseEntity<Resource> download(String filename) {
		try {
			MSIFile mf = msiFileDao.findByName(filename);
			return ResponseEntity.ok()
	                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + mf.getName() + "\"")
	                .body(new ByteArrayResource(mf.getContents()));
		} catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public List<String> list() {
		return msiFileDao.findAll().stream().map(f -> f.getName()).collect(Collectors.toList());
	}

}
