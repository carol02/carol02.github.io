//获取屏幕宽高
var winWid=window.innerWidth;
document.body.style.width=winWid+'px';
var winHei=window.innerHeight;
document.body.style.height=winHei+'px';
//在窗口或框架被调整大小时重新赋值body宽高
window.onresize=function () {
	winWid=window.innerWidth;
	document.body.style.width=winWid+'px';
	winHei=window.innerHeight;
	document.body.style.height=winHei+'px';
}
$('.options').css({
	//width:3*winWid
	width:2*winWid
	//transform:'translate3d('+-winWid+'px, 0px, 0px)'
})
$('.option').css({
	width:winWid
})
/*提示层*/
$('#promptBrowser').animate({
	opacity:1,
	marginTop:'-90px'
},'1000',function () {
	setTimeout(function () {
		$('#promptBrowser').css({
			display:'none'
		})
	},1600)
})

/*头部*/
//鼠标移入头部中间三部分图片变换
$('.hea_middle li').eq(0).mouseenter(function () {
	$(this).css({
		transform:'scale(1.1)'
	});
	$(this).children('img')[0].src='img/00.png';
}).mouseleave(function () {
	$(this).css({
		transform:'scale(1.0)'
	});
	$(this).children('img')[0].src='img/win.png';
}).click(function () {
	$('.options').css({
		transform:'translate3d('+-0*winWid+'px, 0px, 0px)'
	})
})
$('.hea_middle li').eq(1).mouseover(function () {
	$(this).css({
		transform:'scale(1.1)'
	});
	$(this).children('img')[0].src='img/appnormal.png';
}).mouseleave(function () {
	$(this).css({
		transform:'scale(1.0)'
	});
	$(this).children('img')[0].src='img/appdown.png';
}).click(function () {
	$('.option').eq(1).css({
		display:'block'
	})
	$('.options').css({
		transform:'translate3d('+-1*winWid+'px, 0px, 0px)'
	})
})
$('.hea_middle li').eq(2).mouseover(function () {
	$(this).css({
		transform:'scale(1.1)'
	});
	$(this).children('img')[0].src='img/enormal.png';
}).mouseleave(function () {
	$(this).css({
		transform:'scale(1.0)'
	});
	$(this).children('img')[0].src='img/edown.png';
})
/*.click(function () {
	$('.options').css({
		transform:'translate3d('+-2*winWid+'px, 0px, 0px)'
	})
})*/
//换一批按钮自定义num属性,即为点击数，初始化为0
$('.down_left')[0].num=0;
//更换壁纸图标鼠标移入和移出时页面效果
$('.hea_rig1').mouseenter(function () {
	$('.hea_rig1 .original')[0].src='img/tp_skins.png';
	picShow ();
}).mouseleave(function () {
	$('.hea_rig1 .original')[0].src='img/tp_skin.gif';
	picDisappear ();
})
//点击换一批按钮壁纸更换
$('.down_left').click(function () {
	$('.down_left')[0].num++;
	if ($('.down_left')[0].num>$('.paper').length-1) {
		$('.down_left')[0].num=0;
	}
	$('.paper').css({
		display:'none'
	})
	$('.paper').eq($('.down_left')[0].num).css({
		display:'block'
	})
	$('.hea_rig1 .paper').eq($('.down_left')[0].num).find('img').css({
		left:'10px',
		height: '60px',
		opacity:0
	})
	picShow ();
})
//壁纸淡入
function picShow () {
	$('.hea_rig1 .paper').eq($('.down_left')[0].num).find('img').animate({
		left:'0px',
		height: '80px',
		opacity:1
	},'slow')
}
//壁纸淡出
function picDisappear () {
	$('.hea_rig1 .paper').eq($('.down_left')[0].num).find('img').animate({
		left:'10px',
		height: '60px',
		opacity:0
	},'slow')
}
$('.paper li').click(function () {
	$('.bg')[0].src=$(this).children('img')[0].src;
})
/*主体部分*/
//第二屏
iconPosition ();
function iconPosition () {
	//console.log($('.body_con .icons').length)
	for (let j=0;j<$('.body_con .icons').length;j++) {
		var lis=$('.body_con .icons').eq(j).children('ul').children('li');
		for (let i=0;i<lis.length;i++) {
			lis.eq(i).css({
				top:140*(i%4)+'px',
				left:137*Math.floor(i/4)+'px'
			})
		}
	}
}
//拖动图标
dragIcons ();
function dragIcons () {
	var recordLeft,recordTop;
	for (let i=0;i<$('.icons').length;i++) {
		for (let j=0;j<$('.icons').eq(i).find('li').length;j++) {
			$('.icons').eq(i).find('li')[j].onmousedown = function(ev){
				//记录拖拽元素初始位置
				recordLeft=getStyle(this,'left');
				recordTop=getStyle(this,'top');
				//记录鼠标距离box边缘的位置。
				var disx = ev.clientX - this.offsetLeft;
				var disy = ev.clientY - this.offsetTop;
				document.onmousemove = function(ev){
					//获取到移动过程中鼠标的位置，然后减去鼠标到box边缘的位置。
					var x = ev.clientX - disx;
					var y = ev.clientY - disy;
					$('.icons').eq(i).find('li')[j].style.left = x+'px';
					$('.icons').eq(i).find('li')[j].style.top = y+'px';
				};
				//鼠标抬起的时候把move事件注销，这样box就不会在移动了。
				document.onmouseup = function(){
					for (let k=0;k<$('.icons').eq(i).find('li').length;k++) {
						if(j!==k&&CollisionTest($('.icons').eq(i).find('li')[j],$('.icons').eq(i).find('li')[k])){
							console.log(j,k)
							$('.icons').eq(i).find('li').eq(j).css({
								left:getStyle($('.icons').eq(i).find('li')[k],'left')+'px',
								top:getStyle($('.icons').eq(i).find('li')[k],'top')+'px'
							})
							$('.icons').eq(i).find('li').eq(k).animate({
								left:recordLeft+'px',
								top:recordTop+'px'
							},'100')
								recordLeft=0;
								recordTop=0;
						}else{
							/*$('.icons').eq(i).find('li').eq(j).animate({
								left:recordLeft+'px',
								top:recordTop+'px'
							},'slow',function () {
								recordLeft=0;
								recordTop=0;
							})*/
						}
					}
					document.onmousemove =document.onmouseup= null;
				};
				return false;
			};
		}
	}
}

