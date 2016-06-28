function mTween(obj, attr, target, duration,fx,endFn) {
    clearInterval(obj.timer);

    var startTime = new Date().getTime();
    var b = parseFloat(getComputedStyle(obj)[attr]);
    var c = target - b;
    var d = duration;


    obj.timer = setInterval(function() {

        var t = new Date().getTime() - startTime;

        if ( t >= d ) {
            t = d;
            clearInterval(obj.timer);
        }

        var value = Tween[fx](t, b, c, d);
		
        if(attr=='opacity'){
			obj.style[attr] = value;
		}else{
			obj.style[attr] = value + 'px';	
		}
			endFn&&endFn();
    }, 16);
	
}