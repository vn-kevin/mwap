import './css/base.less';
import Login from './js/login.js';
import Index from './js/index.js';
import Myopinion from './js/Myopinion.js';
import Opinion_details from './js/opinion_details.js';
import Msg from './js/msg.js';

let Lindex= 0;
$.config = {router: true}

/*
	重写路由方法 
	直接在A href='#index'  sui 路由里面的内联路由

*/

var Srouter={
	thisF:{
		login:Login(),
		index:Index(),
		myopinion:Myopinion(),
		opinDetails:Opinion_details(),
		msg:Msg()
	},
	//加载对应模版 
	setLoad:function(url){
		let urls=url.replace('#','');
		//发现页面模版存在该模版，直接跳转  else AJAX加载
		if($('.tmpHtml').find(url).length){
			$.router.load(url);
		}else{
			$.ajax({
				url: '/app/html/'+urls+'.html',
				type: 'GET',
				dataType: 'html',
				success: function(data) {
					$('.tmpHtml').append(data);	
					$.router.load(url);
				}
			});
		}
	},
	//重新绑定所有 A事件 
	setA:function(){
		let that =this;
		//改变 触发A 事件
		$('.page-group').undelegate('a','click');
		$('.page-group').delegate('a','click',function(){
			let url=$(this).attr('href');
			if($(this).hasClass('back')){
				return true;
			}else{
				that.setLoad(url);
				return false;
			}
		});
	},
	init:function(){
		var that=this;
		this.setA();
		//路由监控
		$(document).on("pageInit", function(e, pageId, $page) {
			//去除重复方法执行 
			if(typeof(that.thisF[pageId])=="object" && pageId !='login' ){
				that.thisF[pageId].init({page:pageId,F:Srouter});
				that.thisF[pageId]=true;
			}
		});
	}
}

$(function(){
	if(Lindex==0){

		//开发设置 阀值 
		Srouter.setLoad('#msg')
		
		//初始直接加载Login
		Srouter.thisF['login'].init({page:"login",F:Srouter})
	}
	//设置路由开启 再执行 重写路由方法
	if($.config.router){
		Srouter.init();
	}
});