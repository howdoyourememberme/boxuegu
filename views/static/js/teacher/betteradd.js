define(["jquery","template","utils","form"],function($,template,utils){
  var id = utils.getQueryObj().id;
  if(id){
    $.ajax({
      url:"/api/teacher/edit",
      data:{
        tc_id: id
      },
      success:function(data){
        if(data.code == 200){
          data.result.title = "编辑讲师",
          data.result.btnText = "保 存";
          data.result.url = "/api/teacher/update";
          renderData(data.result);
        }
      }
    })
  }else{
    var obj = {
      title: "添加讲师",
      btnText: "添 加",
      url: "/api/teacher/add"
    }
    renderData(obj);
  }

  function renderData(data){
    var html = template("teacher_add_edit_tpl",data);
    $(".body,.teacher").html(html);
  }

  $(".body,.teacher").on("submit","form",function(){
    $(this).ajaxSubmit({
      success:function(data){
        if(data.code == 200){
          location.href = "/teacher/list"
        }
      }
    })
    return false;
  })
})