const Login = ((arg)=>{
	return {
		init:function(arg){
			
			//判断在切换是否出现重复加载该JS  
			console.log('login')

			//初始获取DOM 节点  + 路由 Function 
			var dom='#'+arg.page,
				Srouter=arg.F;

			$(dom+' #loginBtn').click(function(){
				Srouter.setLoad('#index');
			});

		}
	}
})
export default Login;