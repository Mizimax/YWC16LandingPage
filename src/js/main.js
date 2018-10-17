var guruInterval;
var branchSelected;
var branchQuestions;

var goToRegis = function() {
  window.location.href =
    "https://register-ywc16.ywc.in.th/major/" + branchSelected;
};

var parseQuestion = function(branch) {
  if (branch === "designer") branch = "design";
  var question = branchQuestions[branch];
  var text = "";

  // Hard coded: Dammit!
  if (branch == "content")
    text +=
      '<div class="question-header"><div>ให้น้องตอบคำถามต่อไปนี้โดยกำหนดสถานการณ์ในฐานะ Content Creator มาให้ โดยอธิบายว่าจะทำคอนเทนต์รูปแบบไหน (ภาพ, บทความ, วิดีโอ หรืออื่น ๆ) เนื้อหาเป็นอย่างไร มีวิธีการสื่อสารแบบไหน เขียนตัวอย่างเนื้อหาที่จะใช้จริงมาพอเข้าใจ</div></div>';
  question.forEach(function(ele, i) {
    text += "<div class='question-header question" + (i + 1) + "'>";
    text += "<div class='question-index'>คำถามข้อที่ " + (i + 1) + "</div>";
    text += "<div>" + ele + "</div>";
    text += "</div>";
  });
  $(".question").html(text);
};

var openModal = function(branch) {
  var scrollBar = window.innerWidth - document.documentElement.clientWidth - 8;
  $("html, body").css("overflowY", "hidden");
  $("#modal-main").css("overflowY", "auto");
  $("html, body").css("marginRight", scrollBar + "px");

  $("#modal-main").addClass("active");
  $(".modal__content.active").removeClass("active");
  $(".modal__web__" + branch).toggleClass("active");
  branchSelected = branch;
  parseQuestion(branch);
};

var closeModal = function() {
  closeDetail();
  $("html, body").css("overflowY", "auto");
  $("html, body").css("marginRight", "0");

  $("#modal-main").removeClass("active");
};

var openConfirmModal = function() {
  $("#modal-confirm").addClass("active");
};

$(window).on("load", function() {
  $(".loading-screen").fadeOut();
});

var closeConfirmModal = function() {
  $("#modal-confirm").removeClass("active");
};

var toggleShowDetail = function() {
  $(".modal__question").toggleClass("active");
  $("#modal-main .modal-container").css("maxHeight", "initial");
  $("#modal-main").css("overflowY", "auto");
};

