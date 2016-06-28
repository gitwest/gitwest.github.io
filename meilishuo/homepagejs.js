$(function(){
	
	//////////////主页面 开始//////////////////////////////
	$('.searchtop').click(function(){
		$('.searchtop').css({color:'#000',background:'#f2f2f2'});
		$(this).css({color:'#fff',background:'#f69'});
	});
	
	//吸顶导航效果实现
	var navTop=$('.homepage_h_navwrap').offset().top;
	$(window).on('scroll',function(){
		if($(window).scrollTop()>=navTop){
			$('.homepage_h_navwrap').css({position:'fixed',top:0,'z-index':222});
		}else{
			$('.homepage_h_navwrap').css('position','');
		}
		if($(window).scrollTop()>0){
			$('.change_top').css('display','block');	
		}else{
			$('.change_top').css('display','none');	
		}
	});
	
	//回到顶部效果实现
	$('.change_top').click(function(){
		$(window).scrollTop(0);
	});
	$('.change_top').mouseover(function(){
		$('.change_top p').css('display','none');
		$('.change_top_txt').css('display','block');	
	});
	$('.change_top').mouseout(function(){
		$('.change_top_txt').css('display','none');
		$('.change_top p').css('display','block');	
	});
	
	//主页面右侧边栏显示、隐藏效果实现
	$('.homepage_main_parsent').mouseover(function(){
		$('.homepage_main_hidli').hide();
		$('.homepage_main_hidli').eq($(this).index()).show();
	});
	
	$('.homepage_main_parsent').mouseout(function(){
		$('.homepage_main_hidli').hide();	
	});
	$('.homepage_main_hidli').mouseover(function(){
		$(this).show();
	});
	$('.homepage_main_hidli').mouseout(function(){
		$(this).hide();
	});
	//主页面轮播图效果实现
	var mainRightNum=0;
	var mainRightTimer=null;
	$('.homepage_main_right img').hide();
	$('.homepage_main_right img').eq(0).show();
	mainRightTimer=setInterval(function(){
		mainRightPic();	
	},2500);
	
	$('.homepage_main_right').mouseover(function(){
		$('.homepage_main_right button').css('display','block');
		clearInterval(mainRightTimer);
	});
	$('.homepage_main_right').mouseout(function(){
		$('.homepage_main_right button').css('display','none');
		
		mainRightTimer=setInterval(function(){
			mainRightPic();	
		},2500);
	});
	
	$('.homepage_main_btnright').click(function(){
		mainRightPic();	
	});
	
	$('.homepage_main_btnleft').click(function(){
		mainLeftPic();	
	});
	
	function mainRightPic(){
			mainRightNum++;
			if(mainRightNum>=$('.homepage_main_right img').length){
				 mainRightNum=0;
			}
			$('.homepage_main_right img').fadeOut('slow');
			$('.homepage_main_right img').eq(mainRightNum).fadeIn('slow');
			$('.homepage_main_circle li').removeClass();
			$('.homepage_main_circle li').eq(mainRightNum).addClass('circlebg');
			
	}
	
	function mainLeftPic(){
			mainRightNum--;
			if(mainRightNum<0){
				 mainRightNum=$('.homepage_main_right img').length-1;
			}
			$('.homepage_main_right img').fadeOut('slow');
			$('.homepage_main_right img').eq(mainRightNum).fadeIn('slow');
			$('.homepage_main_circle li').removeClass();
			$('.homepage_main_circle li').eq(mainRightNum).addClass('circlebg');
			
	}
	
	//Hi范儿  相应的效果实现
	var HiPicaArr=[
'img/7680650adc2ae1b378d272de6a32_1242_582.c1.jpg_4b2959bb_s3_386_230.jpg','img/1df9ad974fcc561b57a5f1378644_1242_582.cj.jpg_44e1e10e_s3_386_230.jpg','img/63c1237fb4d58964beb58e0aafe3_1242_582.c1.jpg_19a0856b_s3_386_230.jpg','img/f8468903dca9a7316f583ce7f044_1242_582.cj.jpg_ebfa7b56_s3_386_230.jpg'
	];
	
	$('.Hi_options_js li').click(function(){
		$('.Hi_options_js li').css({'color':'#000','border-bottom':'none'});
		$(this).css({'color':'#f69','border-bottom':'2px solid #f69'});
		
		$('.Hi_pic_js img').attr('src','');
		$('.Hi_pic_js img').attr('src',HiPicaArr[$(this).index()]);
	
	});
	
	//好店推荐 相应效果实现
	var goodShopPic=[
'img/8be34b694c7682a3469fef4e7fde_386_332.c1.jpg','img/76e15937c081f72614a1be471ed8_386_332.cj.jpg','img/562f18d747ceeaaa6a8f39e02e8a_386_332.cj.jpg','img/75a7efec6b093041eb8134a3a00e_386_332.c5.jpg',
'img/97fe5608a6d55ce4253d8f5393ef_386_332.c1.jpg',
	];
	var goodShopTitle=['艾格官方旗舰店','艾丽丝姑娘','唯美女人味','凰米','VIISHOW旗舰店'];
	
	var goodShopDescription=['约会浪漫初夏','做一枚精致的女子，不忘初心....','本店以最优异服务和品质，让您享受购物的乐趣。','卖喜欢的东西，给品味相投的人…','潮，是一种信仰!'];
	
	$('.goodshoping_js li').click(function(){
		$('.goodshoping_js li').css({'color':'#000','border-bottom':'none'});
		$(this).css({'color':'#f69','border-bottom':'2px solid #f69'});
		
		$('.goodshoping_pic_js img').attr('src','');
		$('.goodshoping_pic_js img').attr('src',goodShopPic[$(this).index()]);
		
		$('.homepage_goodshoping_txt h3').html(goodShopTitle[$(this).index()]);
		$('.homepage_goodshoping_txt span').html(goodShopDescription[$(this).index()]);
	});
	//////////////主页面 结束//////////////////////////////


})