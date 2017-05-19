/**
 * Created by Zhangyu on 2016/11/8.
 * 主要是公用的deepshare js和底部通用js
 * 需要dom结构中有<input type="hidden" name="deepshare" value="XXX"/>
 * 需要dom结构中有<input type="hidden" name="donwloadurl" value="XXX"/>
 * 需要dom结构中有<input type="hidden" name="deep_id" value="XXX"/>
 * 需要dom结构中有<input type="hidden" name="deep_type" value="XXX"/>
 */

// deepshareid = $('input[name=deepshareid]').val();
// downloadurl = $('input[name=downloadurl]').val();
// deep_id = $('input[name=deep_id]').val();
// deep_type = $('input[name=deep_type]').val();
//
// function getParameterByName(name) {
//     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//         results = regex.exec(location.search);
//     return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
// }
// var deepshareurl;
// deepshareurl = "";
// var data = {
//     id:String(deep_id),
//     type:parseInt(deep_type)
// };
// var params = {
//     inapp_data : JSON.stringify(data)
// };
// function generateUrl(){
//     var paramsJson = JSON.stringify(params);
//     $.post('https://fds.so/v2/url/'+deepshareid, paramsJson, function(result) {
//         deepshareurl = result.url;
//     }).error(function() {
//         deepshareurl = downloadurl;
//     });
// }
//
// window.onload = function () {
//     generateUrl();
// };
// $('.deepshare').bind('click',function(){
//     if(deepshareurl == "")
//         deepshareurl = downloadurl;
//     location.href = deepshareurl;
// })
//置顶
$(".top").hide();
$(function () {
    $(window).scroll(function(){
        if ($(window).scrollTop()>window.innerHeight){
            $(".top").show();
        }
        else
        {
            $(".top").hide();
        }
    });
    $(".top").click(function(){
        window.scroll(0,0);
        //$('body,html').animate({scrollTop:0},100);
        return false;
    });
});
