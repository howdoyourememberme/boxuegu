define(["jquery","template","utils","form"],function($,template,utils){


  var id = utils.getQueryObj().id;


  if(id){
    // 先添加
    $.ajax({
      url:"/api/teacher/edit",
      type:"post",
      data:{
        tc_id:id
      },
      success:function(data){
        console.log(data);
        data.result.title = "编辑讲师";
        data.result.btnText = "保 存";
        data.result.url = "/api/teacher/update";
        var html = template("teacher_add_edit_tpl",data.result);
        $(".body,.teacher").html(html);

        //给保存按钮注册点击事件
        $("#save-btn").click(function(){
          $.ajax({
            url: "/api/teacher/update",
            type: "post",
            data: $("form").serialize(),
            success: function(data){
              if(data.code == 200){
                location.href = "/teacher/list"
              }
            }
          })
          return false;
        })
      }
    })
  }else{
    //再编辑

    var obj = {
      title:"添加讲师",
      btnText:"添加",
      url:"/api/teacher/add"
    }

    var html = template("teacher_add_edit_tpl",obj);
    $(".body,.teacher").html(html);
    
    $("#save-btn").click(function(){
      //1. 获取用户输入的内容
      // var data = $("form").serialize()
      //2. 将这些内容通过ajax请求发送给后台进行保存
      $.ajax({
        url: "/api/teacher/add",
        type: "post",
        data: $("form").serialize(),
        success: function(data){
          if(data.code == 200){
            location.href = "/teacher/list"
          }
        }
      })
      //3. 保存成功之后调回列表页
      // console.log($("form").serialize());
      // console.log(data);
      
      //阻止表单的默认提交
      return false;
    });
  }
})