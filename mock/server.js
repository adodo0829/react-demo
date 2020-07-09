const express = require('express')
const Mock = require('mockjs')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

// 设置跨域
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  // 此处根据前端请求携带的请求头进行配置
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Access-Token,X-Access-Token"
  );
  next();
});

let listAPI = require("./list");

app.get("/list", (req, res) => {
  res.json(Mock.mock(listAPI.getDataList(req)));
});

app.listen("3003", () => {
  console.log("mock服务器启动ing中... port: 3001");
});
