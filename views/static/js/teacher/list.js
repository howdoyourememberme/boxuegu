define(["jquery","template","bootstrap"],function($,template){
  $(function(){
    $.ajax({
      url: "/api/teacher",
      success:function(data){
        console.log(data);
        $("#teacher_list_tbody").html(template("teacher_list_tpl",data));
      }
    });

    // 给所有查看按钮注册点击事件
    $("#teacher_list_tbody").on("click",".check-info",function(){
      var id = $(this).parent().data("id");
      $.ajax({
        url:"/api/teacher/view",
        data:{
          tc_id:id
        },
        success:function(data){
          var html = template("teacher_modal_tpl", data.result);
          $("#teacherModal>.modal-dialog").html(html);

          $("#teacherModal").modal("show");
        }
      })
    });
    //tc_status==0  已启用
    //tc_status==1  已注销
    $("#teacher_list_tbody").on("click",".btn-status",function(){
      var id = $(this).parent().data("id");
      var status = $(this).data("status");
      var that = $(this);
      $.ajax({
        url:"/api/teacher/handle",
        type:"post",
        data:{
          tc_id: id,
          tc_status: status
        },
        success:function(data){
          if(data.code==200){
            if(data.result.tc_status == 1){
              that.removeClass("btn-warning").addClass("btn-success").text("启 用");
            }else{
              that.removeClass("btn-success").addClass("btn-warning").text("注 销");
            }
            that.data("status",data.result.tc_status);
          }
        }
      })
    })
  })
})
