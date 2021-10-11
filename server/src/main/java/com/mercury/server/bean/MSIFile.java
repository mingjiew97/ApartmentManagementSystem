package com.mercury.server.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "MSI_FILE")
public class MSIFile {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "MSI_FILE_SEQ_GEN")
	@SequenceGenerator(name = "MSI_FILE_SEQ_GEN", sequenceName = "MSI_FILE_SEQ", allocationSize = 1)
	private long id;
	@Column
	private String name;
	@Lob
	private byte[] contents;

	public MSIFile() {
		super();
	}

	public MSIFile(long id, String name, byte[] contents) {
		super();
		this.id = id;
		this.name = name;
		this.contents = contents;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public byte[] getContents() {
		return contents;
	}

	public void setContents(byte[] contents) {
		this.contents = contents;
	}

}
