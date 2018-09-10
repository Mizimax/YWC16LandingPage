var guruInterval;
$(function() {
  $(".loading-screen").fadeOut();
});

$(document).ready(function() {
  var scroll = new SmoothScroll('a[href*="#"]');

  $(window).scroll(function(e) {
    var whatisywc = $("#whatisywc").offset().top - 50;
    var register = $("#register").offset().top - 50;
    var timeline = $("#timeline").offset().top - 50;
    // var location = $("#location").offset().top - 50;
    var guru = $("#guru").offset().top - 50;
    var gallery = $("#gallery").offset().top - 50;
    var sponsor = $("#sponsor").offset().top - 50;
    var qa = $("#qa").offset().top - 50;

    var current = "";

    if ($(this).scrollTop() > qa && current !== "qa") {
      current = "qa";
      $(".navbar__sidenav__menu li.active").removeClass("active");
      $("#qa-nav").addClass("active");
    } else if ($(this).scrollTop() > sponsor && current !== "sponsor") {
      current = "sponsor";
      $(".navbar__sidenav__menu li.active").removeClass("active");
      $("#sponsor-nav").addClass("active");
    } else if ($(this).scrollTop() > gallery && current !== "gallery") {
      current = "gallery";
      $(".navbar__sidenav__menu li.active").removeClass("active");
      $("#gallery-nav").addClass("active");
    } else if ($(this).scrollTop() > guru && current !== "guru") {
      current = "guru";
      $(".navbar__sidenav__menu li.active").removeClass("active");
      $("#guru-nav").addClass("active");
    } else if ($(this).scrollTop() > location && current !== "location") {
      current = "location";
      $(".navbar__sidenav__menu li.active").removeClass("active");
      $("#location-nav").addClass("active");
    } else if ($(this).scrollTop() > timeline && current !== "timeline") {
      current = "timeline";
      $(".navbar__sidenav__menu li.active").removeClass("active");
      $("#timeline-nav").addClass("active");
      // } else if ($(this).scrollTop() > register && current !== "register") {
      //   current = "register";
      //   $(".navbar__sidenav__menu li.active").removeClass("active");
      //   $("#register-nav").addClass("active");
    } else if ($(this).scrollTop() > whatisywc && current !== "whatisywc") {
      current = "whatisywc";
      $(".navbar__sidenav__menu li.active").removeClass("active");
      $("#whatisywc-nav").addClass("active");
    }
  });

  $(".navbar__sidenav__menu li").click(function() {
    $(".navbar__sidenav__menu li.active").removeClass("active");
    $(this).addClass("active");
  });
  // Change main video
  function changeVideoSrc(resolution) {
    // Detect video support
    // src: https://davidwalsh.name/detect-supported-video-formats-javascript
    var videoObj = $("#header-video"),
      videoExtension = "mp4";
    if (videoObj[0].canPlayType('video/webm; codecs="vp9"') == "probably") {
      videoExtension = "webm";
    }

    videoObj.attr(
      "src",
      "videos/cityanimate-" + resolution + "p." + videoExtension
    );
    videoObj[0].load();
    setTimeout(function() {
      videoObj[0].load();
      $("#header-video").trigger("play");
    }, 500);
  }

  var windowSize = $(window).width();
  if (windowSize > 720) changeVideoSrc(1080);
  else if (windowSize > 480) changeVideoSrc(720);
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

  // Guru change
  var nextEle = $(".guru__child:first").next(":first");
  var setGuruInterval = function(next) {
    var guruInterval = setInterval(function() {
      var pic = next.attr("src");
      var name = next.attr("name");
      var corp = next.attr("corp");

      $(".guru__child.active").removeClass("active");
      next.addClass("active");

      $(".js--guru_fade").fadeOut(200, function() {
        $(".guru__main__pic").css("background-image", "url(" + pic + ")");
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
    var pic = $(this).attr("src");
    var name = $(this).attr("name");
    var corp = $(this).attr("corp");

    $(".guru__child.active").removeClass("active");
    $(this).addClass("active");

    $(".js--guru_fade").fadeOut(200, function() {
      $(".guru__main__pic").css("background-image", "url(" + pic + ")");
      $(".guru__main__info__name").text(name);
      $(".guru__main__info__corp").text(corp);
      $(".js--guru_fade").fadeIn(200);
    });

    clearInterval(guruInterval);
    var nextEle = $(this).next(":first");
    guruInterval = setGuruInterval(nextEle);
  });

  $("#carousel").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    autoplay: true,
    autoplaySpeed: 4000,
    asNavFor: "#carousel-nav"
  });
  $("#carousel-nav").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: "#carousel",
    dots: false,
    centerMode: true,
    focusOnSelect: true
  });
});