//点击选项卡,切换到对应屏幕
//记录图标选项卡此刻的屏幕数
var iconNum=0;
for (let i=0;i<$('.number li').length;i++) {
	$('.number li').eq(i).click(function () {
		$('.number li').css({
			color: '#fff',
			backgroundImage: 'none'
		});
		$(this).css({
			color: '#4a7609',
			backgroundImage: 'url(img/c_webqq_bg.png)'
		});
		if (getStyle($('.icons').eq(i)[0],'left')==0) {
			$('.icons').eq(i).css({
				transform:'rotateY(0deg)',
				opacity:1
			})
			$('.icons').eq(iconNum).css({
				left:'1366px',
				opacity:0
			})
		}
		if (getStyle($('.icons').eq(i)[0],'left')!==0){
			$('.icons').eq(i).css({
				left:'0px',
				opacity:1
			})
			$('.icons').eq(iconNum).css({
				transform:'rotateY(-90deg)',
				opacity:0
			})
		}
		iconNum=i;
		if (i!==0) {
			$('.as a').css({
				display:'none'
			})
		}
		if (i==0) {
			$('.as a').css({
				display:'block'
			})
		}
	})
}
/*推荐部分*/
for (let i=0;i<$('.channel').length;i++) {
	$('.channel').eq(i)[0].chiNum=0;
	$('.channel').eq(i).find('.arrows li').eq(0).click(function () {
		$('.channel').eq(i)[0].chiNum--;
		channelMove (i);
	})
	$('.channel').eq(i).find('.arrows li').eq(1).click(function () {
		$('.channel').eq(i)[0].chiNum++;
		channelMove (i);
	})
	for (let k=0;k<3;k++) {
		$('.channel').eq(i).find('.spots li').eq(k).click(function () {
			$('.channel').eq(i)[0].chiNum=k;
			channelMove (i);
		})
	}
}
//频道运动
function channelMove (i) {
	if ($('.channel').eq(i)[0].chiNum<0) {
		$('.channel').eq(i)[0].chiNum=2;
	}
	if ($('.channel').eq(i)[0].chiNum>2) {
		$('.channel').eq(i)[0].chiNum=0;
	}
	$('.channel').eq(i).find('.spots li').css({
		background: '#99bed7'
	});
	$('.channel').eq(i).find('.spots li').eq($('.channel').eq(i)[0].chiNum).css({
		background: '#fff'
	});
	$('.channel').eq(i).find('.cha_body').css({
		transform: 'translate3d(-'+302*$('.channel').eq(i)[0].chiNum+'px, 0px, 0px)'
	});
}
/*表单操作*/
/*点击按钮提交注册*/
//localStorage.clear();
var onOffPas,onOffName;
$('.button1').click(function () {
	onOffName=false;
	onOffPas=false;
	$('.com_right').html('请输入用户名');
	$('.judPas').eq(0).html('请输入密码');
	$('.judPas').eq(1).html('请再次输入密码');
	if (nameOnOff) {
		checkMail($('.inName')[0].value);
	}
	if (!nameOnOff){
		checkPhone($('.inName')[0].value);
	}
	judgePassword ();
	//如果用户名和密码都正确
	if (onOffName==true&&onOffPas==true) {
		//把密码存到数组中
		arrMes.unshift($('.inPass')[0].value);
		//把用户名存到数组中
		arrMes.unshift($('.inName')[0].value);
		updateData();
		for (var i=0;i<$('.inAll').length;i++) {
			$('.inAll')[i].value='';
		}
		alert('注册成功！');
	}
})
//立即登录按钮
$('.button2').click(function () {
	$('#register').css({
		display:'none'
	})
	$('#logIn').css({
		display:'block'
	})
})
/*注册*/
//关闭QQ图标，注册页面出现
$('.butReg').click(function () {
	$('#register').css({
		display:'block'
	})
})
//关闭注册页面
$('.re_close').click(function () {
	$('#register').css({
		display:'none'
	})
})
var keyOnOff=true;
var shiftOnOff=true;
var nameOnOff=true;
//用户名
$('.name_mp').click(function () {
	$('.mOp').css({
		display:'block'
	})
})
//切换邮箱和手机号
$('.mOp li').eq(0).click(function () {
	nameOnOff=true;
	$('.name_mp').html($(this).html());
	$('.mOp').css({
		display:'none'
	})
})
$('.mOp li').eq(1).click(function () {
	nameOnOff=false;
	$('.name_mp').html($(this).html());
	$('.mOp').css({
		display:'none'
	})
})
//正则判断手机号码是否正确
function checkPhone(phoneNum){
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(phoneNum))){ 
    	$('.com_right').css({
    		color:'red'
    	}).html('请输入正确用户名!')
    }else{
    	$('.com_right').css({
    		color:'#000'
    	})
    	onOffName=true;
    }
}
//正则判断邮箱是否正确
function checkMail(mailNum){ 
    if(!(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(mailNum))){ 
    	$('.com_right').css({
    		color:'red'
    	}).html('请输入正确用户名!')
    }else{
    	$('.com_right').css({
    		color:'#000'
    	})
    	onOffName=true;
    }
}
//密码
//判断两次输入密码是否正确
function judgePassword () {
	if ($('.inPass')[0].value!==$('.inAgain')[0].value) {
		//console.log(3333)
		$('.judPas').html('两次输入密码不一致！').css({
			color:'red'
		});
	}else{
		$('.judPas').css({
			color:'#000'
		});
		onOffPas=true;
	}
}
//输入密码块中点击键盘图片，键盘出现
$('.pas_middle .import').click(function () {
	keyOnOff=true;
	$('#keyboard').css({
		left:getBound ($('.inAgain')[0]).left+'px',
		top:getBound ($('.inAgain')[0]).top+50+'px',
		display:'block'
	})
	console.log(getBound ($('.inAgain')[0]).left,getBound ($('.inAgain')[0]).top+10)
})
//再次输入密码块中点击键盘图片，键盘出现
$('.again_middle .again_import').click(function () {
	keyOnOff=false;
	$('#keyboard').css({
		left:getBound ($('.inAgain')[0]).left+'px',
		top:getBound ($('.inAgain')[0]).top+50+'px',
		display:'block'
	})
})
//点击键盘中关闭按钮，键盘关闭
$('.key_close').click(function () {
	$('#keyboard').css({
		display:'none'
	})
})
//点击键盘进行输入
$('.keys li:not(.except)').click(function () {
	if (keyOnOff==true) {
		$('.inPass')[0].value+=$(this).html();
	}else{
		$('.inAgain')[0].value+=$(this).html();
	}
})
//点击删除按钮删除字符
$('.backspace').click(function () {
	if (keyOnOff==true) {
		var len=$('.inPass')[0].value.length;
		$('.inPass')[0].value=$('.inPass')[0].value.substring(0,len-1);
	}else{
		var len=$('.inAgain')[0].value.length;
		$('.inAgain')[0].value=$('.inAgain')[0].value.substring(0,len-1);
	}
})
//点击shift按键字母大小写切换
$('.shift').click(function () {
	if (shiftOnOff==true) {
		for (var i=0;i<$('.keys .letter').length;i++) {
			$('.keys .letter')[i].innerHTML=$('.keys .letter')[i].innerHTML.toUpperCase();
		}
		shiftOnOff=false;
	}else{
		for (var i=0;i<$('.keys .letter').length;i++) {
			$('.keys .letter')[i].innerHTML=$('.keys .letter')[i].innerHTML.toLowerCase();
		}
		shiftOnOff=true;
	}
})
//拖拽输入键盘
objDrag ($('.key_header')[0],$('#keyboard')[0]);
//性别
for(var i=0;i<$('.sex_middle div').length;i++){
	$('.sex_middle div')[i].onclick = function(){
		for(i=0;i<$('.sex_middle div').length;i++){
			$('.sex_middle div')[i].className='';
		}
		this.className = 'sex_active';
	}
}
//爱好
for(var i=0;i<$('.hobby_middle div').length;i++){
	$('.hobby_middle div')[i].onclick = function(){
		if(this.className=='hobby_active'){
			this.className='';
		}else{
			this.className='hobby_active';
		}
	}
}
//生日
//点击第一个下拉列表项子项显示，同时后面的下拉列表一同变化
for (let i=0;i<$('.bir1_2').find('li').length;i++) {
	$('.bir1_2').find('li').eq(i).click(function () {
		$('.bir1_2').parent('.mpFl').find('.mP_select').html($('.bir1_2').find('li').eq(i).html());
		showInitialize (i);
		firstSelect (i);
	})
}
//数据初始化
showInitialize (0);
firstSelect (0);
//第一个下拉菜单操作
clickShowList ($('.bir_show') ,0);
pitchSelect ($('.bir1_2'));
//根据第一个下拉列表生成后面下拉列表中内容
function firstSelect (i) {
	//生成年份
	createSelect ($('.bir2_2_1'),aData.birthday[i].nf);
	setHeight ($('.bir2_2_1'));
	clickShowList ($('.bir_show') ,1);
	//拖动年份列表
	dragBar ($('.bir2_2'));
	//点击显示年份列表子项
	pitchSelect ($('.bir2_2'));
	//生成月份
	createSelect ($('.bir3_2_1'),aData.birthday[i].yf);
	setHeight ($('.bir3_2_1'));
	clickShowList ($('.bir_show') ,2);
	//拖动月份列表
	dragBar ($('.bir3_2'));
	//点击显示月份列表子项
	pitchSelect ($('.bir3_2'));
	//生成日子
	createSelect ($('.bir4_2_1'),aData.birthday[i].rz);
	setHeight ($('.bir4_2_1'));
	clickShowList ($('.bir_show') ,3);
	//拖动日子列表
	dragBar ($('.bir4_2'));
	//点击显示日子列表子项
	pitchSelect ($('.bir4_2'));
}
//显示数据初始化
function showInitialize (i) {
	$('.bir_show').eq(0).html(aData.birthday[i].ri);
	$('.bir_show').eq(1).html(aData.birthday[i].nf[0]);
	$('.bir_show').eq(2).html(aData.birthday[i].yf[0]);
	$('.bir_show').eq(3).html(aData.birthday[i].rz[0]);
}
//生成下拉列表内容
function createSelect (obj,data) {
	var str='';
	for (var i=0;i<data.length;i++) {
		str+='<li>'+data[i]+'</li>';
	}
	obj.html(str);
}
//设置下拉列表的高度
function setHeight (obj) {
	obj.css({
		height:obj.children().length*getStyle(obj.children()[0],'height')+'px'
	})
}
//拖动滚动条时下拉列表移动
function dragBar (obj) {
	var slideBar=obj.children('.slideBar')[0];
	var bar =obj.find('.bar')[0];
	var box=obj[0];
	var content=obj.children('.optionsAll')[0];
	var maxy=slideBar.clientHeight-bar.offsetHeight;
	var maxyContent=getBound (content).height-box.clientHeight;
	var scale=0;
	//滚动条拖动
	bar.onmousedown=function (event) {
		var top=getBound(bar.parentNode).top;
		var disy=event.clientY-getBound(bar).top;
		document.onmousemove=function (event) {
			var y=event.clientY-disy-top;
			//console.log(maxyContent,getBound (content).height-box.clientHeight)
			if (y<0) {
				y=0;
			}
			if (y>slideBar.clientHeight-bar.offsetHeight) {
				y=slideBar.clientHeight-bar.offsetHeight;
			}
			bar.style.top=y+'px';
			scale=y/(slideBar.clientHeight-bar.offsetHeight);
			content.style.top=-scale*(getBound (content).height-box.clientHeight)+'px';
		}
		document.onmouseup=function () {
			document.onmousemove=document.onmouseup=null;
		};
		return false;
	};
}
//点击下拉列表项子项显示
function pitchSelect (obj) {
	var lis=obj.find('li');
	for (let i=0;i<obj.find('li').length;i++) {
		obj.find('li').eq(i).click(function () {
			$(this).parent('ul').parent('.optionsBox').css({
				display:'none'
			})
			obj.parent('.mpFl').find('.mP_select').html(obj.find('li').eq(i).html());
		})
	}
}
//点击显示项，出现对应的下拉菜单
function clickShowList (obj,i) {
	obj.eq(i).click(function () {
		$(this).next('.optionsBox').css({
			display:'block'
		})
	})
}
/*所在地操作*/
//数据初始化
localInitialize (0);
function localInitialize (i) {
	$('.bir_show1').eq(1).html(aData.locate[i].nf[0]);
}
//点击第一个下拉列表项子项显示，同时后面的下拉列表一同变化
for (let i=0;i<$('.area1_2').find('li').length;i++) {
	$('.area1_2').find('li').eq(i).click(function () {
		$('.area1_2').parent('.mpFl').find('.mP_select').html($('.area1_2').find('li').eq(i).html());
		localInitialize (i);
		firstLocalSelect (i);
	})
}
//数据初始化
showInitialize (0);
firstSelect (0);
//第一个下拉菜单操作
clickShowList ($('.bir_show') ,0);
pitchSelect ($('.bir1_2'));


