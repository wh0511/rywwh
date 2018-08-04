"use strict";

$(function () {
    // window.onload=function(){
    //     // 页面和图片加载完成之后 才会触发
    // }
    // 设置全局变量  保存点击的下标
    var Datas;

    var myScoll1;

    init();
    function init() {
        getCategories();
        eventList();
    }

    // 请求分类数据
    function getCategories() {
        axios.get("/categories").then(function (resultData) {
            if (resultData.meta.status == 200) {
                // 把现在展开的分页给全局变量
                Datas = resultData.data;
                // 左侧
                var html = template("leftTpl", { arr: Datas });
                // 右侧
                // var html2 = template("rigthTpl",{arr:resultData.data[0]});
                $(".pyg_menu").html(html);
                // $(".good_list").html(html2);
                // eventList();
                // 初始化

                myScoll1 = new IScroll(".content_left");

                // 渲染右侧 调用函数
                renderMain(0);
            }
        });
    }

    // 根据索引去渲染右侧数据
    function renderMain(tmpIndex) {
        // 渲染右侧
        var html2 = template("rigthTpl", { arr: Datas[tmpIndex].children });
        $(".good_list").html(html2).find("li").animate({ "opacity": 1 }, 1000);
        // .find(ul).animate({"opacity":1,1000})
        // .find(ul).find(li).animate({"op":1,1000})

        // 初始化右侧滚动 必须要图片加载完成后 才能初始化
        $(".content_right img").eq(-1).on("load", function () {
            var myScoll2 = new IScroll(".content_right");
        });
    }

    // 绑定一堆事件
    function eventList() {
        // 事件委托 
        // 点击谁 就给谁添加默认都是active 删除兄弟的active
        $(".content_left").on("tap", "li", function () {
            $(this).addClass("active").siblings().removeClass("active");
            // mui('.mui-scroll-wrapper').scroll().scrollTo(0,44,100);
            // 获取被点击的索引 $().data("index")=dcoment.dataset.index
            // console.log($(this).data("index"))
            var index = $(this).data("index");
            renderMain(index);
            // console.log(index);

            // 点击滚动置顶
            myScoll1.scrollToElement(this);
        });
    }
});