define(["jquery","cookie"],function($){
  $(function(){
    $("form").submit(function(e){
        var userName = $("#tc_name").val();
        var pass = $("#tc_pass").val();

        // if(userName.trim()==""){
        //     alert("请输入用户名");
        //     return false;
        // }

        // if(pass.trim()==""){
        //     alert("请输入密码");
        //     return false;
        // }

         $.ajax({
            url: "/api/login",
            type: "post",
            data: {
                tc_name: userName,
                tc_pass: pass
            },
            success: function(data){
                console.log(1)
                if(data.code == 200){
                    //登录成功之后，
                    //先将后台返回用户的头像以及用户名信息
                    //保存到cookie中，为了能够让首页也使用这个信息

                    //应该先将对象转成json格式的字符串，然后再存
                    $.cookie("userinfo", JSON.stringify(data.result), {expires: 365, path: "/"});

                    // 让用户跳转到首页
                    location.href = "/";
                    // console.log(data);
                    
                }
            },
            error:function(xhr){
                console.log(xhr)
            }
        });

        return false;
    })
  })
})