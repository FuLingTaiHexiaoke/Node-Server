/**
 * Created by Administrator on 2015/11/3.
 */
var Thread = {};
/*********鍥炲***************/
var client_comment_user = function( pid, iconurl, username, content, imgArr){
    content = "<pre style='white-space: pre-wrap;word-wrap: break-word;'>" + content + "</pre>";
    if( imgArr.length > 0 )
    {
        var imgStr = "";
        for( var i=0; i < imgArr.length; i++ )
        {
            if( typeof imgArr[i]['binary'] != 'undefined' ) {
                content += "<div><img data-flag='1' style=\"display: block;\" src=\"data:image/jpeg;base64," + imgArr[i]["binary"] + "\" /></div>";
            } else {
                content += "<div><img data-flag='1' style=\"display: block;\" src=\"" + imgArr[i]["pathurl"] + "\" /></div>";
            }
        }
    }

    if(user_level > 0) {
        if( user_gender == 2 ){
            cls = 'pink'
        } else if( user_gender == 0 ) {
            cls = 'grey'
        } else {
            cls = 'blue'
        }
    }

    if(pid != 0){
        for(var i=0; i<myArray.length;i++){
            if(myArray[i].pid == pid){
                contents = '<li class="clearfix "><a href="javascript:void(0)" class="discuss_head view_author"><img' +
                    ' src="' + iconurl + '"></a><div class="infor_header"><div class="clearfix"><a' +
                ' href="javascript:void(0);" class="view_author fl">' + username + '</a><a class="new_add fl' +
                    ' clearfix">';
                if( user_level ) {
                    contents += '<span class="id_position level ' + cls + ' clearfix"><i' +
                        ' class="level'+user_level+'"></i><span>' + user_level_name + '</span></span>';
                }
                contents += '</a></div><p class="discuss_reply">寮曠敤绗�' + myArray[i].floor + '妤�' + myArray[i].author + '浜�' + myArray[i].postdate + '鍙戣〃鐨�&nbsp;&nbsp;:' + myArray[i].content + '</p><div' +
                ' class="reply_content">' + content + '</div><div' +
                    ' class="discuss_floor"><span>鍒氬垰鍥炲</span></div></div></li>';
                break;
            }
        }
    }else{
        contents = '<li class="clearfix "><a href="javascript:void(0)"class="discuss_head view_author"><img src="' + iconurl + '"></a><div class="infor_header"><div class="clearfix"><a href="javascript:void(0);"class="view_author fl">' + username + '</a><a class="new_add fl clearfix">';
        if( user_level ) {
            contents += '<span class="id_position level ' + cls + ' clearfix"><i' +
                ' class="level'+ user_level +'"></i><span>' + user_level_name + '</span></span>';
        }
        contents += '</a></div><div class="reply_content">' + content + '</div><div' +
        ' class="discuss_floor"><span>鍒氬垰鍥炲</span></div></div></li>';
    }
    if($(".qsf").length > 0) {
        $(".qsf").remove();
    }
    $(".content_discuss ul").append(contents);
    var height = $(".content_discuss li .reply_content").last().offset().top - document.documentElement.clientHeight + 100 ;
    $(window).scrollTop(height);
}

$(document).on("click", ".qsf", function(){
    QFWap.jumpForumComment();
});

/*****瀹㈡埛绔嚜甯︾殑鐐硅禐鎸夐挳*********/
var  client_ping_thread = function (uid, username, iconurl) {
    if( $(".likeContainer").size() == 0 ) {
        var html = "<div class=\"likeContainer\">";
        html += "<div class=\"sq_box show6\">";
        html += "<a class=\"clickTimes\"><span class=\"zan-icon h_like\"></span><span>1</span></a>";
        html += "<a class=\"ping_user\" data-id=\""+uid+"\">"+username+"</a>";
        html += "</div></div>";
        html += "<div class=\"discuss_line\"></div>";
        $(".discuss_article").prepend( html );
        var themeSkin = $(".likeContainer .zan-icon").css("background-color");
        if(themeSkin != themeConf) {
            $(".likeContainer .zan-icon").css("background-color", themeConf);
        }
    } else {
        var num = parseInt( $(".likeContainer .clickTimes span:nth-child(2)").html() );
        $ (".likeContainer .clickTimes span:nth-child(2)").html( ++num );
        var doc = $(".likeContainer .ping_user").first();
        var like = $(".likeContainer .clickTimes .d_like").first();

        if( like ){
            $(".likeContainer .clickTimes span:nth-child(1)").addClass('h_like').removeClass('d_like');
        }

        if( doc ) {
            $("<a class=\"ping_user\" data-id=\""+uid+"\">"+username+"</a>銆�").insertBefore(doc);
        } else {
            $("<a class=\"ping_user\" data-id=\""+uid+"\">"+username+"</a>").insertAfter( $ (".likeContainer .clickTimes") );
        }
    }

    isping = 1;
}

