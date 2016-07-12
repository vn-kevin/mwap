/**
 * 此ajax中做了拦截请求错误的统一提示，以及session过期的统一处理
 * Ajax.ajax({
 *     url:"xx/xx.do"
 *    ,data:JSON.stringify(data)
 *    ,success:function(data){
 *        if(data.result == "true"){
 *            console.log(data);
 *        }
 *    }
 * });
 */
const Ajax=((option)=>{
        return {
            /**
             * 基础ajax提交
             * @options 类型：object, ajax的传参对象
             * */
            ajax: function (option) {
                var t = this;
                //默认参数
                var data = {
                    type: "post",
                    dataType: "json",
                    data:{},
                    //async:false,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert("请求出错，请重试");
                    }
                }
                var apps={
                        "source":"app"
                };
                $.extend(data, option);
                $.extend(data.data, apps);
                
                //重写success，如果传回的data.returnCode值为 0,才产生回调，供模块使用  9999 为登录超时  logoOut.jsp
                data.success = function (obj) { 
                    if (data.dataType == "html") {
                        obj = JSON.parse(obj);
                    }
                    if (obj.returnCode == 0) {
                        ;(typeof(option.success) == "function") && option.success(obj);
                    }else{
                        layer.msg(obj.returnMessage); //给个错误提示
                        //如果登陆会话已过期，就弹出登陆框
                        if (obj.returnCode && obj.returnCode == 999994) {
                            t.showLoginBox(obj);
                        }
                        //如果没有访问权限
                        if (obj.returnCode && obj.returnCode == 999999) {
                            history.go(-1);
                        }
                    }
                    
                }
                return $.ajax(data);
            },
            /**
             * session过期后的弹出登陆框
             * */
            showLoginBox: function (data) {
                alert('登录超时!');
                setTimeout(function () {
                    //返回
                   window.location.href = data.returnData;
                }, 2000);
            }
        } 
});
export default Ajax();