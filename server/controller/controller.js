//实现业务逻辑的处理模块
const moment = require("moment")
//载入数据库模块
const connect = require("../database/database.js")
module.exports = {
    //获取所有的数据，根据当前的页码展示当前的数据
    getAllData:(req, res) => {
        const sql = "select * from book_info order by ctime desc"
        connect.query(sql,(err, result) => {
            if (err) return res.send({
                status: 500,
                msg: "数据请求失败"+err.message,
                data: null
            })
            if (result.length <= 0) return res.send({
                status: 501,
                msg: "数据请求为空",
                data: null
            })
            res.send({
                status: 200,
                msg: "数据请求成功",
                data: result
            })
        })
    },
    // 根据id获取数据
    getBookDataById:(req, res) => {
        const id = req.query.id
        const sql = "select * from book_info where id =?"
        connect.query(sql, id, (err, result) => {
            if (err) return res.send({
                status: 500,
                msg: "数据请求失败" + err.message,
                data: null
            })
            if (result.length <= 0) return res.send({
                status: 501,
                msg: "数据请求为空",
                data: null
            })
            res.send({
                status: 200,
                msg: "数据请求成功",
                data: result
            })
        })
    },
    // 添加数据
    insertBookData:(req, res) => {
        const data = req.body
        //获取当前添加的时间
        data.ctime = moment().format("YYYY-MM-DD hh:mm:ss")
        const sql = "insert into book_info set ?"
        // 做基本的输入验证
        if (!data.bookName.trim() || !data.bookPrice.trim() || !data.bookGender.trim() || !data.bookAuthor.trim() || !data.ctime.trim()) {
            return res.send({
                status: 503,
                msg: "数据填写不完整"
            })
        }
        connect.query(sql, data, (err, result) => {
            if (err) return res.send({
                status: 500,
                msg: "数据添加失败"+err.message
            })
            if (result.affectedRows != 1) return res.send({
                status: 501,
                msg: "数据添加失败"
            })
            res.send({
                status: 200,
                msg: '数据添加成功'
            })
        })
        console.log(data)
    },
    // 对数据软删除，只将isDel修改为1
    deleteStateById:(req, res) => {
        //获取对应的id号
        const id = req.query.id
        const sql = "update book_info set isDel=1 where id=?"
        connect.query(sql, id, (err, result) => {
            if (err) return res.send({
                status: 500,
                msg: "状态删除失败"
            })
            if (result.affectedRows != 1) return res.send({
                status: 501,
                msg: "状态删除失败"
            })
            res.send({
                status: 200,
                msg: "状态删除成功"
            })
        })
    },
    // 将数据从数据库删除
    deleteDataById: (req, res) => {
        const id = req.query.id
        const sql = "delete from book_info where id = ?"
        connect.query(sql, id, (err, result) => {
            if (err) return res.send({
                status: 500,
                msg: "数据删除失败"
            })
            if (result.affectedRows != 1) return res.send({
                status: 501,
                msg: "删除的数据不存在"
            })
            res.send({
                status: 200,
                msg: "数据删除成功"
            })
        })
    },
    // 更新数据，修改数据
    updateDataById:(req, res) => {
        const data = req.body
        data.id = req.query.id
        const sql = "update book_info set ? where id=?"
        connect.query(sql, [data, data.id], (err, result) => {
            if (err) return res.send({
                status: 500,
                msg: "数据修改失败"+err.message
            })
            if (result.affectedRows != 1) return res.send({
                status: 501,
                msg: "数据修改失败"
            })
            res.send({
                status: 200,
                msg: "数据修改成功"
            })
        })
    },
    // 修复数据的删除状态
    rocoverStateById: (req, res) => {
        const id = req.query.id
        const sql = "update book_info set isDel=0 where id =?"
        connect.query(sql, id, (err, result) => {
            if (err) return res.send({
                status: 500,
                msg: "状态修改失败"
            })
            if (result.affectedRows != 1) return res.send({
                status: 501,
                msg: "状态修改失败"
            })
            res.send({
                status: 200,
                msg: "状态修改成功"
            })
        })
    },
    // 从小到大排序
    sortSmallToBig:(req, res) => {
        const sql = "select * from book_info order by bookPrice asc"
        connect.query(sql, (err, result) => {
            if (err) return res.send({
                status: 500,
                msg: "数据排序失败"
            })
            res.send({
                status: 200,
                msg: "数据排序成功",
                data: result
            })
        })
    },
    // 从大到小排序
    sortBigToSmall: (req, res) => {
        const sql = "select * from book_info order by bookPrice desc"
        connect.query(sql, (err, result) => {
            if (err) return res.send({
                status: 500,
                msg: "数据排序失败"
            })
            res.send({
                status: 200,
                msg: "数据排序成功",
                data: result
            })
        })
    },
    // 页面的分页的功能
    searchPage:(req, res) => {
       
        /// const sql = "select * from book_info order by ctime desc"
        const sql = "SELECT * FROM book_info ORDER BY ctime desc limit ?,?"
        //如果默认的没有数据，传入第一条的数据
        const nowPage = Number(req.query.nowPage) || 1
        const pageSize = Number(req.query.pageSize)
        const pianyiPage = (nowPage-1)*pageSize
        connect.query(sql,[pianyiPage,pageSize],(err, result) => {
            if (err) return res.send({
                status: 500,
                msg: "数据请求失败"+err.message,
                data: null
            })
            if (result.length <= 0) return res.send({
                status: 501,
                msg: "数据请求为空",
                data: null
            })
            res.send({
                status: 200,
                msg: "数据请求成功",
                data: result
            })
        })
    
    },
    // 搜索书名，展示
    searchData:(req,res) => {
        const bookName = req.query.bookName
        const sql =`select * from book_info where bookName LIKE '%${bookName}%'`
        connect.query(sql,(err,result) => {
            if(err) return res.send({status:500,msg:"数据获取失败",data:null})
            if(result.length<=0) return res.send({status:501,msg:"数据获取失败",data:null})
            res.send({status:200,msg:"数据获取成功",data:result})
        })
    }
}