/*********瀹㈡埛绔墦璧忔垚鍔�************/
var client_reward_success = function(uid, username, iconurl, gold, message){
    if( $(".gaDetails").size() == 0 ) {
        $(".gaBody").append("<div class=\"gaDetails\"><span id=\"rewardusercount\">1</span>浜鸿祻<span id=\"rewardgoldcount\">"+ gold +"</span>" + goldname + "</div><ul class=\"gaPeopleList\"><div style=\"width:105%; text-align:center;\"></div></ul>");
    } else {
        var usertotal = parseInt( $("#rewardusercount").html() );
        var goldtotal = Number( $("#rewardgoldcount").html() );
        var goldnumber = goldtotal + Number(gold);

        $("#rewardusercount").html( usertotal + 1 );
        $("#rewardgoldcount").html( goldnumber.toFixed(2) )
    }
    var removed = false;
    $(".gaPeopleList div li img").each(function(index){
        if( $(this).attr("alt") == username ){
            $(this).parent().remove();
            removed = true;
            return false;
        }
    });
    if( !removed && $(".gaPeopleList div li").size() >= 8 ) {
        $(".gaPeopleList div li").last().remove();
        removed = true;
    }
    $(".gaPeopleList div").prepend("<li><img class=\"rewardtoplist\" src=\""+iconurl+"\" alt=\""+username+"\" /></li>");
    if( deviceType == "2" ){
        box_animate();
    }
}

/*********************瀹㈡埛绔幏鍙栧叏灞€鍙傛暟********************/
var tell_client_params = function(){
    if( deviceType == "2" ) {
        QFWap.client_get_params4Android( fid, tid, touid, threadTitle, isping, isfavor, sharelink, shareimg, sharecontent,
            replies );
        QFWap.client_get_totalpage( parseInt( totalpages ),parseInt( pingnum ) );
    }

    QFWap.client_get_params( fid, tid, touid, threadTitle, isping, isfavor, sharelink, shareimg, sharecontent,
        replies, totalpages );

    QFWap.client_enable_loadmore();
}


/****鏁版嵁涓嶆柇鍒锋柊***************ok********/
var dropload = null;
var client_get_datas = function(statusfunc){
    if( hasmore ) {
        page++;
        $.ajax({
            type: 'POST',
            url: host + '/v1_5/wap/get-more',
            data: {
                'page' : page,
                'tid' : tid,
                'isSeeMaster' : isSeeMaster,
                'replyOrder' : replyOrder,
                'login_token' : login_token,
                'device' : device,
                'user_id' : user_id,
                'screen_width' : screenwidth,
                'oldornew' : 1
            },
            success: function( data ){
                //鍒ゆ柇鏄惁鍒锋柊椤甸潰
                if( data == ""){
                    page--;
                    hasmore = 0;
                }
                if( hasmore ){
                    $(".content_discuss ul.reply_container").append( data );
                    if( dropload ) {
                    }
                }else{
                    if( dropload ){
                        dropload.noData();
                        dropload.resetload();
                    }
                }
                if(typeof(statusfunc) == "function"){
                    statusfunc(hasmore);//閫氱煡瀹㈡埛绔姸鎬�
                }
                if(dropload){
                    dropload.resetload();
                }
            },
            error: function( xhr, type, error) {
                if(dropload){
                    dropload.resetload();
                }
            }
        });
    } else {
        if( dropload ){
            dropload.resetload();
        }

        if(typeof statusfunc == "function" ) {
            statusfunc(hasmore);
        }
    }
}

var client_view_reply = function(){
    window.location.href = "#threadreply";
}
/******寮曠敤鍥炲涓庝妇鎶�********/



/*********鎳掑姞杞�********/
$('.lazy_auto, .lazy').lazyload({
    "placeholder_real_img" : "",
    "placeholder_data_img" : "",
    "load" : function(e){
        $(e).css({
            "background-color" : "#FFFFFF",
            "background-image" : "none"
        });
    }
});

