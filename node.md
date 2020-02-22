## 安装
- 安装本地的webpack
- webpack webpack-cli -D (表示当前为开发依赖 上线时不需要)
## 可以进行0配置
- 打包工具 -》 输出后结果（js模块）
- npx webpack  运行可以打包
- 打包（支持我们js的模块化）

## 手动配置webpack
- 默认配置文件名字  webpack.config.js


## 优化
- IgnorePlugin 非常好
- webpack import 在生产环境下 会利用tree-shaking 把没用的代码自动删除，  require不会


## Tapable
- webpack本质是一种事件流的机制， 它的工作流程就是将各个插件串联起来， 而实现这个一切的核心就是Tapable，Tabable类似于node的events库，核心原理也是依赖于发布订阅模式
