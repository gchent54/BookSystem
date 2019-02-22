// 载入数据库的模块，将数据库处理的模块抽离
const mysql = require("mysql")
const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'root',
    database: "node_002",
    useConnectionPooling: true
})
//对外暴露接口以供调用
module.exports = connect