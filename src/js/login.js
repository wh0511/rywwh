var attr = 88;
console.log(attr);
$(function(){
    init();
    function init(){
        eventList();
    }
    function eventList(){
        // 点击登陆 验证信息
        $("#loginBtn").on("tap",function(){
            // 1 获取值
            var userName = $("[name='mobile']").val().trim();
            var passWord = $("[name='pwd']").val().trim();
            // 2 判断验证是否有通过 如果不通过 提示信息
            if(!userName || !$.checkPhone(userName)){
                mui.toast("用户名不合法");
                return;
            }
            if(!passWord || passWord.lengeh<6){
                mui.toast("密码安全性不够");
                return;
            }
            // 3 如果都合格 则把用户提交的数据发送至后台
            axios.post("/login",{
                username: userName,
                password: passWord
            }).then(function(result){
                // 判断是否有返回数据
                if(result.meta.status == 200){
                    // 登陆成功
                    mui.toast("登陆成功");
                    // 把用户登陆的信息存储至浏览器(这里使用的是临时存储)
                    $.setInfo(result.data);
                    // 延迟时间跳转页面
                    setTimeout(function(){
                        // 先要写死跳转的页面
                        var href = "/pages/index.html";
                        // 判断用户登陆之前的页面 登陆成功之后需要跳转至什么页面
                        if(location.search){
                            // 去掉第一个字符串 "?/pages/页面.html" 进行截取
                            href = location.search.slice(1);
                        }
                        location.href = href;
                    },1000)
                }else{
                    // 登陆失败  返回失败值
                    mui.toast(result.meta.msg);
                    return;
                }
            })
        })
    }
})