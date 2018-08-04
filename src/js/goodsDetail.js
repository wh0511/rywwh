
$(function(){
    // 轮播图
  

    var goods_id = location.search;
    // console.log(goods_id);
    init()
    function init(){
        goodsDetail();
    }
    function goodsDetail(){
        axios.get("/goods/detail" + goods_id)
        
        .then(function(retus){
            console.log(retus.data);
            // 轮播图的显示
            var html = template("swapTpl",{arr:retus.data});
            $(".py_content").html(html);
            // 获取完内容在显示轮播图轮播
            var gallery = mui('.mui-slider');
            gallery.slider({
            interval:1000
            });
            $("#item1").html(retus.data.goods_introduce);
            var html2 = template("teepTpl",{list:retus.data})
            $("#item2").html(html2);
            
        })
    }
})

// mui.init({
//     swipeBack:true //启用右滑关闭功能
// });
// (function($) {
//     $('#scroll').scroll({
//         indicators: true //是否显示滚动条
//     });
//     var segmentedControl = document.getElementById('segmentedControl');
//     $('.mui-input-group').on('change', 'input', function() {
//         if (this.checked) {
//             var styleEl = document.querySelector('input[name="style"]:checked');
//             var colorEl = document.querySelector('input[name="color"]:checked');
//             if (styleEl && colorEl) {
//                 var style = styleEl.value;
//                 var color = colorEl.value;
//                 segmentedControl.className = 'mui-segmented-control' + (style ? (' mui-segmented-control-' + style) : '') + ' mui-segmented-control-' + color;
//             }
//         }
//     });
// })(mui);
