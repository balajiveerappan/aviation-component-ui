var step;
var currentcount;
var forStart;
var forEnd;
var worstFitGroupList=[];
var worstFitItemList=[];
var worstFitGroupListFinal=[]
var statusValue=[];
var worstFitItemListFinal=[]
function component(){
	
	window.location="Unit_Filter.html";
	
}
function splashScreen(){
window.location="Splash_Screen.html";
}
// Instantiate our timeline object.
function printDiv(divName) {
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
}
var report={};

var removal=function(step1){
	////alert("report call")
	$.ajax({
		url : "/removalReport",
		async: false,
        cache: false,
		success : function(data) { 
			report=data;
			step=0;
			forStart=0;
			forEnd=0;
			currentcount=0;

			
			onPageLoad(step)	
		}
	
		
	});
	
}

function onChangeRadioButton(){
	document.getElementById('visualization').innerHTML = "";
  	  
     onPageLoad('0');
  
	}

function onPageLoad(value){
step=value;
var temp=0;

  document.getElementById("visualization").innerHTML = "";
	 
  paginationStatus();
  
  $('input[name="instperbar"],input[name="remperbar"]').unbind().click(function(){
		if($(this).attr('checked')){
		//console.log('block1');
		$(this).attr('checked',false);
		}
		else{
		$(this).attr('checked','checked');
		//console.log('block2');
		}
		
});
 
 
$('input[name="instperbar"]').click(function(){
	var sample=document.getElementById("instperbar");
	//alert("checked status"+sample);
	filterlogic();
		
		//alert("checked status"+sample);
		
console.log('filter applied');
})

$('input[name="remperbar"]').click(function(){
		
    	//alert("checked status"+document.getElementById("remperbar"));
		filterlogic();
		
       console.log('filter applied');
})
  
	<!-- ***************Start of Filter logic for chart selection***************	 -->
	function filterlogic(){

		 if($('input[name="instperbar"]').attr('checked') === 'checked' && ($('input[name="remperbar"]').attr('checked') == false || $('input[name="remperbar"]').attr('checked') == undefined)){
			 $('.triangleImage').css('display','none');
			$('.vis-item-overflow,.vis-range,.vis-item.vis-background.positive').css('display','block');
				console.log('show bars');
			} 
		  if(($('input[name="instperbar"]').attr('checked')== false || $('input[name="instperbar"]').attr('checked') == undefined) && $('input[name="remperbar"]').attr('checked')== 'checked'){
			
				$('.vis-item-overflow,.vis-range,.vis-item.vis-background.positive').css('display','none');
				//$('.vis-item.vis-background.grph_bcircle,.vis-item.vis-background.grph_ycircle,.vis-item.vis-background.negative,.triangleImage').css('display','block');
				 $('.triangleImage').css('display','block');
				console.log('show triangle');
			}
		 if($('input[name="instperbar"]').attr('checked')== 'checked' && $('input[name="remperbar"]').attr('checked')=='checked'){	
			 //$('.vis-item-overflow,.vis-range,.vis-item.vis-background.positive').css('display','block');
			$('.vis-item-overflow,.vis-range,.vis-item.vis-background.positive').css('display','block');	
			 $('.triangleImage').css('display','block');
							console.log('show all');
		}
		
		if(($('input[name="instperbar"]').attr('checked')== false || $('input[name="instperbar"]').attr('checked') == undefined) && ($('input[name="remperbar"]').attr('checked') == false || $('input[name="remperbar"]').attr('checked') == undefined)){
				$('.vis-item-overflow,.vis-range,.vis-item.vis-background.grph_bcircle,.vis-item.vis-background.negative,.vis-item.vis-background.positive,.vis-item.vis-background.grph_ycircle,.triangleImage').css('display','none');
				console.log('show none');
		}  
	}
	<!-- ***************End of Filter logic for chart selection***************	 -->
  
  
  // Create a DataSet (allows two way data-binding)
   var items = new vis.DataSet({
        type: { start: 'Moment', end: 'Moment' }
    }); 
   var groups = new vis.DataSet();
  
   var length=report.groupList.length;
   if(forEnd==length){
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
   for(var i=0; i<report.groupList.length; i++){
	   
	   bestCount=0
	   worstCount= report.groupList.length
   			for(j=0 ; j<report.itemList.length; j++){ 
   				
	     			if(report.groupList[i].id ==report.itemList[j].group){ 
	     				if(report.itemList[j].content!=""){
	     					       bestCount++
	     					       worstCount--
	     					   }
	     				}
	   		}
	    groups1={}  
	    groups1["id"]=report.groupList[i].id;
	    groups1["bestCount"]=bestCount;
	    groups1["worstCount"]=worstCount;
	    groups1["content"]=report.groupList[i].content;
	    worstFitGroupList.push(groups1);
	    	if(temp<bestCount){
	    		temp=bestCount;
	    	}
	   }

   for(var i=0; i< worstFitGroupList.length; i++){
   			for(j=0 ; j<report.itemList.length; j++){ 
   				
	     			if(worstFitGroupList[i].id ==report.itemList[j].group){ 
	     				   
	     				items1={}
	     				items1["id"]=report.itemList[j].id
	     				items1["content"]=report.itemList[j].content
	     				items1["start"]=report.itemList[j].start
	     				items1["end"]= report.itemList[j].end
	     				items1["group"]= report.itemList[j].group
	     				items1["className"]= report.itemList[j].className
	     				items1["type"]= report.itemList[j].type
	     				items1["title"]= report.itemList[j].title
	     				worstFitItemList.push(items1)
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
 }
  }

 if(bestFit) {
	 for(var k=0;k<=temp; k++){
		   
		   for(var i=0; i<worstFitGroupList.length; i++){
				if(worstFitGroupList[i].bestCount == k){
		    worstFitGroupListFinal.push(worstFitGroupList[i]);
				}
		   }
	 }
	   
 }
 
   worstFitItemListFinal=worstFitItemList;
   
   
   }

worstFitGroupListFinal1=[]
worstFitItemListFinal1=[]
   
 for(var i=forStart; i<forEnd; i++){
   			for(j=0 ; j<worstFitItemListFinal.length; j++){ 
	     			if(worstFitGroupListFinal[i].id ==worstFitItemListFinal[j].group){ 
	     				items1={}
	     				items1["id"]=worstFitItemListFinal[j].id
	     				items1["content"]=worstFitItemListFinal[j].content
	     				items1["start"]=worstFitItemListFinal[j].start
	     				items1["end"]= worstFitItemListFinal[j].end
	     				items1["group"]= worstFitItemListFinal[j].group
	     				items1["className"]= worstFitItemListFinal[j].className
	     				items1["type"]= worstFitItemListFinal[j].type
	     				items1["title"]= worstFitItemListFinal[j].title
	     				worstFitItemListFinal1.push(items1)
	     				}
	   		} 
	  
	    worstFitGroupListFinal1.push(worstFitGroupListFinal[i]);
	   }
	    groups.add(worstFitGroupListFinal1)  
	    items.add(worstFitItemListFinal1) 

var endDate=statusValue[2];
	    var startDate=statusValue[3];
    alert("end date "+endDate+" start date "+startDate)
    var container = document.getElementById('visualization');
    var options= {
	      
    	     dataAttributes: 'all',
  	       zoomable: false,
  	    	clickToUse: false,
  	    	selectable: false,
  	        editable: false,
  	        stack: false,
  	        showCurrentTime: false,
  	      end:startDate,
  	      end:endDate,
  	        orientation:{
  	        	
  	        	axis:'both'
  	        }
	    };
	
 
    	worstFit= document.getElementById("worstFirst").checked;
   	    bestFit= document.getElementById("bestFirst").checked;
   	 
    	if(worstFit)
    		{ 		
    		options["groupOrder"]="worstCount";
    		}
    	
    	if(bestFit){
    		options["groupOrder"]="bestCount";
    	}
    
    var timeline = new vis.Timeline(container, items, groups, options); 
      	paginationStatus();

}


function pagination(value) {
	document.getElementById('visualization').innerHTML = "";

     var items = new vis.DataSet({
          type: { start: 'Moment', end: 'Moment' }
      }); 
     var groups = new vis.DataSet();
     
   
     groups.add(report.groupList);
     items.add(report.itemList);


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
      		  for (i = 0; i < report.itemList.length; i++) { 
  			    if(properties.item == report.itemList[i].id){
  			    	if(report.itemList[i].className == 'negative'){
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
					 var actual=report.groupList.length;
					 var actualLength=Math.ceil(actual/25);
					 //alert("actual length"+actualLength)
					if(currentcount == actualLength){
						document.getElementById("next").disabled=true;
						document.getElementById("previous").disabled=false;
						
					}else if(currentcount==1){
						document.getElementById("next").disabled=false;
						document.getElementById("previous").disabled=true;
					}else{
						document.getElementById("next").disabled=false;
						document.getElementById("previous").disabled=false;
					}
					
					document.getElementById("dateRange").value = statusValue[0]+" - "+statusValue[1];
					
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