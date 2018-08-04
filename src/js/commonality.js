// 定义基础的请求路径
axios.defaults.baseURL = 'http://119.29.204.94:8888/api/public/v1';

var BaseURL="http://119.29.204.94:8888/";
// 定义模板变量 
template.defaults.imports.BaseURL = BaseURL;

 // 给a标签默认点击事件
$("body").on("tap","a",function(){
    var href=$(this).attr("href");
  //   执行跳转
  location.href=href;
})


axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  $('body').addClass("loadding");
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// axios.intercepto
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    $('body').removeClass("loadding");
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
// 根据url上的参数 获取值
// function getQueryString(name){
//   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//   var r = window.location.search.substr(1).match(reg);
//   if (r != null) return decodeURI(r[2]); return null;
// }
$.extend($,{
  getQueryString: function(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  },
  // 手机验证
  checkPhone: function (phone) {
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      return false;
    } else {
      return true;
    }
  },
  // 邮箱验证
  checkEmail: function (myemail) {　　
    var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if (myReg.test(myemail)) {　　　　
      return true;　　
    } else {　　　　
      return false;
    }
  },
  // 把用户信息存入到会话存储中
  setInfo:function (obj) {
    var jsonObj=JSON.stringify(obj);
    sessionStorage.setItem("userinfo",jsonObj)
  },
  getInfo:function () {
    return JSON.parse(sessionStorage.getItem("userinfo"));
  }

})


// 调用
setFont();
// 根据屏幕的宽度  设置html标签的值
function setFont(){
    // 基础值
     var baseVal = 100;
    //  设计稿的宽度
     var pageWidth = 414;
    //  获取屏幕的宽度
     var screenWidth = document.querySelector("html").offsetWidth;
    //  计算fontsize
     var fz=baseVal*screenWidth/pageWidth;
    //  设置到html的fontsize
     document.querySelector("html").style.fontSize=fz+"px";
}
// 整个页面加载调用
window.onresize=function(){
    setFont();
}