counter = 0;
var lazy_offset = 0;
//$(document).on("touchmove", function(e){
//    e.stopPropagation();
//    var img_doc = $("img.lazy").eq(lazy_offset)
//    if( img_doc.offset().top - $(window).scrollTop() <= 20 ) {
//        lazy_offset++;
//        counter++;
//    }
//});

/******鍥剧墖鍔犺浇閿欒***/


/****缁欏鎴风鎻愪緵鍏叡鍙傛暟*******/


/*********鎶曠エ**********/
if($(".poll").length > 0) {
    $('#pollsubmit').bind('click',function(){
        $.ajax({
            type: 'POST',
            url: host + '/v1_5/wap/vote',
            data: {
                'poll' : $("form").serialize(),
                'tid' : tid,
                'uid' : user_id
            },
            success: function( data ){
                data = eval( "(" + data + ")" );
                if( data['ret'] == 0 ){
                    $(".poll").html(data['data']);
                    alert('鎶曠エ鎴愬姛');
                }else{
                    alert(data['text']);
                }
            },
            error: function() {
            }
        });
    });
}

/****鍏虫敞褰撳墠鐢ㄦ埛**********ok***/
$(".gz").bind('click',function(){
    if(author == '鍖垮悕') {
        return false;
    }
    uid = touid;
    username = author;
    if( isfollow == 1){
        QFH5.jumpTalk(uid,username,avatar);
        return 0;
    }
    QFWap.client_follow_user( isfollow, function(){
        //鏈叧娉�
        if( isfollow == 0){
            $('.gz').removeClass('author_see');
            $('.gz').addClass('author_see_no');
            $('.gz').html("鑱婂ぉ");
            isfollow = 1;
            return 0;
        }
    })
});

$("EMBED").each(function(){
    var self = this;
    $(this).replaceWith( '<span>褰撳墠鐗堟湰涓嶆敮鎸佽瑙嗛鏍煎紡鎾斁</span>' );
});

/******************鎵撹祻********************/
// 鎵撹祻鎺掕姒�
$(document).on("click", ".rewardtoplist", function(){
    QFWap.rewardTopList();
});

// 鎵撹祻瀵硅瘽妗�
$(document).on("click", ".toreward", function(){
    var step = [];
    var tmp = rewardstep.split("-");
    if( tmp.length > 0 ){
        for( var i=0; i < tmp.length; i++ ){
            step.push( parseInt(tmp[i]) );
        }
    }
    QFH5.reward(authorid, author, avatar, rewarddesc, rewardmsgplaceholder, step, function(state, data){

    });
});

// 鏌ョ湅涔嬪墠妤煎眰
$(document).on("click", ".seelastpage" , function(){
    if( pagebefore <= 1 ){
        $("#listJumpContainer").remove();
        return false;
    }
    pagebefore--;

    $.ajax({
        type: 'POST',
        url: host + '/v1_5/wap/get-more',
        data: {
            'page' : pagebefore,
            'tid' : tid,
            'isSeeMaster' : isSeeMaster,
            'replyOrder' : replyOrder,
            'login_token' : login_token,
            'device' : device,
            'user_id' : user_id,
            'screen_width' : screenwidth,
        },
        success: function( data ){
            if(data){
                $(".content_discuss ul").prepend( data );
                if( pagebefore <= 1 ){
                    $("#listJumpContainer").next(".discuss_line").remove();
                    $("#listJumpContainer").remove();
                }
            }
        },
        error: function( xhr, type, error) {
        }
    })
});

// 鏄惁鏄烦椤�
if( page > 1 ){
    window.location.href = "#threadreply";
}

