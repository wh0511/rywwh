"use strict";

$(function () {
    init();

    function init() {
        // 验证码
        eventList();
    }

    function eventList() {

        //点击获取 验证码
        $("#mui-btn").on("tap", function () {
            // console.log("tap");
            // 点击了获取验证码按钮 添加禁用属性
            $("#mui-btn").attr("disabled", true);
            // $("#mui-btn").removeAttr("disabled");

            // 1 获取手机号码 使用属性选择器 去掉值的左右两个边的空格
            var mobileTxt = $("[name='mobile']").val().trim();
            // 2 判断 验证手机号码是否合法 使用正则表达式
            if (!$.checkPhone(mobileTxt)) {
                // 输入格式不对  消息提示框
                mui.toast("手机号码错误");
                // 移除验证码的禁用属性
                $("#mui-btn").removeAttr("disabled");
                return;
            };
            // 获取返回的验证码
            axios.post("/users/get_reg_code", {
                mobile: mobileTxt
            }).then(function (result) {
                // 倒计时
                var time = 5;

                var setTime = setInterval(function () {
                    // 每执行一次定时器 时间自减 
                    time--;
                    $("#mui-btn").text(time + "s后");
                    // 判断 当时间等于零时 取消验证码的禁用
                    if (time == 0) {
                        $("#mui-btn").removeAttr("disabled");
                        // 重新给验证码赋值
                        $("#mui-btn").text("获取验证码");
                        clearInterval(setTime);
                    }
                }, 1000);
                console.log(result.data);
            });
        });

        // 点击注册
        $("#registerBtn").on("tap", function () {
            // 1 获取所有填写值
            var mobileTxt = $("[name='mobile']").val().trim();
            var codeTxt = $("[name='code']").val().trim();
            var emailTxt = $("[name='email']").val().trim();
            var pwdTxt = $("[name='pwd']").val().trim();
            var pwd2Txt = $("[name='pwd2']").val().trim();
            var genderTxt = $("[name='gender']:checked").val().trim();
            // 2 验证手机号码
            if (!$.checkPhone(mobileTxt)) {
                // 如果输入的手机号码不对 提示错误
                mui.toast("手机号码输入错误");
                return;
            }
            // 3 验证验证码
            if (!codeTxt || codeTxt.length != 4) {
                // 如果输入的不对 提示错误
                mui.toast("验证码非法");
                return;
            }
            // 4 验证邮箱
            if (!$.checkEmail(emailTxt)) {
                // 如果输入的不对 提示错误
                mui.toast("邮箱非法");
                return;
            }
            // 5 验证密码两次输入是否一致
            if (pwdTxt != pwd2Txt) {
                // 如果输入的不对 提示错误
                mui.toast("两次密码输入不一致");
                return;
            }

            //  把获取到的用户输入信息发送至后台
            axios.post("/users/reg", {
                mobile: mobileTxt,
                code: codeTxt,
                email: emailTxt,
                pwd: pwdTxt,
                gender: genderTxt
            }).then(function (result) {
                // 判断是否有返回值
                if (result.meta.status == 200) {
                    // 注册成功
                    mui.toast("注册成功");
                    // 成功之后 延迟一秒跳转页面
                    setTimeout(function () {
                        // 跳转页面至登录页面
                        location.href = "/pages/login.html?mobile=" + mobileTxt;
                    }, 1000);
                } else {
                    // 注册失败 返回后台提示语句
                    mui.toast(result.meta.msg);
                }
            });
        });
    }
});