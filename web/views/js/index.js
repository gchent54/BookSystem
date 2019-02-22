$(function () {
  let pageNumber = null
  let pageSize = null
  //初始化之前加载获取所有的数据渲染到页面
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:6060/getAllData",
    success: function (res) {
      console.log(res)
      if (res.status == 200) {
         //总页数
        const totalPage = res.data.length
        // 每一页展示的数据
       pageSize = 6
       pageNumber = Math.ceil(totalPage / pageSize)
        //默认的当前的页码是1
        const nowPage = 1
        const pageHtml = template("pageTemp", {nowPage:nowPage,pageNumber:pageNumber})
        //渲染分页的页面
        $("#pageData").html(pageHtml)
        //当分页的的数据展示成功之后，获取每一页要展示的数据
        $.ajax({
          type:"get",
          url:"http://127.0.0.1:6060/searchPage",
          data:{pageSize,nowPage},
          success:function(res) {
            console.log(res)
            if(res.status==200) {
              const initHtml = template("initTemp", res.data)
              $("#tbody").html(initHtml)
            }
          }
        })
      }
    }
  });

  //当点击搜索图书的时候，将数据返回渲染
  $("#search").on("click", function () {
    const bookName = $("#searchData").val()
    if (!bookName.trim()) return alert("搜索的内容为空！")
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:6060/searchData",
      data: {
        bookName
      },
      success: function (res) {
        console.log(res)
        if (res.status == 200) {
          const searchHtml = template("searchTemp", res.data)
          console.log(searchHtml)
          $("#tbody").html(searchHtml)
        }
      }
    })
  })

  // 当点击添加的时候
  $("#add").on("click", function () {
    $("#header").text("添加页面")
    $('.ui.modal').modal('show')
    $("#confirm").attr("state-id", 0)
  })

  // 当点击修改的时候，将数据修改，注意，需要判断添加和修改的状态
  // 当点击添加的时候，将自定义属性修改为0，当点击修改的时候，将自定义的属性修改为1
  // 动态元素的注册点击事件采取事件委托的方式
  $("#tbody").on("click", "#update", function () {
    $("#header").text("修改页面")
    //弹出添加的表单
    $('.ui.modal').modal('show')
    $("#confirm").attr("state-id", 1)
    //获取所有的参数通过id
    const id = $(this).attr("get-id")
    //将当前数据的id也设置
    $("#confirm").attr("update-id", id)
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:6060/getBookDataById",
      data: {
        id
      },
      success: function (res) {
        //当数据获取成功之后，将数据添加到修改的表单
        if (res.status == 200) {
          $("#bookName").val(res.data[0].bookName)
          $("#bookPrice").val(res.data[0].bookPrice)
          $("#bookGender").val(res.data[0].bookGender)
          $("#bookAuthor").val(res.data[0].bookAuthor)
        }
      }
    })

  })

  //当点击确定的时候，先获取自定义的属性值，判断当前是添加还是修改的状态
  $("#confirm").on("click", function () {
    const stateId = Number($(this).attr("state-id"))
    //不管是添加还是修改，先获取表单的数据
    const data = $("#form").serialize()
    const id = $(this).attr("update-id")
    if (stateId == 1) {
      //这是修改的情况
      $.ajax({
        type: "post",
        url: "http://127.0.0.1:6060/updateDataById?id=" + id,
        data: data,
        dataType: "json",
        success: function (res) {
          if (res.status == 200) {
            location.reload()
          }
        }
      })
    } else if (stateId == 0) {
      //这是添加的情况
      $.ajax({
        type: "post",
        url: "http://127.0.0.1:6060/insertBookData",
        data: data,
        dataType: "json",
        success: function (res) {
          console.log(res)
          //当数据添加成功之后立即重新刷新页面
          location.reload()
        }
      })
    }
  })

  //状态删除按钮的事件处理
  $("#tbody").on("click", "#stateDelete", function () {
    //id的获取
    const id = $(this).attr("get-id")
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:6060/deleteStateById",
      data: {
        id
      },
      success: function (res) {
        console.log(res)
        if (res.status == 200) {
          location.reload()
        }
      }
    })
  })

  //状态恢复按钮的事件处理
  $("#tbody").on("click", "#stateRecover", function () {
    //id的获取
    const id = $(this).attr("get-id")
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:6060/rocoverStateById",
      data: {
        id
      },
      success: function (res) {
        if (res.status == 200) {
          location.reload()
        }
      }
    })
  })

  //彻底删除按钮的事件处理
  $("#tbody").on("click", "#thoroughDelete", function () {
    //id的获取
    const id = $(this).attr("get-id")
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:6060/deleteDataById",
      data: {
        id
      },
      success: function (res) {
        //当删除成功的时候，重新加载数据
        location.reload()
      }
    })
  })

  //价格降序按钮的事件的处理
  $("#sortBigToSmall").on("click", function () {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:6060/sortBigToSmall",
      success: function (res) {
        console.log(res)
        if (res.status == 200) {
          const sortHtml = template("sortBigToSmall1", res.data)
          $("#tbody").html(sortHtml)
        }
      }
    })
  })
  // 价格升序按钮的事件的处理
  $("#sortSmallToBig").on("click", function () {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:6060/sortSmallToBig",
      success: function (res) {
        console.log(res)
        if (res.status == 200) {
          const sortHtml = template("sortSmallToBig1", res.data)
          $("#tbody").html(sortHtml)
        }
      }
    })
  })

  //当点击当前页面的时候，获取当前页面的页码值,将当前的页码的class属性添加
  $("#pageData").on("click","li",function(){
    const nowPage = Number($(this).attr("get-id"))
    const pageHtml = template("pageTemp1", {nowPage:nowPage,pageNumber:pageNumber})
   
        //渲染分页的页面
    $("#pageData").html(pageHtml)
    $(this).addClass("skyblue").siblings().removeClass("skyblue")

    //根据当前是第几页请求对应的数据渲染
    $.ajax({
      type:"get",
      url:"http://127.0.0.1:6060/searchPage",
      data:{nowPage,pageSize},
      success:function(res) {
        console.log(res)
        if(res.status==200){
          const pageHtml = template("pageTemp2", res.data)
          //渲染分页的页面
        $("#tbody").html(pageHtml)
        }else if(res.status==501){
          nowPage = pageSize
        }
      }
    })
  })
})