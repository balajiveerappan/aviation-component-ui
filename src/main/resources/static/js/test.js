var step;
var currentcount;
var forStart;
var forEnd;
var worstFitGroupList=[];
var worstFitItemList=[];
var worstFitGroupListFinal=[]
var statusValue=[];
var worstFitItemListFinal=[]
var exportGroupList=[];
var exportItemList=[];
var reportGroup=[];
var reportItem=[];
var Acutalreport={};
var fmDate;


function component(){
	window.location="/aviation-settings/filter";
}


function splashScreen(){
window.location="/aviation-settings/splash";
}

// Instantiate our timeline object.

function printDiv() {
	
	    
	       html2canvas(document.getElementById("visualization"), {
	        onrendered: function (canvas) {
	        		html2canvas(document.getElementById("graphFilter"), {
	        			onrendered: function (canvas1) {
	        				
	        		       
	        				 var originalContents = document.body.innerHTML;
	        				 
	        				 var htmlPage="<html><head><title></title></head><body>";
	        				 
	        				 htmlPage+="<img src='"+canvas1.toDataURL()+"' width=20% />";
	        				 htmlPage+="<img src='"+canvas.toDataURL()+"' width=80%  />";
	        				 htmlPage+="</body></html>";
	        				 
	        				 
	        					document.body.innerHTML = htmlPage;
	        			    	window.print();
	        			    	document.body.innerHTML = originalContents;  
	        	
	        },
	   
	    });  
	        	
	        	
	        	
	        },
	   
	    });   
	    
	 
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



var removal=function(componentIdlist){

	
	$.ajax({
		
		contentType : "application/json",
		type : "POST",	
		datatype:'json',
		url : "/removalReport",
		data:JSON.stringify({componentIds: componentIdlist, fromDate: fmDate}),
		success : function(data) { 
			Acutalreport=data;
			step=0;
			forStart=0;
			forEnd=0;
			console.log(JSON.stringify(Acutalreport.groupList))
			reportGroup=Acutalreport.groupList;
			reportItem=Acutalreport.itemList;
			currentcount=0;
			onPageLoad(step)	
		},
		  error: function(data){
	        	 console.log(data)
	         }
		
	
		
	});
	
}
function onChangeRemovalEvent(){
	var scheduledFlag=document.getElementById("Sch").checked
	var unscheduledFlag=document.getElementById("unSch").checked
	var othersFlag=document.getElementById("oCircle").checked
	reportGroup=[];
	reportItem=[];
	if(scheduledFlag || unscheduledFlag ||othersFlag)
		onchange(scheduledFlag,unscheduledFlag,othersFlag)
	else if(scheduledFlag==false && unscheduledFlag==false && othersFlag==false ){
		   reportGroup=[];
		   reportItem=[];  
	   }
	else{
		reportGroup=Acutalreport.groupList;
		reportItem=Acutalreport.itemList;
	}
	onPageLoad('0')
}

	 
function onchange(scheduledFlag,unscheduledFlag,othersFlag){
		scheduled="redTriangle";
		unscheduled="yellowTriangle";
		others="Others";
		var pattern;
	 	for(var j=0; j<Acutalreport.groupList.length; j++){ 
	 		var counter=0;
			for(i=0;i<Acutalreport.itemList.length;i++){
				 if(Acutalreport.groupList[j].id == Acutalreport.itemList[i].group){
			 			if(scheduledFlag){
							pattern = new RegExp(scheduled);
							if(pattern.test(Acutalreport.itemList[i].content)){
								counter++;
					  			reportItem.push(Acutalreport.itemList[i]);
				          		}
					     }
						if(unscheduledFlag){
							pattern = new RegExp(unscheduled);
							if(pattern.test(Acutalreport.itemList[i].content)){
								counter++;
					  			reportItem.push(Acutalreport.itemList[i]);
				          	}
					    }
					   if(othersFlag){
						    pattern = new RegExp(others);
							if(pattern.test(Acutalreport.itemList[i].content)){
								counter++;
					  			reportItem.push(Acutalreport.itemList[i]);
				          	}
					    }
					   /* If all are unchecked */
					   
					   
					   
				 }
			}
		 if(counter!=0){
	     	 	groups1={}  
				groups1=Acutalreport.groupList[j];
			 	reportGroup.push(groups1);
		 }

	 }
	 console.log(JSON.stringify(reportGroup.length))
	 console.log(JSON.stringify(reportItem)) 
	 var r=[];	  
     var itemList=[];
	 t:for(i=0;i<Acutalreport.itemList.length;i++){
	    	for(j=0; j<reportItem.length; j++){
			 	if(reportItem[j].group == Acutalreport.itemList[i].group){
					if(Acutalreport.itemList[i].content == ""){
						 for(var z = 0; z < r.length; z++){  
			            	if(r[z]==Acutalreport.itemList[i].id) continue t;
			             }  
			        	 r[r.length] = Acutalreport.itemList[i].id; 
						 itemList.push(Acutalreport.itemList[i]);
	     		    }
			 	}
		    }
    }
	reportItem.push.apply(reportItem,itemList)
}
	 



function onChangeRadioButton(){ 
	document.getElementById('visualization').innerHTML = "";
    onPageLoad('0');
}



function getDays(fromDate, toDate){
	var date1 = fromDate;
	var date2 = toDate;

	// First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
	date1 = date1.split('-');
	date2 = date2.split('-');

	// Now we convert the array to a Date object, which has several helpful methods
	date1 = new Date(date1[0], date1[1], date1[2]);
	date2 = new Date(date2[0], date2[1], date2[2]);

	// We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
	date1_unixtime = parseInt(date1.getTime() / 1000);
	date2_unixtime = parseInt(date2.getTime() / 1000);

	// This is the calculated difference in seconds
	var timeDifference = date2_unixtime - date1_unixtime;

	// in Hours
	var timeDifferenceInHours = timeDifference / 60 / 60;

	// and finaly, in days :)
	var timeDifferenceInDays = timeDifferenceInHours  / 24;

	return timeDifferenceInDays;

	}
	




function onPageLoad(value){
	step=value;
	var temp=0;
	document.getElementById("visualization").innerHTML = "";
	
	paginationStatus();
  
   $('input[name="installedFilter"]').unbind().click(function(){
		if($(this).attr('checked')){
		
		$(this).attr('checked',false);
		}
		else{
		$(this).attr('checked','checked');
		
		}
		
});
 
 
/*

$('input[name="Sch"]').click(function(){
		
    	////alert("checked status"+document.getElementById("remperbar"));
		filterlogic();
		
       console.log('Sch applied');
})

$('input[name="unSch"]').click(function(){
		
    	////alert("checked status"+document.getElementById("remperbar"));
		filterlogic();
		
       console.log('filter applied');
})

$('input[name="oCircle"]').click(function(){
		
    	////alert("checked status"+document.getElementById("remperbar"));
		filterlogic();
		
       console.log('filter applied');
})*/

$('input[name="installedFilter"]').click(function(){
		
    	
		filterlogic();
		
       console.log('filter applied');
})
  
	<!-- ***************Start of Filter logic for chart selection***************	 -->
	function filterlogic(){

		/*
		if($('input[name="Sch"]').attr('checked')== 'checked'){	
				
			 $('.redTriangle').css('display','block');
							console.log('redTriangle.png all');
		}
		if($('input[name="Sch"]').attr('checked')== false || $('input[name="Sch"]').attr('checked') == undefined ){	
			
			 $('.redTriangle').css('display','none');
							console.log('redTriangle.png none');
		}
		if($('input[name="unSch"]').attr('checked')== 'checked'){	
			
			 $('.yellowTriangle').css('display','block');
							console.log('yellowTriangle.png all');
		}
		if($('input[name="unSch"]').attr('checked')== false || $('input[name="unSch"]').attr('checked') == undefined ){	
			
			 $('.yellowTriangle').css('display','none');
							console.log('yellowTriangle.png none');
		}
		if($('input[name="oCircle"]').attr('checked')== 'checked'){	
			
			$('.Others').css('display','block');
			
							console.log('Others.png all');
		}
		if($('input[name="oCircle"]').attr('checked')== false || $('input[name="oCircle"]').attr('checked') == undefined ){	
			
			$('.Others').css('display','none');
			
			
			 				console.log('Others.png none');
		}*/
		if($('input[name="installedFilter"]').attr('checked')==  'checked' ){	
			
			
			$('.positive').css('display','block');
			 				console.log('installed.png all');
		}
		if($('input[name="installedFilter"]').attr('checked')== false || $('input[name="installedFilter"]').attr('checked') == undefined ){	
			
			
			$('.positive').css('display','none');
			 				console.log('installed.png none');
		}
	}
	<!-- ***************End of Filter logic for chart selection***************	 -->
  
   
  
  
  
  
  
  
  
  
  
  // Create a DataSet (allows two way data-binding)
   var items = new vis.DataSet({
        type: { start: 'Moment', end: 'Moment' }
    }); 
   var groups = new vis.DataSet();
   var length=reportGroup.length;
   if(step==0)
   {
    forStart=0;
       forEnd=25;
       currentcount=1;
   }else if(forEnd==length){
		forEnd=forStart;
		forStart=forStart-25;
		currentcount=currentcount-1;
	}else if(step==1){
		forStart=forStart+25;
		forEnd=forEnd+25;
		currentcount=currentcount+1;
	}else if(step==-1){
		forStart=forStart-25;
		forEnd=forEnd-25;
		currentcount=currentcount-1;
	}else if(step==0){
		forStart=0;
		forEnd=25;
		currentcount=1;
	}
   
	if(forEnd>length){
		forEnd=length;
	}
   

   
   if(step==0){
		  worstFitGroupListFinal=[]
		  worstFitItemListFinal=[]
		   worstFitGroupList=[];
		   worstFitItemList=[];
		   sortedGroupFinalList=[];
		   exportGroupList=[];
		   exportItemList=[];
		   
		   
		   console.log(JSON.stringify(reportGroup));
			console.log(JSON.stringify(reportItem));
		   for(var i=0; i<reportGroup.length; i++){ 
			   bestCount=0
			   totalInstalledDays=0
			   worstCount= reportGroup.length
					for(j=0 ; j<reportItem.length; j++){ 		
							if(reportGroup[i].id == reportItem[j].group){ 
								if(reportItem[j].content!=""){
										   bestCount++
										   worstCount--
								   }
								else{
								
								 installedDays=getDays(reportItem[j].start,reportItem[j].end)
								 totalInstalledDays=totalInstalledDays+installedDays
								}
							}
					}
				
				groups1={}  
				groups1["id"]=reportGroup[i].id;
				groups1["bestCount"]=bestCount;
				groups1["worstCount"]=worstCount;
				groups1["totalInstalledDays"]=totalInstalledDays;
				groups1["content"]=reportGroup[i].content;
				groups1["cmpySerialNo"]=reportGroup[i].cmpySerialNo;
				groups1["mfgPartNo"]=reportGroup[i].mfgPartNo;
				groups1["companyPartNo"]=reportGroup[i].companyPartNo;
				groups1["mnfgSerialNo"]=reportGroup[i].mnfgSerialNo;
				groups1["classification"]=reportGroup[i].classification;
				groups1["description"]=reportGroup[i].description;
				groups1["tailNo"]=reportGroup[i].tailNo;
				groups1["fleetNo"]=reportGroup[i].fleetNo;
				groups1["subfleetNo"]=reportGroup[i].subfleetNo;
				groups1["ataSystemNo"]=reportGroup[i].ataSystemNo;
				groups1["status"]=reportGroup[i].status;
				
				
				
				
				
				
				
				
				
					
					
					
					
				
				
				
				worstFitGroupList.push(groups1);
			  
					if(temp<bestCount){
						temp=bestCount;
					}
		   
			   }

		   
		   
		   for(var i=0; i< worstFitGroupList.length; i++){
		  			for(j=0 ; j<reportItem.length; j++){ 
		  					if(worstFitGroupList[i].id ==reportItem[j].group){
		  						worstFitItemList.push(reportItem[j])
		  					}
		  			}
		
		   }
		   
      worstFit= document.getElementById("worstFirst").checked;
   	  bestFit= document.getElementById("bestFirst").checked;
  
   
   
   	  if(worstFit) {
			for(var k=temp;k>=0; k--){
			   for(var i=0; i<worstFitGroupList.length; i++){
					if(worstFitGroupList[i].bestCount == k){
						worstFitGroupListFinal.push(worstFitGroupList[i]);
							
					}
					
				}
			  
					  
					
					   worstFitGroupListFinal=worstFitGroupListFinal.sort(function(a, b){
					   return a.totalInstalledDays-b.totalInstalledDays
						})
						sortedGroupFinalList.push.apply(sortedGroupFinalList,worstFitGroupListFinal)
						worstFitGroupListFinal=[]
						
		}
			

		 }

   	  if(bestFit) {
			for(var k=temp;k>=0; k--){
				   for(var i=0; i<worstFitGroupList.length; i++){
						if(worstFitGroupList[i].bestCount == k){
							worstFitGroupListFinal.push(worstFitGroupList[i]);
								
						}
						
					}
				  
						  
						   worstFitGroupListFinal=worstFitGroupListFinal.sort(function(a, b){
						   return a.totalInstalledDays-b.totalInstalledDays
							})
							sortedGroupFinalList.push.apply(sortedGroupFinalList,worstFitGroupListFinal)
							worstFitGroupListFinal=[]
							
			}
		    sortedGroupFinalList1=[];
			temp_length=sortedGroupFinalList.length;
			
		
			for(i=temp_length-1;i>=0;i--){
				sortedGroupFinalList1.push(sortedGroupFinalList[i]);
	
			}
			sortedGroupFinalList=[];
			sortedGroupFinalList=sortedGroupFinalList1;
			
	 } 
	    
	   
   	  worstFitItemListFinal=worstFitItemList;
   	  
    	exportGroupList=sortedGroupFinalList;
     	exportItemList=worstFitItemListFinal;
	   
	   
 }
 
   
worstFitGroupListFinal1=[]
worstFitItemListFinal1=[]
   
for(var i=forStart; i<forEnd; i++){
	for(j=0; j<worstFitItemListFinal.length; j++){ 
			if(sortedGroupFinalList[i].id == worstFitItemListFinal[j].group){ 
				worstFitItemListFinal1.push(worstFitItemListFinal[j])
				}
	} 

worstFitGroupListFinal1.push(sortedGroupFinalList[i]);
}

temp=0;
end=forEnd-forStart


if(worstFit){
	for(var i=temp; i<end;  i++){
		   worstFitGroupListFinal1[i].worstCount=temp++;
		 }
}

if(bestFit){
	 temp=0;
	 for(var i=temp; i<end;  i++){
	   worstFitGroupListFinal1[i].bestCount=temp++;
	 }
}
groups.add(worstFitGroupListFinal1)  
items.add(worstFitItemListFinal1) 
var endDate=statusValue[2];
var startDate=statusValue[3];
var container = document.getElementById('visualization');
var options= 
		{
    	    dataAttributes: 'all',
  	        zoomable: true,
  	    	clickToUse: false,
  	    	selectable: false,
  	        editable: false,
  	        stack: false,
  	        showCurrentTime: false,
  	        //start:startDate,
  	        //end:endDate,
  	        orientation:{	
  	        	axis:'both'
  	        }
 		 };
		
 
    	worstFit= document.getElementById("worstFirst").checked;
   	    bestFit= document.getElementById("bestFirst").checked;
   	 
    	if(worstFit){ 		
    		options["groupOrder"]="worstCount";
    		}
    	if(bestFit){
    		options["groupOrder"]="bestCount";
    	}
    
    var timeline = new vis.Timeline(container, items, groups, options); 
   
      	paginationStatus();
  
	
	<!-- //////////Timeline range////////// -->
	
	

}


function pagination(value) {
	document.getElementById('visualization').innerHTML = "";
     var items = new vis.DataSet({
          type: { start: 'Moment', end: 'Moment' }
      }); 
     var groups = new vis.DataSet();
     groups.add(reportGroup);
     items.add(reportItem);
     var container = document.getElementById('visualization');
     var options = {
    
         zoomable: false,
      	   clickToUse: true,
          editable: false,
          stack: false
      };

      var timeline = new vis.Timeline(container, items, groups, options);
      
      function onClick (event) {
      	  var properties = timeline.getEventProperties(event);
      	  if(properties.item){
      		  for (i = 0; i < reportItem.length; i++) { 
  			    if(properties.item ==reportItem[i].id){
  			    	if(reportItem[i].className == 'negative'){
  			    		document.getElementById('light').style.display='block';document.getElementById('fade').style.display='block';
  			    	}
  			    }
  			  }
      		  
      	  }
      	  
      	}
      	container.addEventListener('click', onClick) ;  	
      	paginationStatus();

}


var paginationStatus=function(){

	$.ajax({
		url : "/paginationStatus",
		async: false,
        cache: false,
		success : function(data) { 
					status=data;		
					statusValue=[];
					var nextStatus;
					var previousStatus;
					statusValue =status.split(',');
					loadvalue.push(statusValue);
					 var actual=reportGroup.length;
					 var actualLength=Math.ceil(actual/25);
					if(currentcount == actualLength && actualLength != 1){
						document.getElementById("next").disabled=true;
						document.getElementById("previous").disabled=false;
						
					}else if(currentcount==1 && actualLength > 1){
						document.getElementById("next").disabled=false;
						document.getElementById("previous").disabled=true;
					}else if(currentcount==1 && actualLength == 1){
						document.getElementById("next").disabled=true;
						document.getElementById("previous").disabled=true;
					}else{
						document.getElementById("next").disabled=false;
						document.getElementById("previous").disabled=false;
					}

		
					var today = new Date();
					var dd = today.getDate();
					var mm = today.getMonth()+1; //January is 0!
					var yyyy = today.getFullYear();
					if(dd<10){
					    dd='0'+dd
					} 
					if(mm<10){
					    mm='0'+mm
					} 
					var fromDate = dd+'/'+mm+'/'+yyyy;
					document.getElementById("currentDate").value = fromDate;					
		}
	
		
	});
	
}
function exportToExcel(){
	
				$("#filterListTable tr").remove();
				 		
									   	var tr=[];
										tr.push("<tr>");
										
										tr.push("<th>Start Date</th>");
										tr.push("<th>End  Date</th>");
										
										tr.push("<th>Company Serial No</th>");
										tr.push("<th>manufacture Part No</th>");
										tr.push("<th>Company PartNo</th>");
										tr.push("<th>manufacture Serial No</th>");
										tr.push("<th>Classification</th>");
										tr.push("<th>Description</th>");
										tr.push("<th>Tail No</th>");
										tr.push("<th>Fleet No</th>");
										tr.push("<th>Sub-Fleet No</th>");
										tr.push("<th>ATA System No</th>");
										tr.push("<th>status</th>");
								
										
									
										tr.push("<th>Installation Date</th>");
										tr.push("<th>Installation Station</th>");
										tr.push("<th>Installation Department</th>");
										
										
				
										tr.push("<th>Removal Date</th>");
										tr.push("<th>Removal Station</th>");
										tr.push("<th>Removal Department</th>");
										tr.push("<th>Removal Reason</th>");
										tr.push("<th>Repair Date</th>");
										tr.push("<th>Repair Station</th>");
										tr.push("<th>Repair Department</th>");
										tr.push("<th>Repair Service Order Number</th>");
					
										tr.push('</tr>');
													
									
										
										
										
										
	//			console.log(JSON.stringify(exportItemList))
				  for(var i=0; i<exportGroupList.length; i++){ 
							for(j=0 ; j<exportItemList.length; j++){ 		
									if(exportGroupList[i].id == exportItemList[j].group){ 
										var title=[];
										var title_content=[];
										tr.push('<tr">');
										
										tr.push("<td>"+exportItemList[j].start+"</td>");
										tr.push("<td>"+exportItemList[j].end+"</td>");
										tr.push("<td>"+exportGroupList[i].cmpySerialNo+"</td>");
										tr.push("<td>"+exportGroupList[i].mfgPartNo+"</td>");
										tr.push("<td>"+exportGroupList[i].companyPartNo+"</td>");
										tr.push("<td>"+exportGroupList[i].mnfgSerialNo+"</td>");
										tr.push("<td>"+exportGroupList[i].classification+"</td>");
										tr.push("<td>"+exportGroupList[i].description+"</td>");
										tr.push("<td>"+exportGroupList[i].tailNo+"</td>");
										tr.push("<td>"+exportGroupList[i].fleetNo+"</td>");
										tr.push("<td>"+exportGroupList[i].subfleetNo+"</td>");
										tr.push("<td>"+exportGroupList[i].ataSystemNo+"</td>");
										tr.push("<td>"+exportGroupList[i].status+"</td>");
										
										
										
								
										
										
										
									if(exportItemList[j].content == ""){
										
										
										if(exportItemList[j].title != null){
										title=(exportItemList[j].title).split("<br/>");
										
										for(z=0;z<title.length;z++){
											
										title_content[z]=title[z].split(":")
										}
										for(k=5;k<title_content.length;k++){
											tr.push("<td>"+title_content[k][1]+"</td>");
										}
									}else{
										for(k=0;k<2;k++){
										tr.push("<td> </td>");	
										}
										
									}
									} if(exportItemList[j].content != ""){
										for(k=0;k<3;k++){
											tr.push("<td> </td>");	
											}
										title=(exportItemList[j].content).split("<br/>");
										for(z=0;z<title.length;z++){
											
										title_content[z]=title[z].split(":")
										}
										console.log(JSON.stringify(title_content))
										for(k=3;k<title_content.length-1;k++){
											tr.push("<td>"+title_content[k][1]+"</td>");
											
										}
									} 
									
										tr.push('</tr>');
							}

					   } 
				  }
	
					$('table[id=filterListTable]').append($(tr.join('')));
fnExcelReport() ;
}


function fnExcelReport() {

    var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';

    tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';

    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';

    tab_text = tab_text + "<table border='1px'>";
    tab_text = tab_text + $('#filterListTable').html();
    tab_text = tab_text + '</table></body></html>';

    var data_type = 'data:application/vnd.ms-excel';
    
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([tab_text], {
                type: "application/csv;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, 'Test file.xls');
        }
    } else {
        $('#test').attr('href', data_type + ', ' + encodeURIComponent(tab_text));
        $('#test').attr('download', 'Test file.xls');
    }

}



var onloadGetData = function(){
	var actualData=getParameterByName("actualData",window.location.href);
	var dataType=getParameterByName("dataType",window.location.href);
	var toDate=getParameterByName("toDate",window.location.href);
	var fromDate=getParameterByName("fromDate",window.location.href);
	var pageType=getParameterByName("pageType",window.location.href);
	setDateRange(fromDate,toDate);
	fmDate=fromDate;
	
	if(pageType == "splash"){
		
	$.ajax({
			 url : "/navigationToRemoval-ui",
			data:{actualData: actualData,dataType: dataType,fromDate: fromDate,toDate: toDate},
	         success : function(data) { 
	       componentIdsList = data
	       
	       
	       
	       
	       	pageStatus=data.pageStatus;
	   	if(pageStatus!=null){
	   		document.getElementById("selectedItem").innerHTML= pageStatus;
	   		document.getElementById("description").style.display='block';
	   		document.getElementById("filterName").style.display='none';
	   		
	   		}
	   	else{
	   		
	   		document.getElementById("selectedFilter").innerHTML= "";
	   		document.getElementById("description").style.display='none';
	   		document.getElementById("filterName").style.display='block';

	   		
	        }
	       
	   	componentIdlist=data.componentIds;
	
 	       removal(componentIdlist);
	         
	         
	         },
	         error: function(data){
	        	 console.log(JSON.stringify(data));
	         }
	         
	  }); 
	
	}
	if(pageType == "filter"){
		var componentIds=[];
		componentIds=actualData.split(",");
		var temp=[];
		for(var k=0;k<componentIds.length;k++){
			temp[k]=componentIds[k];
		}

       	pageStatus=dataType;
   	if(pageStatus!=null){
   		
   		document.getElementById("selectedFilter").innerHTML=pageStatus;
   		document.getElementById("description").style.display='none';
   		document.getElementById("filterName").style.display='block';
   		

   		}
   	else{
   		
   		document.getElementById("selectedItem").innerHTML= "";
   		document.getElementById("description").style.display='block';
   		document.getElementById("filterName").style.display='none';   		
        }
       
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		 removal(temp);
	}
	
	
	
} 

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function setDateRange(fromDate,toDate){
	var tempFrom=fromDate.split("-");
	fromDate=tempFrom[2]+"/"+tempFrom[1]+"/"+tempFrom[0];
	var tempTo=toDate.split("-");
	toDate=tempTo[2]+"/"+tempTo[1]+"/"+tempTo[0];
	document.getElementById("dateRange").value = fromDate+" - "+toDate;

}