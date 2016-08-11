(function($) {
	var timeAnimation = 1000;
	$(document).ready(function() {
		$(".collapse-menu").click(function(){
			if ($(".main-nav").css("display") === "none") {
				$(".main-nav").stop().slideToggle(timeAnimation);
			}
			else {
				$(".main-nav").stop().slideToggle(timeAnimation);
			}
		});
	});
}(jQuery))