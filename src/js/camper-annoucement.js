try{
	window.__MAJOR_CODE__ = {
		"CT":"content",
		"DS":"design",
		"PG":"programming",
		"MK":"marketing"
	};

	window.__INTERVIEWEE_LIST__ = new Array();

	var onWebloadReady = function(){
		$('#annoucement__list').on('error.dt', function (e, settings, techNote, message) {
			alert("ขออภัย ขณะนี้ยังไม่มีผลการคัดเลือก");
			console.log('An error has been reported by DataTables: ', message);
		});
		$.fn.dataTable.ext.errMode = 'none';

		if(!window.annoucementListTable){
			window.annoucementListTable = $('#annoucement__list').DataTable({
				'deferRender': true,
				"responsive": {
			        details: {
		                display: $.fn.dataTable.Responsive.display.childRowImmediate,
		                type: ''
		            }
				},
				"autoWidth": false,
				"pageLength": 100,
				"dom": '<"toolbar">frtip',
				'ajax'       : {
					"type"   : "GET",
					"deferLoading": 1,
					/* "cache": true, */
					"url"	: "/interview-list/finalist-annoucement.json",
					"dataSrc": function (json) {
						var return_data = new Array();
						if(!Object.keys(json).length)
							return [];

						for(i in json){
							var name;
							if(!!json[i].firstName){
								name = json[i].firstName + ' ' + json[i].lastName;
							}else{
								name = json[i].firstNameEN + ' ' + json[i].lastNameEN;
							}

							if(!!json[i].nickname)
								name += ' (' + json[i].nickname + ')';

							var money = Number(json[i].verificationAmount || 0.0 ).toFixed(2);
							if(money == "0.00") money = "";

							var majorCode = json[i].interviewRef.substr(0, 2);

							if(!!json[i].isReservation || !!json[i].isFinalist){
								return_data.push({
									'no': json[i].no,
									'code': json[i].interviewRef,
									'name' : name,
									'major': getMajorName(majorCode),
									'type': (json[i].isFinalist ? "ตัวจริง" : "สำรอง"),
									'money': money
								});
							}

							window.__INTERVIEWEE_LIST__.push({
								'no': json[i].no,
								'code': json[i].interviewRef,
								'name' : name,
								'firstName': json[i].firstName,
								'major': getMajorName(majorCode),
								'majorCode': majorCode,
								'isPass': (!!json[i].isReservation || !!json[i].isFinalist),
								'isFinal': json[i].isFinalist || false,
								'money': money
							});
						}
						return return_data;
					}
				},
				"columns"    : [
					/*{'data': 'code'},
					{'data': 'name'},
					{'data': 'major'},
					{'data': 'type'},
					{'data': 'money'}*/
					{'data': 'no', 'width':"1rem"},
					{'data': 'code', 'width':"3rem"},
					{'data': 'name'},
					{'data': 'major', 'width':"8rem"},
					{'data': 'type', 'width':"4rem"},
					{'data': 'money', 'width':"5rem"}
				],
				"order": [
					[ 0, "asc" ]
				],
				"columnDefs": [
		            { responsivePriority: 1, targets: 0 },
		            { responsivePriority: 2, targets: 4 }
		        ],
				"fnInitComplete": function(oSettings, json) {
					$("#annoucement__list_wrapper .toolbar").html("<h3>รายชื่อผู้ผ่านการคัดเลือก</h3>");
					$(".loading-screen:visible").stop( true, false ).fadeOut().css("opacity", "0");
				}
			});
		}

		$("#camper-search").submit(function(e){
			e.preventDefault();
			var queryString = $("#ca__search--q").val();
			console.log("queryString", queryString);
			if(!queryString){
				return true;
			}
			$("#ca__search--q").val('');
			for (var i = 0; i < window.__INTERVIEWEE_LIST__.length; i++) {
				if(
					window.__INTERVIEWEE_LIST__[i].code.toUpperCase() == queryString.toUpperCase() || 
					window.__INTERVIEWEE_LIST__[i].name.toUpperCase() == queryString.toUpperCase()
				){
					onCamperFound(window.__INTERVIEWEE_LIST__[i]);
					return true;
				}
			}

			$("#ca__search--q").val('');
			alert("ขออภัย ไม่พบข้อมูลที่ท่านระบุในฐานข้อมูล กรุณาตรวจสอบข้อมูลของท่านอีกครั้ง");
			return true;
		});

		$(".ca--viewall").click(function(e){
			switchCASection("annoucement");
			e.preventDefault();
		});

		$(".ca_header--back").click(function(e){
			e.preventDefault();
			switchCASection("search");
		});
	};

	var switchCASection = function(section, fadeIn){
		if(fadeIn !== false)
			$(".loading-screen:hidden").fadeIn(100);
		setTimeout(function(){
			if(section == "search")
				$(".ca_header--back").hide();
			else
				$(".ca_header--back").show();

			$(".ca_section.active:not('.ca--"+section+"')").removeClass("active");
			$(".ca_section.ca--"+section).addClass("active");

			if(section == "annoucement"){
				window.annoucementListTable.responsive.recalc();
			}

			$(".loading-screen:visible").fadeOut("fast");
		}, 500);
		
		$("#ca__search--q").val('');
		window.annoucementListTable.search('').columns().search('').draw();
	}

	var onCamperFound = function(camperInfo){
		$(".loading-screen:hidden").fadeIn(100);
		$(".ca__result .ca__result--formlink").attr("href", 
			"https://docs.google.com/forms/d/e/1FAIpQLScXCTEYyCSkYbTz4Z9b_oCp6CCJtVoyQSJBIhN-vxiZ_Rjl3Q/viewform"+
				"?entry.2109165281="+encodeURI(camperInfo.code)+
				"&entry.1969642560="+encodeURI(camperInfo.name)+
				"&entry.529485388="+encodeURI(camperInfo.money)
		);
		$(".ca__result .ca__result--code").text(camperInfo.code);
		$(".ca__result .ca__result--name").text(camperInfo.name);
		$(".ca__result .ca__result--major").text(camperInfo.major);
		$(".ca__result .ca__result--money_amt").text(camperInfo.money);
		if(!!camperInfo.isPass){
			if(!!camperInfo.isFinal){
				$(".ca_section.ca--pass.ca--reserve").removeClass("ca--reserve");
				$(".ca_section.ca--pass").addClass("ca--real");
			}else{
				$(".ca_section.ca--pass.ca--real").removeClass("ca--real");
				$(".ca_section.ca--pass").addClass("ca--reserve");
			}
			switchCASection("pass", false);
		}else{
			switchCASection("fail", false);
		}
	}

	function getMajorName(majorCode){
		return window.__MAJOR_CODE__[majorCode] || "";
	}

	window.addEventListener("pageshow", function() {
		onWebloadReady();
	}, false);

	$(document).ready(function(){
		setTimeout(function(){
			onWebloadReady();
		}, 15000);
	});
	$(window).on("load", function() {
		onWebloadReady();
	});
}catch(error) {
	alert("Error: " + error.message);
}