var guruInterval;

$(document).ready(function() {
  // Change main video 
  function changeVideoSrc(resolution){
    // Detect video support
    // src: https://davidwalsh.name/detect-supported-video-formats-javascript
    var videoObj = $("#header-video"),
        videoExtension = "mp4";
    if(videoObj[0].canPlayType('video/webm; codecs="vp9"') == "probably"){
      videoExtension = "webm";
    }

    videoObj.attr("src", "videos/cityanimate-"+resolution+"p."+videoExtension);
  }

  var windowSize = $(window).width();
  if(windowSize > 720) changeVideoSrc(1080);
  else if(windowSize > 480) changeVideoSrc(720);
  else changeVideoSrc(480);

  function showHideQuestion(parentElem) {
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
    if (!$(this).hasClass("active")) showHideQuestion($(this));
  });

  // Guru change
  var nextEle = $(".guru__child:first").next(":first");
  var setGuruInterval = function(next) {
    var guruInterval = setInterval(function() {
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
    return guruInterval;
  };

  guruInterval = setGuruInterval(nextEle);

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

    clearInterval(guruInterval);
    var nextEle = $(this).next(":first");
    guruInterval = setGuruInterval(nextEle);
  });
  window.carousels = bulmaCarousel.attach();
});