firstLocalSelect (0);
//第一个下拉菜单操作
clickShowList ($('.bir_show1') ,0);
pitchSelect ($('.area1_2'));
//根据第一个下拉列表生成后面下拉列表中内容
function firstLocalSelect (i) {
	//生成省份
	createSelect ($('.area2_2_1'),aData.locate[i].nf);
	setHeight ($('.area2_2_1'));
	clickShowList ($('.bir_show1') ,1);
	//拖动省份列表
	dragBar ($('.area2_2'));
	//点击显示省份列表子项
	pitchSelect ($('.area2_2'));
}
/*登录*/
//关闭登录页面
$('.logIn_close').click(function () {
	$('#logIn').css({
		display:'none'
	})
})
$('.logIn_button').click(function () {
	reminderInitialize ();
	for (var i=0;i<arrMes.length;) {
		if ($('.inName1')[0].value==arrMes[i]&&$('.inPass1')[0].value==arrMes[i+1]) {
			$('#header .name').html($('.inName1')[0].value);
			$('#logIn').css({
				display:'none'
			})
			alert('登录成功');
		}
		if ($('.inName1')[0].value!==arrMes[i]) {
			$('.reminder1').css({
				color:'red'
			}).html('用户名输入错误！')
		}
		if ($('.inPass1')[0].value!==arrMes[i]) {
			$('.reminder2').css({
				color:'red'
			}).html('密码输入错误！')
		}
		i=i+2;
	}
	//console.log(arrMes);
})
//登录提示初始化
function reminderInitialize () {
	$('.reminder1').css({
		color:'#000'
	}).html('请输入用户名')
	$('.reminder2').css({
		color:'#000'
	}).html('请输入密码')
}
//声明arrMes数组，用来存储数据，并且这个数组的内容应该和localStorage的内容保持一致
var arrMes=[];
//当页面加载完成的时候，把localStorage里面的内容添加到数组中
if (localStorage.getItem('data')) {
    arrMes = localStorage.getItem('data').split('#');
}
//监听storage事件
window.onstorage = function(e) {
    //如果修改时list
    if (e.key == 'data') {
        //判断list是否有值
        if (localStorage.getItem('data')) {
            arrMes = localStorage.getItem('data').split('#');
        } else {
            arrMes = [];
        }
    }
}
//更新localStorage数据
function updateData() {
    localStorage.setItem('data', arrMes.join('#'));
}




