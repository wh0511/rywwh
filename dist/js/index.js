"use strict";

$(function () {
  init();
  function init() {

    getSwiperData();
    catItems();
    goodsList();
  }
});
// 请求轮播图数据
function getSwiperData() {
  axios.get("/home/swiperdata").then(function (retusData) {
    // console.log(retus);
    // var retusData = retus.data;
    if (retusData.meta.status == 200) {
      var html = template("swiperData", { arr: retusData.data });
      var html2 = template("swiperDataIndex", { list: retusData.data });
      // console.log(html2);
      $(".pyg_content .mui-slider-loop").html(html);
      $(".pyg_content .mui-slider-indicator").html(html2);
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
      });
    }
  });
}

// 分类导航
function catItems() {
  axios.get("/home/catitems").then(function (retusData) {
    // console.log(retus);
    // var retusData = retus.data; 
    if (retusData.meta.status == 200) {
      var html = template("catItems", { arr: retusData.data });
      // console.log(html);
      $(".pyg_nav").html(html);
    }
  });
}
// console.log(1)

// 商品导航
function goodsList() {
  axios.get("/home/goodslist").then(function (retusData) {
    // console.log(retus);
    // var retusData = retus.data;
    if (retusData.meta.status == 200) {
      var html = template("goodsList", { arr: retusData.data });
      // console.log(html);
      $(".pyg_list").html(html);
    }
  });
}