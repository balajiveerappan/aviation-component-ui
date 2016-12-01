package com.aviation.component.ui.vo;

import java.util.Date;

public class ComponentHistoryGroupVO {
	
	//{id: 'serial1', content:'serial1',subgroupOrder: function (a,b) {return a.subgroupOrder - b.subgroupOrder;}},
	
private String id;
	
	private String content;
	
	private String title;

	private Long componentID;

	
	private String description;
     

	private String cmpySerialNo;
	

	private String mnfgSerialNo;

	private String classification;


	private String fleetNo;


	private String subfleetNo;


	private String ataSystemNo;


	private String tailNo;


	private String companyPartNo;


	private String mfgPartNo;



	private Date statusUpdatedDate;


	private String status;
	
	

	public Long getComponentID() {
		return componentID;
	}

	public void setComponentID(Long componentID) {
		this.componentID = componentID;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCmpySerialNo() {
		return cmpySerialNo;
	}

	public void setCmpySerialNo(String cmpySerialNo) {
		this.cmpySerialNo = cmpySerialNo;
	}

	public String getMnfgSerialNo() {
		return mnfgSerialNo;
	}

	public void setMnfgSerialNo(String mnfgSerialNo) {
		this.mnfgSerialNo = mnfgSerialNo;
	}

	public String getClassification() {
		return classification;
	}

	public void setClassification(String classification) {
		this.classification = classification;
	}

	public String getFleetNo() {
		return fleetNo;
	}

	public void setFleetNo(String fleetNo) {
		this.fleetNo = fleetNo;
	}

	public String getSubfleetNo() {
		return subfleetNo;
	}

	public void setSubfleetNo(String subfleetNo) {
		this.subfleetNo = subfleetNo;
	}

	public String getAtaSystemNo() {
		return ataSystemNo;
	}

	public void setAtaSystemNo(String ataSystemNo) {
		this.ataSystemNo = ataSystemNo;
	}

	public String getTailNo() {
		return tailNo;
	}

	public void setTailNo(String tailNo) {
		this.tailNo = tailNo;
	}

	public String getCompanyPartNo() {
		return companyPartNo;
	}

	public void setCompanyPartNo(String companyPartNo) {
		this.companyPartNo = companyPartNo;
	}

	public String getMfgPartNo() {
		return mfgPartNo;
	}

	public void setMfgPartNo(String mfgPartNo) {
		this.mfgPartNo = mfgPartNo;
	}

	public Date getStatusUpdatedDate() {
		return statusUpdatedDate;
	}

	public void setStatusUpdatedDate(Date statusUpdatedDate) {
		this.statusUpdatedDate = statusUpdatedDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((content == null) ? 0 : content.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ComponentHistoryGroupVO other = (ComponentHistoryGroupVO) obj;
		if (content == null) {
			if (other.content != null)
				return false;
		} else if (!content.equals(other.content))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	

	

}
