var pagectr=0;
$(window).scroll(function() {
	var sec1pos=3.76;
	var sec2pos=7;　
	var sec3pos=10;　　
	var scrollTop = $(this).scrollTop();
	scrollTop=scrollTop/75;
	var dpr=window.devicePixelRatio
	var UA = navigator.userAgent,
	isIos = /iphone|ipod|ipad/gi.test(UA);// 据说某些国产机的UA会同时包含 android iphone 字符
	console.log(scrollTop);
	if(isIos){
		sec1pos=sec1pos*dpr;
		sec2pos=sec2pos*dpr;
		sec3pos=sec3pos*dpr;
	}
	switch (pagectr){
		case 0:
			if(scrollTop>sec1pos){
				$(".section").eq(pagectr).addClass("getin");
				pagectr++;
			}
			break;
		case 1:
			if(scrollTop>sec2pos){
				$(".section").eq(pagectr).addClass("getin");
				pagectr++;
			}
			break;
		case 2:
			if(scrollTop>sec3pos){
				$(".section").eq(pagectr).addClass("getin");
				pagectr++;
			}
			break;
		

	}
	// if(scrollTop>400){
	// 	pagectr++
	// 	$(".section").eq(0).addClass("getin");
	// }
})