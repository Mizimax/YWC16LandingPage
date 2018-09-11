var isComing = function() {
  var text = $(".js--comingsoon__text").text() + ".";
  $(".js--comingsoon__text").text(text);

  if ($(".js--comingsoon__text").text() === "....") {
    $(".js--comingsoon__text").text("");
  }
};

$(document).ready(function() {
  setInterval(isComing, 400);
});
