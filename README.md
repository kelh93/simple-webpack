# simple-webpack
使用ast实现简单的webpack打包

## 分析入口文件
1. 根据入口文件配合babylon生成ast代码,分析出里面的依赖关系
2. 根据依赖关系和wepack实现commonjs,配合tempalte生成最终的文件.