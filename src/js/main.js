$(document).ready(function() {
  // Guru change
  var next = $(".guru__child:first").next(":first");
  setInterval(function() {
    var pic = next.children(":first").attr("src");
    var name = next.children(":first").attr("name");
    var corp = next.children(":first").attr("corp");

    $(".guru__child.active").removeClass("active");
    next.addClass("active");

    $(".js--guru_fade").fadeOut(200, function() {
      $(".guru__main__pic__img").attr("src", pic);
      $(".guru__main__info__name").text(name);
      $(".guru__main__info__corp").text(corp);
      $(".js--guru_fade").fadeIn(200);
    });
    next = next.next(":first");
    if (next.length === 0) {
      next = $(".guru__child:first");
    }
  }, 5000);

  function showHideQuestion(parentElem){
    if (parentElem.hasClass("active")) {
      parentElem.removeClass("active");
    } else {
      $(".faq__question.active").removeClass("active");
      parentElem.addClass("active");
    }
  }

  $(".faq__question--header").click(function(e) {
    e.preventDefault();
    showHideQuestion($(this).parent());
  });
  $(".faq__question").click(function(e) {
    e.preventDefault();
    if(!$(this).hasClass("active"))
      showHideQuestion($(this));
  });

  $(".guru__child").click(function() {
    var pic = $(this)
      .children(":first")
      .attr("src");
    var name = $(this)
      .children(":first")
      .attr("name");
    var corp = $(this)
      .children(":first")
      .attr("corp");

    $(".guru__child.active").removeClass("active");
    $(this).addClass("active");

    $(".js--guru_fade").fadeOut(200, function() {
      $(".guru__main__pic__img").attr("src", pic);
      $(".guru__main__info__name").text(name);
      $(".guru__main__info__corp").text(corp);
      $(".js--guru_fade").fadeIn(200);
    });
  });
});
