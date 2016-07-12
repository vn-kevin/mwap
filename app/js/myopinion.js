import './../css/myopinion.less';
import Ajax from './../Ajax.js';

const Myopinion = ((arg)=>{
	return {
		init:function(arg){
			
			//判断在切换是否出现重复加载该JS  
			console.log('myopinion');

			//初始获取DOM 节点  + 路由 Function 
			var dom='#'+arg.page,
				Srouter=arg.F;
				
				//选择分类
				$(dom+" #picker").picker({
					toolbarTemplate: '<header class="bar bar-nav">\
				          <button class="button button-link pull-right close-picker">确定</button>\
				          <h1 class="title">分类筛选</h1>\
				          </header>',
					cols: [{
						textAlign: 'center',
						values: ['分类', '水利工程', '桥梁']
					}],
					formatValue: function(picker, value, displayValue) {
						$("#picker").attr({
							"size": value[0].length * 2
						});
						return value[0];
					}
				});
				//查看详细
				$(dom+' .jsOpen').click(function(){
					var id=$(this).attr('data-id');
						Srouter.setLoad('#opinion_details');
				});

		}
	}
})
export default Myopinion;