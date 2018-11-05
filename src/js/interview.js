window.__MAJOR_CODE__ = {
	"content":"CT",
	"design":"DS",
	"programming":"PG",
	"marketing":"MK"
};
window.__MAJOR__ = null;
window.annoucementListTableReady = false;
window.__onAnnoucementDataTableReady__ = null;

$(document).ready(function(){
	setTimeout(function(){
		$(".loading-screen:visible").fadeOut();
	}, 15000);

	$("#ica__question__readmore").click(function(e){
		$(".ica__question__wrapper").toggleClass("expanded");
		e.preventDefault();
	});

	$("a[href^='#detail-major']").click(function(e){ onRequestResult(this.hash) });
	if(window.location.hash.indexOf("#detail-major=") !== -1 ) onRequestResult(window.location.hash);
	
	$('#annoucement__list').on('error.dt', function (e, settings, techNote, message) {
		alert("ขออภัย ขณะนี้ยังไม่มีผลการคัดเลือกของสาขานี้ ");
		hideDisplayResult();
		console.log('An error has been reported by DataTables: ', message);
	});
	$.fn.dataTable.ext.errMode = 'none';

	window.annoucementListTable = $('#annoucement__list').DataTable({
		//'deferRender': false,
		"responsive": true,
		"pageLength": 100,
		'ajax'       : {
			"type"   : "GET",
			"deferLoading": 0,
			"cache": true,
			"url"	: "data:application/json;base64,W10=",
			"dataSrc": function (json) {
				var return_data = new Array();
				if(!json.length)
					return [];

				for(var i=0;i< json.length; i++){
					var name;
					if(!!json[i].firstName){
						name = json[i].firstName + ' ' + json[i].lastName;
					}else{
						name = json[i].firstNameEN + ' ' + json[i].lastNameEN;
					}

					return_data.push({
						'code': window.__MAJOR_CODE__[window.__MAJOR__] + (String(i + 1).padStart(2, '0')),
						'name' : name
					})
				}
				return return_data;
			}
		},
		"columns"    : [
			{'data': 'code'},
			{'data': 'name'}
		],
		"fnInitComplete": function(oSettings, json) {
			window.annoucementListTableReady = true;
			if(!!window.__onAnnoucementDataTableReady__)
				window.__onAnnoucementDataTableReady__();
		},
		"drawCallback": function( settings ) {
			var api = this.api();
			var currentShownData = api.rows( {page:'current'} ).data();

			if(currentShownData.length){
				onDisplayResult(window.__MAJOR__);
			}else{
				hideDisplayResult();
			}
		}
	});

	function hideDisplayResult(){
		$(".ica__question__major.active").removeClass("active");
		$(".ica__question__readmore").show();
		$(".ica__question__wrapper").removeClass("active");
		$(".annoucement__container").hide();
	}

	function onDisplayResult(major){
		$(".ica__question__major.active:not(."+major+")").removeClass("active");
		$(".ica__question__major."+major).addClass("active");
		if($(".ica__question__major."+major).hasClass("ica__question__major--no-expand"))
			$(".ica__question__readmore").hide();
		else
			$(".ica__question__readmore").show();
		$(".ica__question__wrapper").addClass("active");
		$(".annoucement__container").show();
		$("#annoucement__list").css("width", "100%");
	}

	function onRequestResult(hashValue){
		var major = hashValue.replace('#detail-major=', '');
		if(!major || !window.__MAJOR_CODE__[major])
			return;
		window.__MAJOR__ = major;
		console.log("onRequestResult", major);
		window.__onAnnoucementDataTableReady__ = function(){
			window.annoucementListTable.ajax.url( "/interview-list/ywc16-interview-"+window.__MAJOR__+"-candidate.json" ).load();
		}
		if(!!window.annoucementListTableReady)
			window.__onAnnoucementDataTableReady__();
	}
});
$(window).on("load", function() {
	$(".loading-screen").fadeOut();
});