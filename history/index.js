let url = ''
if (DEV === 'dev') {
    url = 'http://localhost:3000'
} else {
    url = 'http://www.baidu.com'
}
// console.log(DEV)
// console.log(typeof FLAG)
// console.log(url, 'ceshi')

// -----------------------------------------------------
import React from 'react';
import { render } from 'react-dom';
render(<h1>jsx</h1>, window.root)



// -----------------------------------------------------

import moment from 'moment';
// 手动引入所需要语言, 也就是手动引入中文包
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
let r = moment().endOf('day').fromNow()
console.log(r)
// -----------------------------------------------------

// webpack 打包我们的图片2
// 1. 在js 中创建图片来引入
// file-loader 默认在内部生成一个图片，到build目录下，还会生成的图片名字返回回来
// import test from './test.jpg' // 返回的结果返回的结果是一个新的文件地址

// let image = new Image()
// console.log(test, '图片')

// image.src = test;
// document.body.appendChild(image)

// // let str = require('./a')
// // console.log(str)
// require('./index.css')
// require('./index.less')

// let fn = () => {
//     console.log("fn")
// }
// fn()

// @log
// class A{  // new A() a= 1
//     a = 12
// }
// let a = new A()
// console.log(a.a)

// function log(target) {
//     console.log(target)
// }


// -----------------------------------------------------

// import 'bootstrap/dist/css/bootstrap.css'
// 默认访问  http：localhost：8080 webpack-dev-server 的服务  -》3000
let xhr = new XMLHttpRequest();
xhr.open('GET', '/user', true)

xhr.onload = function() {
    console.log(xhr.response)
}

xhr.send()