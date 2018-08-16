$(document).ready(function(){
	$(".faq__question--header").click(function(e){
		e.preventDefault();

		var parentElem = $(this).parent();
		if(parentElem.hasClass("active")){
			parentElem.removeClass("active");
		}else{
			$(".faq__question.active").removeClass("active");
			parentElem.addClass("active");
		}
	});
});