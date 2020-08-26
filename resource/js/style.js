// portfolio sec01 슬라이드 관련 변수
var $SlideTab = $('.sec01 .tab_wrap a'),
	$track = $(".sec01 .slide_wrap .track"),
	$slideUl,$slideLi,$textLi = $('.sec01 .cont_wrap li');
var slidePosArr = [],
	initWidth,
	plusNum = 0,
	slideCnt = 0,
	tabCnt = 0,
	slideLeng = $SlideTab.length,
	slideInterval;

// portfolio sec01 슬라이드 초기화
initWidth = $('.sec01 .slide_wrap .track ul').eq(0).find('li').eq(0).outerWidth();
$track.append($track.html());
$slideUl = $track.find('ul');
$slideLi = $slideUl.find('li');
$slideUl.each(function(index,item){
	// sec01 슬라이드 animate 위치 저장 
	if (index == 0) {
		slidePosArr.push(initWidth);
	}else{
		plusNum += $slideUl.eq(index-1).width();
		//조건 (삼항) 연산자
		//index == slideLeng 조건이 참이면 값1, 그렇지 않으면 값2
		(index == slideLeng) ? ( slidePosArr.push(plusNum + initWidth) ) :  (slidePosArr.push(plusNum) ); // 첫번째 slide의 경우 슬라이드내 첫 이미지 넓이만큼 추가
	};
});

// portfolio sec01 슬라이드 탭 클릭 시
$SlideTab.on("click" , function(e){
	e.preventDefault();
	clearInterval(slideInterval);
	$(this).addClass('on').siblings().removeClass('on');
	slideCnt = tabCnt = $(this).index();
	sec01SlideFunc();
	slideInterval = setInterval(function(){
		slideCnt += 1;	
		sec01SlideFunc();
	},5000);
});

// portfolio sec01 슬라이드 실행 함수
function sec01SlideFunc() {
	(slideCnt == slideLeng) ?  (tabCnt = 0) : (tabCnt = slideCnt);
	imgMotion();
	$track.stop().animate({
		slideX : slidePosArr[slideCnt]
	},{
		step : function(now){
			var posX = Math.round(this.slideX);
			$track.css({
				transform : 'translate(-' + posX + 'px,0)'
			});
		},
		duration : 1000,
		complete : function(){
			if(slideCnt == slideLeng){
				slideCnt = 0;
				this.slideX = initWidth;
				/* loop 첫번째 슬라이드 set */
				setTimeout(function(){
					$track.css({transform : "translate(-"+  initWidth + "px,0)"});
				},1000);
			};
		}
	});
	$SlideTab.eq(tabCnt).addClass('on').siblings().removeClass('on');
	$textLi.eq(tabCnt).addClass("on").siblings().removeClass("on");
};

// portfolio sec01 슬라이드 시 이미지 인터랙션 관련 함수
function imgMotion(){
	$slideUl.attr("data-status" , "");
	$slideUl.eq(slideCnt).attr("data-status" , "current");
	$slideUl.eq(slideCnt).prev().attr("data-status" , "prev");
	$slideUl.eq(slideCnt).next().attr("data-status" , "next");
};

if(!$('.sec01').is(".active")){
	setTimeout(function(){
		sec01SlideFunc();
	},1000);
};
-
$('.sec01').addClass('active');
slideInterval = setInterval(function(){
	slideCnt += 1;	
	sec01SlideFunc();
},7000);