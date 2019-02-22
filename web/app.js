//创建前端服务器
const express = require("express")
const app = express()

//将所有的静态资源一并托管
app.use(express.static("./views"))

app.listen(4040,() => {
    console.log("http://127.0.0.1:4040")
})