//文件夹操作
var filesData = [
	{
		id:1,
		pId:0,
		type:"folder",
		text:"新建文件夹1"
	},
	{
		id:2,
		pId:0,
		type:"folder",
		text:"新建文件夹2"
	},
	{
		id:3,
		pId:0,
		type:"folder",
		text:"新建文件夹3"
	},
];
var files = document.querySelector('.fileBox');
var lis = document.querySelectorAll('.fileBox>li');
var as = document.querySelectorAll('.newConstruct');
//goback为当前文件夹的父级的id
var goback = 0;
var len = filesData.length;
as[0].onclick = function(){
	var file = {
		id:++len,
		pId:goback,
		type:"folder",
		text:"新建文件夹"
	};
	filesData.push(file);
	renderList(getChildren(goback));
	var text = inId(file.id);
	$('#menu').css({
		display:'none'
	})
	dragIcons ();
};
/*as[1].onclick = function(){
	var info = getInfo(goback);//根据id找到对象。
	if(!info)return;
	var pid = info.pId;//获取pid
	goback = pid;//保存这个对象的pid就相当于保存他爹的id。
	//根据pid生成内容。
	renderList(getChildren(pid));
};*/
$('.header_icons li').eq(0).click(function () {
	$('#Popup').css({
		display:'none'
	})
})
function inId(id){
	for(var i=0;i<lis.length;i++){
		if(lis[i].d == id){
			return lis[i].getElementsByTagName('span')[0];
		}
	}
}
function getInfo(id){
	//根据id找到对应的对象。
	for(var i=0;i<filesData.length;i++){
		if(filesData[i].id == id){
			return filesData[i];
		}
	}
}

