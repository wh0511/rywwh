

$(function(){
    // 全局变量 获取数据
    var QueryObj={
        query:"",
        // 获取传递的id
        cid:$.getQueryString("cid"),
        // 显示第几页
        pagenum:1,
        // 分页显示数据条数
        pagesize:10
    }
    // 全局变量设置页数
        var totalPages = 1;
    // var ret = location.search;
    // console.log(ret);
    init();
    function init(){
        
        // 刷新加载
        mui.init({
            pullRefresh : {
              container:".list_content",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
              down : {
                auto:true,
                style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                callback :function(){
                    // 清空已存在的数据
                    $(".list_content_ul").html("");

                    // 重置索引
                    QueryObj.pagenum = 1;

                    // 执行数据加载
                    goodsList()
                    .then(function(){
                        // 数据加载成功之后 关闭下拉刷新事件
                        mui('.list_content').pullRefresh().endPulldownToRefresh(false);
                        // 页面刷新 清除之前的上拉事件
                        mui('.list_content').pullRefresh().refresh(true);
                    })
                }
              },
              up:{
               contentrefresh: "正在加载...",
                callback:function(){
                    // 如果当前加载的页数大于总页数 那么就不重复加载
                    if(QueryObj.pagenum >totalPages){
                        mui('.list_content').pullRefresh().endPullupToRefresh(true);
                    }else{
                        // 符合条件  当前页面自增 
                        QueryObj.pagenum++;
                        // 加载下一页
                        goodsList()
                        .then(function(){
                            // 数据加载成功之后 关闭下拉刷新事件
                            mui('.list_content').pullRefresh().endPullupToRefresh(false);
                        })
                    }
                }
              }
            }
          });

    }


    function goodsList(){
        return axios.get("/goods/search",{
            params:QueryObj
        })
        .then(function(retusData){
            // 总页数
            totalPages = Math.ceil(retusData.data.total / QueryObj.pagesize);
// console.log(totalPages);
// console.log( QueryObj.pagesize);
            if(retusData.meta.status == 200){
                
                var html = template("listTpl",{arr:retusData.data.goods});
                // console.log(html);
                $(".list_content_ul").append(html);
                // .find("li").animate({"opacity":1},1000)
               
            //    var myScoll1 = new IScroll(".list_content");
            }
        })
    }

 
    
})