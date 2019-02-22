/*Author:gchent54 createTime:2018-09-12*/
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//解决跨域的问题
const cors = require("cors")
app.use(cors())
//载入路由模块
const rouetr = require("./router/router.js")
app.use(rouetr)

app.listen(6060, () => {
    console.log("http://127.0.0.1:6060")
})