function getChildren(pid){
	var data = [];
	//根据pid找到所有同级的。
	for(var i=0;i<filesData.length;i++){
		if(filesData[i].pId == pid){
			data.push(filesData[i]);
		}
	}
	return data;
}
var folderOnOff=true;
//console.log(folderOnOff)
//根据传入的数据创建文件。
function renderList(data){
	//清空files
	if (folderOnOff) {
		files.innerHTML = '';
	}
	if (!folderOnOff) {
		$('.fileBoxPopup')[0].innerHTML = '';
	}
	for(var i=0;i<data.length;i++){
		var file = document.createElement('li');
		//创建文件元素，绑定pid和id。
		file.pid = data[i].pId;
		file.d = data[i].id;
		file.type = data[i].type;
		//双击
		file.ondblclick = click;
		file.innerHTML = '<img src="img/folder_o.png" alt="" /><span>'+data[i].text+'</span>';
		console.log(folderOnOff)
		if (folderOnOff) {
			files.appendChild(file);
		}
		if (!folderOnOff) {
			$('.fileBoxPopup')[0].appendChild(file);
		}
		//files.appendChild(file);
		//$('.fileBoxPopup')[0].appendChild(file);
	}
	iconPosition ();
}
function click(){
	folderOnOff=false;
	$('#Popup').css({
		display:'block'
	})
	switch(this.type){
		case "folder":
			goback = this.d;
			renderList(getChildren(this.d));
		break;
	}
}
renderList(getChildren(0));
//右键菜单操作
var menu=document.querySelector('#menu');
document.oncontextmenu=function (event) {
	var x=event.clientX;
	var y=event.clientY;
	menu.style.left=x+'px';
	menu.style.top=y+'px';
	menu.style.display='block';
	return false;
}
liSubordinate();
function  liSubordinate() {
	var h2s=document.querySelectorAll('h2');
	var prev=null;
	for (i=0;i<h2s.length;i++) {
		h2s[i].onmouseover=function () {
			for (i=0;i<h2s.length;i++) {
				h2s[i].className='';
			}
			this.className='active';
			var uls=this.parentNode.parentNode.getElementsByTagName('ul');
			for (var i=0;i<uls.length;i++) {
				uls[i].style.display='none';
			}
			if (this.nextElementSibling) {
				this.nextElementSibling.style.display='block';
			}
		}
	}
	$('.crosswise').click(function () {
		iconWaysPosition ();
		menu.style.display='none';
	})
	$('.lengthways').click(function () {
		iconPosition ();
		menu.style.display='none';
	})
}
//桌面图标横向排列
function iconWaysPosition () {
	for (let j=0;j<$('.body_con .icons').length;j++) {
		var lis=$('.body_con .icons').eq(j).children('ul').children('li');
		for (let i=0;i<lis.length;i++) {
			lis.eq(i).css({
				top:140*Math.floor(i/7)+'px',
				left:137*(i%7)+'px'
			})
		}
	}
}
//图标拖拽
dragIcons ();




















































