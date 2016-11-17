package com.aviation.component.ui.vo;

import java.util.List;


public class PostComponentRequestVO {

	private String toDate;
	
	private String fromDate;
	
	private List<ComponentVO> components;

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public List<ComponentVO> getComponents() {
		return components;
	}

	public void setComponents(List<ComponentVO> components) {
		this.components = components;
	}

	
	
	
}
