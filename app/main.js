import './css/base.less';
import Login from './js/login.js';
import Index from './js/index.js';

let Lindex= 0;
$.config = {router: true}
var Srouter={
	thisF:{
		login:Login(),
		index:Index()
	},
	setLoad:function(url){
		let urls=url.replace('#','');
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

			if(typeof(that.thisF[pageId])=="object" && pageId !='login' ){
				that.thisF[pageId].init({page:pageId,F:Srouter});
				that.thisF[pageId]=true;
			}
			//console.log(that.thisF[pageId])
			//if(that.thisF[pageId]===true)
			
			/*if (pageId == "index") {
				that.thisF[pageId].init({page:pageId,F:Srouter});
			}else if(pageId=="login"){
				that.thisF[pageId].init({page:pageId,F:Srouter});
			}*/
		});

	}
}

$(function(){
	if(Lindex==0){

		//阀值 
		//Srouter.setLoad('#index')
		
		//login JS
		Srouter.thisF['login'].init({page:"login",F:Srouter})
		
	}
	if($.config.router){
		Srouter.init();
	}
});