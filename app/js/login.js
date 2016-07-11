const Login = ((arg)=>{
	return {
		init:function(arg){
			
			//判断在切换是否出现重复加载该JS  
			console.log('login')

			//初始获取DOM 节点  + 路由 Function 
			var dom='#'+arg.page,
				Srouter=arg.F;

			$('.page-group').delegate(dom+' #loginBtn','click',function(){
				 //console.log(123);
				 //
				 Srouter.setLoad('#index');

			});
		}
	}
})
export default Login;