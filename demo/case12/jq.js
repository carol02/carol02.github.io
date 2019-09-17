$(window).on('load',function(){
	waterfall();
	var josn={'data':[{'src':'0.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'}]}
	$(window).on('scroll',function(){
		if(checkScrollSlide){
			$.each(josn.data, function(key,value) {
				var obox=$('<div>').addClass('box').appendTo($('#main'));
				var opic=$('<div>').addClass('pic').appendTo($(obox));
				$('<img>').attr('src','img/'+$(value).attr('src')).appendTo($(opic));
			});
		}
		waterfall();
	})
})
function waterfall(){
	var $boxs=$('#main>div');
	var w=$boxs.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/w);
	$('#main').width(w*cols).css('margin','0 auto');
	var hArr=[];
	$boxs.each(function(index,value){
		var h=$boxs.eq(index).outerHeight();
		if(index<cols){
			//hArr.push(h);
			hArr[index]=h;
		}else{
			var minH=Math.min.apply(null,hArr);
			var minHIndex=$.inArray(minH,hArr);
			$(value).css({
				'position':'absolute',
				'top':minH+'px',
				'left':minHIndex*w+'px'
			})
			hArr[minHIndex]+=$boxs.eq(index).outerHeight();
		}
	})
}
function checkScrollSlide(){
	var $lastbox=$('#main>div').last();
	var lastboxdis=$lastbox.offset().top+Math.floor($lastbox.outerHeight()/2);
	var scrolltop=$(window).scrollTop();
	var documentH=$(window).height();
	return(lastboxdis<scrolltop+documentH)?true:false;
}
