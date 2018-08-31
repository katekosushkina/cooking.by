$(document).ready(function(){
	let slide = setInterval(function(){
		var step = 1,
			m=parseInt($('.carousel_wrap').css('margin-left')) - step;
		$('.carousel_wrap').css('margin-left',m);
		if (Math.abs(m) > $(".carousel_wrap img:first").width() + 1) {
			$('.carousel_wrap').css('margin-left',m+=$(".carousel_wrap img:first").width());
			$(".carousel_wrap img:first").appendTo('.carousel_wrap');
		}
	},10);
	setTimeout(function(){
     clearInterval(slide);
	}, 10000);
});
