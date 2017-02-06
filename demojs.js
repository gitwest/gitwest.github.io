window.onload=function(){
	//js实现自适应
	var scrollPlate=document.getElementsByClassName('plate');
	var	wrapOne=document.getElementsByClassName('wrap_one');
	var scrollUl=document.getElementById('go_scroll');
	var windH=window.innerHeight;
	
	var proL=0;
	var proT=0;
	//setSide();
	window.onresize=function(){
		//setSide();
		
		//当窗口缩放大小时 判定滚动屏按钮的隐藏和显示效果 
		//以1200作为是否显示滚动屏按钮的依据
		var scrollOnOff=false;
		if(document.documentElement.clientWidth>=1200){
			scrollOnOff=true;
		}
		if(scrollOnOff){
			scrollUl.style.display='block';
		}else{
			scrollUl.style.display='none';
		}
		//当窗口发生变化时，重新获取高度(避免窗口缩小打开的，再放大窗口时  滚动屏还按之前的窗口大小来判断)
		windH=window.innerHeight;
		
		//这里是当窗口变化时实时监控proT（项目专区拖拽效果），若不监控，proT将会显示为页面刷新时的值，这个值就成了不定值！会有坑····
		 proL=oProject.getBoundingClientRect().left;
		 proT=oProject.getBoundingClientRect().top;
	}
	
	if(document.documentElement.clientWidth<1200){
			scrollUl.style.display='none';
	}	//console.log(scrollPlate[0].offsetWidth,document.documentElement.clientWidth,window.innerWidth)
	//分别调用
	function setSide(){
		for(var i=0;i<scrollPlate.length;i++){
			windSide(scrollPlate[i],wrapOne[i]);
		}
	}
	//自适应窗口函数封装
	
	function windSide(obj1,obj2){
		var scrollW=document.documentElement.clientWidth;
		var scrollH=document.documentElement.clientHeight;
		//最外层宽、高设置
		//obj1.style.minHeight=obj2.offsetHeight+'px';
		//obj1.style.width=scrollW+'px';	
		//obj1.style.height=scrollH+'px';	
		//主要内容区（wrap_one）宽度自适应设置
		//obj2.style.left=(scrollW-obj2.offsetWidth)/2+'px';

	}
	

	//滚动屏效果实现
	var scrollLis=scrollUl.getElementsByTagName('li');
	var scrollNum=0;
	var	scrollTime=null;
	
	for(var i=0;i<scrollPlate.length;i++){
		
		//scrollPlate[i].style.height=window.innerHeight+'px';
		scrollLis[i].index=i;
		scrollLis[i].onclick=function(){
			var _this=this;
			clearInterval(scrollTime);
			//窗口可视区高度window.innerHeight
			//点击滚动按钮（li）出现动画滑动播屏效果
			scrollTime=setInterval(function(){
				if(scrollNum<windH*_this.index){
					scrollNum+=150;
					if(scrollNum>=windH*_this.index){
						clearInterval(scrollTime);
						scrollNum=windH*_this.index;
					}	
				}else{
					scrollNum-=150;	
					if(scrollNum<=windH*_this.index){
						clearInterval(scrollTime);
						scrollNum=windH*_this.index;
					}	
				}
				
				//浏览器做兼容
				 document.documentElement.scrollTop=scrollNum;
				 document.body.scrollTop=scrollNum;
	 
			},20);
			romeClas();
			this.className='addclas';
		}
	}	
	
	
	scrollScrol();	
	
	//滚动条监控下的li背景变化
	window.onscroll=function(){	
		scrollScrol();
		
		//这里是当滚动条变化时实时监控proT（项目专区拖拽效果），若不监控，proT将会显示为页面刷新时的值，这个值就成了不定值！会有坑····
		proL=oProject.getBoundingClientRect().left;
		proT=oProject.getBoundingClientRect().top;
		//console.log(proL,proT);
	}

	//页面从新载入时，滚动条发生变化时都应该判断一下  滚动条距离顶部的距离，从而为相应的滚动按钮配备相应的颜色变化
	//根据滚动条判断按钮颜色变化的函数封装
	function scrollScrol(){
		if(window.pageYOffset>=0&&window.pageYOffset<windH/2){
			romeClas();
			scrollLis[0].className='addclas';
			//细节问题：window.innerHeight*1.5；这里将1.5乘在后边
		} else if(window.pageYOffset>=windH/2&&window.pageYOffset<windH*1.5){
			romeClas();
			scrollLis[1].className='addclas';		
		} else if(window.pageYOffset>=windH*1.5&&window.pageYOffset<windH*2.5){
			romeClas();
			scrollLis[2].className='addclas';		
		}else{
				romeClas();
				scrollLis[3].className='addclas';	
				
		}
	}
	

	
	//去除滚动按钮class类的函数封装
	function romeClas(){
		for(var i=0;i<scrollLis.length;i++){
			scrollLis[i].className='';	
		}
	}
	
	
	////////////////////////////////////////////
	
	
	//技能专区使用的图片地址
	var arrOneImgs=['img/1.png','img/2.png','img/3.png','img/4.png','img/5.png','img/6.png'];
	var arrTwoImgs=['img/01.png','img/02.png','img/03.png','img/04.png','img/05.png','img/06.png'];
	var arrThreeImgs=['img/001.png','img/002.png','img/003.png','img/008.png','img/005.png','img/007.png'];
	technologySctor('technology_wrapl',arrOneImgs);
	technologySctor('technology_wrapm',arrTwoImgs);
	technologySctor('technology_wrapr',arrThreeImgs);



	//技能专区封装
	function technologySctor(id,arrImg){
		var owrap=document.getElementById(id);
		var oBox=owrap.getElementsByTagName('div')[0];
		var oImg=owrap.getElementsByTagName('img')[0];
		var oP=owrap.getElementsByTagName('p')[0];
		var timer=null;
		var timers=null;
		var n=0;
		
		//鼠标移入移出时分别触发、关闭定时器
		oBox.onmouseover=function(){
			change();
			dou();
			clearInterval(timer);	
			timer=setInterval(function(){
				change();
			},140);
		}
		
		oBox.onmouseout=function(){
			clearInterval(timer);
				
		}
	
		//封装图片运动的函数
		function change(){
			n++;
			if(n>arrImg.length-1){
				n=0;		
			}
			oImg.src=arrImg[n];
		}
		
		//抖动函数封装
		function dou(){
			clearInterval(timers);
			var arr=[];
			var m=0;
			for(var i=190;i>=170;i-=2){
				arr.push(i+2,i);
			}	
			timers=setInterval(function(){
				if(m>arr.length-1){
					clearInterval(timers);
					oP.style.top='170px';	
				}
				oP.style.top=arr[m]+'px';
				m++;
			},30);
		}
	
	}
	
	////////////////////////////////////////////
	
	
	//教育专区js代码实现
	var oedu=document.getElementById('education');
	var oBook=document.getElementById('books');
	var aEduLis=oBook.getElementsByTagName('li');
	var oBtn=oBook.getElementsByTagName('strong')[0];
	var eduNum=0;
	var booktime=null;
	var flag=true;
	
	//li的层级显示
	for(var i=0;i<aEduLis.length;i++){
		aEduLis[i].style.zIndex=aEduLis.length-i;
			
	}
	
	
	//封装函数的定时执行，达到自动翻页效果
	bookes();
	booktime=setInterval(function(){
		bookes();	
	},5000);
	
	//点击按钮的事件处理函数
	oBtn.onclick=function(){

		if(flag){
			clearInterval(booktime);
			oBtn.innerHTML='Start';
			oBtn.style.backgroundColor='green';
			flag=false;
		}else{
			bookes();
			booktime=setInterval(function(){
				bookes();	
			},5000);
			oBtn.innerHTML='Pause';
			oBtn.style.backgroundColor='red';
			flag=true;
		}
	
	}

	//li层级从新排位，配合css3实现动画效果的封装函数
	function bookes(){
		
		aEduLis[eduNum].style.zIndex=eduNum+1;
		aEduLis[eduNum].className='hid_li';
		eduNum++;
		if(eduNum>aEduLis.length-1){
			eduNum=0;
		}
		aEduLis[eduNum].className='show_li';
	}
	
	//////////////////////////////////////////
	//兴趣爱好 专区  元素的操作
	var oInter=document.getElementById('interest');
	var interUl=oInter.getElementsByClassName('inter_list')[0];
	var interArr=['宅！如果不想出门也能算是一种兴趣爱好的话，我真的好爱它啊···但是我不腐！！！','看电影！虽然我的时间被利用的很紧凑，但还是会偶尔放松一下的！','看书！也许这是从小就养成的习惯！','和朋友聊天！聆听朋友跟我讲他的故事···'];
	var interColor=['rgba(255,51,0,0.8)','rgba(0,153,204,0.8)','rgba(102,102,102,0.8)','rgba(204,0,204,0.8)'];
	
	//创建、添加 InterUl 下的li
	for(var i=0;i<interArr.length*2;i++){
		
		var interli=document.createElement('li');
		interUl.appendChild(interli);	
	}
	
	//在创建的Li中添加内容及背景
	var aInterLi=oInter.getElementsByTagName('li');
	
	for(var i=0;i<aInterLi.length;i++){
		aInterLi[i].innerHTML=interArr[i%4];
		aInterLi[i].style.backgroundColor=interColor[i%4];	
	}
	
	
	//////////////////////////////////////////////
	
	//项目专区js代码实现
	var oProject=document.getElementById('project_left');
	var aDiv=oProject.getElementsByTagName('div');
	var aH4=oProject.getElementsByTagName('h4');
	var proTran=document.getElementsByClassName('tran_mov')[0];
	
	//project_left中每个div进行之间的间距
	var proW=(oProject.clientWidth-2*aDiv[0].offsetWidth)/3;
	var proH=(oProject.clientHeight-2*aDiv[0].offsetHeight)/3;
	
	var proArr=[];
	
	//为project_left中每个div进行初始化定位
	proPos();
	
	//为project_left中每个div进行定位的函数封装
	function proPos(){
		for(var i=0;i<aDiv.length;i++){
			aDiv[i].index=i;
			aDiv[i].style.left=	(proW+(aDiv[0].offsetWidth+proW)*(i%2))+'px';
			if(i<2){
				aDiv[i].style.top=proH+'px';
			}else{
				aDiv[i].style.top=2*proH+aDiv[0].offsetHeight+'px';	
			}
			//获取每个aDiv的坐标
			proArr.push([aDiv[i].offsetLeft,aDiv[i].offsetTop]);
			
			proDrag(aH4[i],aDiv[i]);
		}
	}
	
	//头部拖拽效果及移动重新排位效果实现  函数封装
	function proDrag(obj1,obj2){
		//在窗口变化时，滚动条滚动时都要进行监控，否则，oProject总是认为第一次刷新时显示的位置（可以是任意位置）顶部就是最外层的顶部！！！这样就会有bug!!
		 proL=oProject.getBoundingClientRect().left;
		 proT=oProject.getBoundingClientRect().top;
		 //console.log(proL,proT);
		
		var disBigSmalW=oProject.clientWidth-obj2.offsetWidth;
		var disBigSmalH=oProject.clientHeight-obj2.offsetHeight;
		
		obj1.onmousedown=function(e){
			
			//鼠标按下时让当前这个div层级最高，从而该div拖拽时保持在另外3个div的上部
			obj2.style.zIndex=99;
			var e=e||window.event;
			var disX=e.clientX-obj2.getBoundingClientRect().left;
			var disY=e.clientY-obj2.getBoundingClientRect().top;
			
			
			oProject.onmousemove=function(e){
				var e=e||window.event;
				var proDivL=e.clientX-proL-disX;
				var proDivT=e.clientY-proT-disY
				if(proDivL<0){
					proDivL=0;	
				}else if(proDivL>disBigSmalW){
					proDivL=disBigSmalW;
				}
				if(proDivT<0){
					proDivT=0;	
				}else if(proDivT>disBigSmalH){
					proDivT=disBigSmalH;
				}
				obj2.style.left=proDivL+'px';
				obj2.style.top=proDivT+'px';
				
				//拖拽移动时，距离最近被碰撞的元素边框变红
				for(var i=0;i<aDiv.length;i++){
					aDiv[i].style.border='5px solid #63C';	
				}
				var nL=nearL(obj2);
				
				//当前存在最近距离的碰撞元素时，移动到该aDiv上边时 ，该元素边框颜色变红
				if(nL){
					nL.style.border='5px solid #f00';	
				}
			}
			
			oProject.onmouseup=function(){
				oProject.onmousemove=null;
				//鼠标抬起时，从新按顺序定义oProject中各个div的层级，这样既保证了层级不会混乱，而且也达到了鼠标按下时那个div的层级最高的效果！！
				for(var i=0;i<aDiv.length;i++){
					aDiv[i].style.zIndex=i;
				}
				
				var nL=nearL(obj2);
				var proTmp=0;
				
				//如果存在最近距离的碰撞元素，引入一个运动封装函数startMove(),让相应的元素具有运动效果
				if(nL){
					startMove(nL,{left:proArr[obj2.index][0],top:proArr[obj2.index][1]});
					startMove(obj2,{left:proArr[nL.index][0],top:proArr[nL.index][1]});	
					proTmp=obj2.index;
					obj2.index=nL.index;
					nL.index=proTmp;
				}else{
					startMove(obj2,{left:proArr[obj2.index][0],top:proArr[obj2.index][1]});	
				}
				
				//鼠标抬起时再让被碰撞aDiv的边框恢复到原来的颜色
				for(var i=0;i<aDiv.length;i++){
					aDiv[i].style.border='5px solid #63C';	
				}
			}
	
			e.cancelBubble=true;
			return false;
		}

	}
	//计算与拖拽的元素最近发生碰撞的那个元素之间的距离  函数封装
	function nearL(obj){
		var value=999;
		var index=-1;
		
		for(var i=0;i<aDiv.length;i++){
			if(pz(obj,aDiv[i])&&obj!=aDiv[i]){
				var c=distance(obj,aDiv[i]);
				
				if(c<value){
					value=c;
					index=i;	
				}
			}	
		}	
		
		if(index!=-1){
			return aDiv[index];	
		}else{
			return false;	
		}
	}
	
	//计算发生碰撞的元素（左上角）之间的距离  函数封装
	function  distance(obj1,obj2){
		var a=obj1.offsetLeft-obj2.offsetLeft;
		var b=obj1.offsetTop-obj2.offsetTop;
		
		return Math.sqrt(a*a + b*b);	 
	}
	//检测元素是否发生碰撞  函数封装
	function pz(obj1,obj2){
		var L1=obj1.offsetLeft;
		var R1=obj1.offsetLeft+obj1.offsetWidth;
		var T1=obj1.offsetTop;
		var B1=obj1.offsetTop+obj1.offsetHeight;
		
		var L2=obj2.offsetLeft;
		var R2=obj2.offsetLeft+obj2.offsetWidth;
		var T2=obj2.offsetTop;
		var B2=obj2.offsetTop+obj2.offsetHeight;
		
		if(L1>R2||R1<L2||T1>B2||B1<T2){
			return false;
		}else{
			return true;	
		}
		
	}
	
	///////////////////////////////////////////
	
	//分享专区js代码实现
	
	var oShare=document.getElementsByClassName('share')[0];
	var shareLi=oShare.getElementsByTagName('li');
	var oTxt=document.getElementById('otxt');
	
    var shareTxt=['主要是利用JS开启一个定时器来控制css中clip的属性值rect()的方法，来模拟加载进度的过程。','JS中控制window.innerHeight的值,通过点击事件执行window.scrollTo来实现滚动屏效果。','使用JS开启定时器,通过控制一个DIV的width/height/opacity/left/top值来来实现。','通过给导航条添加fixed,及通过判定window.pageYOffset是否大于导航条的offsetTop，控制导航条offsetTop的正负值实现吸顶效果。','通过鼠标点击判断点击位置在div的上下左右来实现拉伸缩放效果，通过JS控制条件判断cursor使用什么样的符号。','通过控制div的width/height等于window.innerWidth/innerHeight,并利用resize事件缩放窗口实时监控div的宽、高，来实现自适应效果。','通过定时器的套用，在达到相应条件的情况下逐个开启定时器，最终通过控制div的height实现下拉、上升效果','通过键盘keydown、keyup事件及获取键值来实现上下左 右移动、开枪效果。','面向对象实现选项卡的小案例--重点在于分析面向对象中this的指向、方法的复用、继承问题。'];
	
	var shareClass=['rotates','lates','skews'];
	var shareBg=['#099','#969','#C790'];
	
	//给每三个li添加背景颜色、内容描述及相应的class，通过css3实现相应的不同的效果
	for(var i=0;i<shareLi.length;i++){
		shareLi[i].index=i;
		shareLi[i].style.background=shareBg[shareLi[i].index%3];
		shareLi[i].className=shareClass[shareLi[i].index%3];
		
		//给每个li移入时添加相应的内容
		shareLi[i].onmouseover=function(){
			oTxt.innerHTML=	shareTxt[this.index];
		}
	}
	
	
	/////////////////////////////////////////// < THE END ! >
	
}