//鎵撹祻鍔ㄧ敾
function box_animate(){
    var $win = $(window);
    //璧忕殑浣嶇疆
    var b_stop = $("body").scrollTop();
    var $shang = $('#shang');
    var sw = $shang.width();
    var sh = $shang.height();
    var off = $shang.offset();
    var off_top = off.top;
    var off_left = off.left;

    var $box = $('#box1');
    var ww = $win.width();
    var ww_2 = ww - 20;
    var wh = $win.height();
    var bw = $box.width();
    var bh = $box.height();
    var diffx = (ww - bw) / 2;
    //宸﹁竟涓や釜
    var diffx_left = off_left + (sw-bw)/2;
    //鍙宠竟涓や釜
    var diffx_right = ww - off_left - sw + (sw - bw) / 2;
    //涓婇潰涓や釜
    var diffy_top = off_top + (sh - bh) / 2 - b_stop;
    //涓嬮潰涓や釜
    var diffy_bottom = wh - off_top - sh + (sh-bh)/2 + b_stop;

    $('#box1').animate({'display':'block'})
                .animate({'transform':'translate(' + diffx_left + 'px,' + diffy_top + 'px)'},300,function(){
                    $('#box1').animate({'display':'none','transform':'translate(0,0)'},100);
                });
    $('#box2').animate({'display':'block'})
                .animate({'transform':'translate(' + (-diffx_right) + 'px,' + diffy_top + 'px)'},300,function(){
                    $('#box2').animate({'display':'none','transform':'translate(0,0)'},100);
                });
    $('#box3').animate({'display':'block'})
                .animate({'transform':'translate(' + diffx_left + 'px,' + (-diffy_bottom) + 'px)'},300,function(){
                    $('#box3').animate({'display':'none','transform':'translate(0,0)'},100);
                });
    $('#box4').animate({'display':'block'})
                .animate({'transform':'translate(' + (-diffx_right) + 'px,' + (-diffy_bottom) + 'px)'},300,function(){
                    $('#box4').animate({'display':'none','transform':'translate(0,0)'},100);
                });
}

