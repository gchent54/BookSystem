// 本页面负责路由的分发以及路由规则的制定
const express = require("express")
const router = express.Router()
//载入controller的逻辑处理文件
const ctrl = require("../controller/controller.js")
//初始化页面的时候请求所有的数据渲染到页面上面
router.get("/getAllData",ctrl.getAllData)

//通过id获取当前的这一条的数据，传递的参数：id
router.get("/getBookDataById",ctrl.getBookDataById)

//添加图书，传递的参数：booKName，bookPrice，bookGender，bookAuthor，ctime在服务器端处理
router.post("/insertBookData",ctrl.insertBookData)

// 软删除数据，传递d的参数：id
router.get("/deleteStateById",ctrl.deleteStateById)

// 实际删除数据的操作接口，传递的参数：id
router.get("/deleteDataById",ctrl.deleteDataById)

//数据修改的功能，传递的参数：id，booKName，bookPrice，bookGender，bookAuthor
router.post("/updateDataById",ctrl.updateDataById)

// 软删除恢复的功能，传递的参数：id
router.get("/rocoverStateById",ctrl.rocoverStateById)

// 按照价格从小到大排序，传递的参数：无
router.get("/sortSmallToBig",ctrl.sortSmallToBig)

// 按照价格的从大到小排序，传递的参数:无
router.get("/sortBigToSmall",ctrl.sortBigToSmall)

// 分页获取数据的接口，传递的参数：nowPage，pageSize
router.get("/searchPage",ctrl.searchPage)

//根据书名搜索数据,传递的参数：无
router.get("/searchData",ctrl.searchData)

//对外暴露接口以供调用
module.exports = router