var closeDetail = function() {
  $(".modal__question").removeClass("active");
};

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
      // } else if ($(this).scrollTop() > location && current !== "location") {
      //   current = "location";
      //   $(".navbar__sidenav__menu li.active").removeClass("active");
      //   $("#location-nav").addClass("active");
    } else if ($(this).scrollTop() > timeline && current !== "timeline") {
      current = "timeline";
      $(".navbar__sidenav__menu li.active").removeClass("active");
      $("#timeline-nav").addClass("active");
    } else if ($(this).scrollTop() > register && current !== "register") {
      current = "register";
      $(".navbar__sidenav__menu li.active").removeClass("active");
      $("#register-nav").addClass("active");
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

  document.querySelector("#header-video").addEventListener(
    "play",
    function(e) {
      $(".header__video__poster").addClass("video-play");
    },
    true
  );

  /*var windowSize = $(window).width();
  if (windowSize > 720) changeVideoSrc(1080);
  else if (windowSize > 480) changeVideoSrc(720);
  else changeVideoSrc(480);*/

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
        $(".guru__main__info__corp").html(corp);
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
      $(".guru__main__info__corp").html(corp);
      $(".js--guru_fade").fadeIn(200);
    });

    clearInterval(guruInterval);
    var nextEle = $(this).next(":first");
    if (nextEle.length === 0) {
      nextEle = $(".guru__child:first");
    }
    guruInterval = setGuruInterval(nextEle);
  });

  $("#carousel").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    autoplay: true,
    autoplaySpeed: 4000,
    asNavFor: "#carousel-nav",
    centerMode: false,
    responsive: [
      {
        breakpoint: 550,
        settings: {
          centerMode: true
        }
      }
    ]
  });
  $("#carousel-nav").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: "#carousel",
    dots: false,
    autoplay: false,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          autoplay: false,
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          autoplay: false,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  });

  //api connect
  $.ajax({
    url: "https://api-test.ywc.in.th/questions",
    methods: "get",
    success: function(res) {
      if (res.status === "success") {
        branchQuestions = res.payload;
      }
    },
    error: function(res) {
      console.log(res);
    }
  });

  //Add registerd stat

  var registerStat = function() {
    $.getJSON("https://api-test.ywc.in.th/users/stat", function(data) {
      if (data.status != "success") return;
      for (var major in data.payload) {
        var registerCnt = data.payload[major];
        if (major == "design") major = "designer";
        var statSelector =
          ".register__branch__" + major + " .register__branch__no__regis";
        $(statSelector).text(registerCnt);
      }
    });
  };

  registerStat();
  setInterval(registerStat, 10 * 1000);

  var bannerList = {
    "160_600.jpg": "160x600 px",
    "300_250.jpg": "300x250 px",
    "300_600.jpg": "300x600 px",
    "468_60.jpg":  "468x60 px" ,
    "600_500_forPantip.jpg":  "600x500 px (สำหรับ Pantip)",
    "720_300.jpg": "720x300 px",
    "728_90.jpg":  "728x90 px",
    "Banner.jpg":  "1024x1024 px (Banner)",
    // "Square.jpg":  "1024x1024 px (Square)"
  };

  var webLocation = window.location.protocol + "//" + window.location.host;
  var bannerLocation = webLocation + "/images/banner/";

  var bannerTemplate = $("#modal-banner .banner-element.banner-element-template").detach();
  $.each(bannerList, function(fileName, description){
    var currBannerElem = bannerTemplate.clone();
    currBannerElem.removeClass("banner-element-template");

    currBannerElem.find(".banner-element--preview a").attr("href", "http://bit.ly/YWC16-banner");
    currBannerElem.find(".banner-element--preview img").attr("src", bannerLocation + fileName);
    currBannerElem.find(".banner-element--image_size").text(description);
    currBannerElem.find(".banner-element--download").attr("href", bannerLocation + fileName);
    currBannerElem.find(".banner-element--code-textarea").val($.trim(currBannerElem.find(".banner-element--preview").html()).replace(/\s+(?=\s)/g,'').replace(/\t/g, ''));

    currBannerElem.appendTo("#modal-banner .banner-element--wrapper");
  });

  $("a[href='#banner']").click(function(e){ $("#modal-banner").addClass("active"); e.preventDefault(); });
  if(window.location.hash === "#banner") $("#modal-banner").addClass("active");

  $("body").on("click", ".banner-element:has(.banner-element--code-wrapper) .banner-element--show_code", function(e){
    e.preventDefault();
    var bannerCodeObj = $(this).parent().parent().parent().parent().find(".banner-element--code-wrapper");
    if(bannerCodeObj.is(":visible")){
      bannerCodeObj.hide();
      $(this).text("แสดง code");
    }else {
      bannerCodeObj.show();
      $(this).text("ซ่อน code");
      var textAreaObj = bannerCodeObj.find(".banner-element--code-textarea");
      textAreaObj.select();

      window.setTimeout(function() {
          textAreaObj.select();
      }, 1);

      // Work around WebKit's little problem
      function mouseUpHandler() {
          // Prevent further mouseup intervention
          textAreaObj.off("mouseup", mouseUpHandler);
          return false;
      }

      textAreaObj.mouseup(mouseUpHandler);

    }
  });

  $("body").on("click", "#modal-banner.active .modal-overlay, #modal-banner.active .modal-close", function(e){
    $("#modal-banner").removeClass("active");
    e.preventDefault();
  });
  $(document).keyup(function(e) {
    if (e.key === "Escape" && $("#modal-banner").hasClass("active")) { // escape key maps to keycode `27`
      $("#modal-banner").removeClass("active");
    }
  });

});