$(document).ready(function(){
    // 鏌ョ湅鍏ㄩ儴
    $(document).on("click", ".seeall", function(){
        QFWap.client_refresh_thread();
    });
    FastClick.attach(document.body);
    $(document).on('click',function(){
        if($('.discuss_pop').hasClass('test')){
            $('.discuss_pop').removeClass('test');
            $('.discuss_pop').animate({width:''},200,'ease-out');
        }
    })

    $(document).on("click",".icon-jts",function(){
        if($(".sq_box").hasClass("show6")){
            $(".sq_box").removeClass("show6");
            $(this).animate({"transform":"rotate(180deg)","-webkit-transform":"rotate(180deg)"},300);
        }else{
            $(".sq_box").addClass("show6");
            $(this).animate({"transform":"rotate(360deg)","-webkit-transform":"rotate(360deg)"},300);
        }
    });

    //涓炬姤
    $('.discuss_point .discuss_popl').live('click',function(){
        pid = $(this).next('div').attr('data-pid');
        r_authorid = $(this).next('div').attr('data-authorid');
        QFWap.client_report_userping( pid , r_authorid );
        $('.discuss_pop').removeClass('test');
        $('.discuss_pop').animate({width:''},200,'ease-out');0
        event.stopPropagation();
    })

    //寮曠敤鍥炲
    $('.discuss_point .discuss_popr').live('click',function(){
        arr = new Object();
        arr.pid = String($(this).attr('data-pid'));
        arr.author = $(this).attr('data-author');
        arr.floor = $(this).attr('data-floor');
        arr.postdate = $(this).attr('data-postdate');
        tmpdoc = $(this).parents("li").find(".reply_content").clone();
        tmpdoc.find(".has_shang").remove()
        arr.content = tmpdoc.text();
        //arr.content = $(this).attr('data-content');
        myArray[i] = arr;
        tmpdoc.remove();
        pid = arr.pid;
        r_authorid = $(this).attr('data-authorid');
        r_author = arr.author;
        i++;
        QFWap.client_comment_user( pid, r_authorid, r_author, function( pid, iconurl, username, content, imgArr  ){

            client_comment_user( pid, iconurl, username, content, imgArr );

        });//瑙﹀彂瀹㈡埛绔紩鐢ㄥ洖澶嶇殑鏂规硶

        $('.discuss_pop').removeClass('test');
        $('.discuss_pop').animate({width:''},200,'ease-out');
        event.stopPropagation();
    })

    $('.discuss_point .p_img').live('click',function(event){
        if($(this).parent().find(".discuss_pop").hasClass('test')){
            $('.discuss_pop').removeClass('test');
            $(this).parent().find('.discuss_pop').animate({width:'0'},200,'ease-out');
        }
        else
        {
            $('.discuss_pop').animate({width:'0'},200,'ease-out');
            $('.discuss_pop').removeClass('test');
            $(this).parent().find(".discuss_pop").animate({width:'3.2rem'},200,'ease-out');
            $(this).parent().find('.discuss_pop').addClass('test');
        }
        event.stopPropagation();
    })

    /********鐐硅禐褰撳墠甯栧瓙******ok*****/
    $(document).on('click','.zan',function(){
        if( isping == 1){
            return 0;
        }
        QFWap.client_ping_thread(function( uid, username, iconurl ){
            client_ping_thread( uid, username, iconurl );
        });
    })

    //鐐瑰嚮鐐硅禐鍥炬爣璺宠浆
    $(document).on('click','.ping_user',function(){
        var self = this;
        QFH5.jumpUser( parseInt( $(self).attr("data-id") ) );
    })

    //鐐瑰嚮鐢ㄦ埛锛岃烦杞敤鎴蜂釜浜轰腑蹇�
    $(document).on("click", ".view_author", function(){
        var self = this;
        QFH5.jumpUser( parseInt( $(self).attr("data-uid") ) );
    });

    //璺宠浆甯栧瓙璇︽儏
    $(document).on("click", ".view_thread", function(){
        var self = this;
        QFH5.jumpThread( parseInt( $(self).attr("data-tid") ) );
    });

    //鎵撳紑澶栭摼
    $(document).on("click", ".view_newweb", function(){
        var self = this;
        //QFH5.outOpen( $(self).attr("data-url") );
        QFWap.openUrl( $(self).attr("data-url") );
    });

    //鎵撳紑鏉垮潡
    $(document).on("click", ".view_forum", function(){
        var self = this;
        QFH5.jumpThreadList( parseInt($(self).attr("data-fid")) );
    });

    //杩涘叆甯栧瓙璇︽儏椤�
    $(document).on('click','.seemore',function(){
        QFH5.jumpThread(tid);
    })


    //鍥炲鍐呭閲岄潰鐨勫浘鐗�
    $(document).on('click','.reply_content img',function(){
        if(($(this).attr("width")<200 && $(this).attr("height")<150) || $(this).attr("data-flag")){
            return 0;
        }
        var imgsrc = $(this).attr("naturl");
        var contenter = $(this).parents(".reply_content");
        var images = $(contenter).find("img");
        var offset = 0;
        var flag = 0;
        var imagesrcs = [];
        if( images.length ) {
            $.each(images, function(index){
                var self = this;
                if(($(this).attr("width")<200 && $(this).attr("height")<150) || $(this).attr("data-flag")){
                    flag++;
                    return true;
                }
                if( $(this).attr("naturl") == imgsrc ){
                    offset = index - flag;
                }
                imagesrcs.push( $(self).attr("naturl") );
            });
        }
        QFH5.viewImages( offset, imagesrcs );
        return false;
    });

    //鍐呭鐨勫浘鐗囩偣鍑讳簨浠�
    $(document).on("click", ".content_article img", function(){
        if($(this).attr("width")<200 && $(this).attr("height")<150){
            return 0;
        }
        var imgsrc = $(this).attr("naturl");
        var contenter = $(this).parents(".content_article");
        var images = $(contenter).find("img");
        var offset = 0;
        var flag = 0;
        var imagesrcs = [];
        if( images.length ) {
            $.each(images, function(index){
                var self = this;
                if( $(self).attr("naturl") ){
                    if($(this).attr("width")<200 && $(this).attr("height")<150){
                        flag++;
                        return true;
                    }
                    if( $(this).attr("naturl") == imgsrc ){
                        offset = index -flag;
                    }
                    imagesrcs.push( $(self).attr("naturl") );
                }
                else
                {
                    flag++;
                }
            });
        }
        if( imagesrcs.length > 0 ) {
            QFH5.viewImages( offset, imagesrcs );
        }
        return false;
    });

    // 瀹㈡埛绔笂鎷夊姞杞�
    var qsf = $(".qsf").length;
    if( (qsf == 0) && !viewpid )
    {
        $('.box_discuss').dropload({
            distance : 80,
            scrollArea : window,
            loadDownFn : function(me){
                dropload = me;
                client_get_datas(null);
            }
        });
    }

    //鏀瑰彉鐐硅禐鎸夐挳棰滆壊
    //var themeSkin = $(".likeContainer .zan-icon").css("background-color");
    //if(themeSkin != themeConf) {
    //    $(".likeContainer .zan-icon").css("background-color", themeConf);
    //}

    //if( typeof QFH5ready=="function" ){
    //    QFH5ready();
    //}
});