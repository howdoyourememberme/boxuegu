define(["jquery","template","cookie"],function($,template){
  $(function(){


    //没登录跳转到登录页面
    if(location.pathname != "/dashboard/login"){
        if(!$.cookie("PHPSESSID")){
            location.href = "/dashboard/login";
        }
        var userinfo = JSON.parse($.cookie("userinfo"));
        // console.log(userinfo);
        var html = template("profile_tpl",userinfo);
        $("#profile").html(html);
    }  

    //课程显示
    
    $(".navs>ul>li>ul").parent().click(function(){
        $(this).children("ul").stop().slideToggle();
    })

    //侧边栏高亮
    $(".navs a").each(function(index,element){
        if($(element).attr("href") == location.pathname){
            $(element).addClass("active");
        }
    })


    //退出功能
    $("#logout_btn").click(function(){
        $.ajax({
            url:"/api/logout",
            type:"post",
            success:function(data){
                console.log(data);
                if(data.code == 200){
                    location.href = "/dashboard/login";
                }
            }
        })
    })












  })
})
