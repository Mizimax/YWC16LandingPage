try{
	window.__MAJOR_CODE__ = {
		"content":"CT",
		"design":"DS",
		"programming":"PG",
		"marketing":"MK"
	};
	window.__MAJOR__ = null;
	window.annoucementListTableReady = false;
	window.__onAnnoucementDataTableReady__ = null;

	window.addEventListener("pageshow", function() {
		$(".loading-screen").fadeOut().css("opacity", "0");
	}, false);


	$(document).ready(function(){
		setTimeout(function(){
			$(".loading-screen:visible").stop( true, false ).fadeOut().css("opacity", "0");
		}, 15000);

		$("#annoucement__question__readmore").click(function(e){
			$(".annoucement__question__wrapper").toggleClass("expanded");
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
			"dom": '<"toolbar">frtip',
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
							'code': json[i].ref,
							'name' : name,
							'round': json[i].round
						})
					}
					return return_data;
				}
			},
			"columns"    : [
				{'data': 'code', "width": "2rem"},
				{'data': 'name'},
				{'data': 'round', "width": "1rem"}
			],
			"fnInitComplete": function(oSettings, json) {
				window.annoucementListTableReady = true;
				if(!!window.__onAnnoucementDataTableReady__)
					window.__onAnnoucementDataTableReady__();
			},
			"drawCallback": function( settings ) {
				var api = this.api();
				var currentShownData = api.rows( {page:'current'} ).data();

				if(currentShownData.length)
					onDisplayResult(window.__MAJOR__);
			}
		});

		function hideDisplayResult(){
			$(".annoucement__question__major.active").removeClass("active");
			$(".annoucement__question__wrapper").removeClass("active");
			$(".annoucement__container").hide();
			$(".loading-screen:visible").stop( true, false ).fadeOut();
		}

		function onDisplayResult(major){
			$(".annoucement__question__major.active:not(."+major+")").removeClass("active");
			$(".annoucement__question__major."+major).addClass("active");
			$(".annoucement__question__wrapper").addClass("active");
			$(".annoucement__container").show();
			$("#annoucement__list_wrapper .toolbar").html("<h3>รายชื่อผู้มีสิทธิ์สัมภาษณ์ สาขา "+major+"</h3>");
			$("#annoucement__list").css("width", "100%");
			$("#main").animate({
		        scrollTop: 0
		    }, 1);
		    $("#main").animate({
		        scrollTop: $("#annoucement__list").offset().top - ($(window).height() * 0.05)
		    }, 500);
		    window.annoucementListTable.columns.adjust();
			$(".loading-screen:visible").stop( true, false ).fadeOut();
		}

		function onRequestResult(hashValue){
			var major = hashValue.replace('#detail-major=', '');
			if(!major || !window.__MAJOR_CODE__[major])
				return;
			window.__MAJOR__ = major;
			console.log("onRequestResult", major);

			hideDisplayResult();
			$(".loading-screen").fadeIn();
			window.__onAnnoucementDataTableReady__ = function(){
				window.annoucementListTable.ajax.url( "/interview-list/interview-"+window.__MAJOR__+".json" ).load();
			}
			if(!!window.annoucementListTableReady)
				window.__onAnnoucementDataTableReady__();
		}

		hideDisplayResult();
	});
	$(window).on("load", function() {
		$(".loading-screen").stop( true, false ).fadeOut().css("opacity", "0");
	});
}catch(error) {
	alert("Error: " + error.message);
}