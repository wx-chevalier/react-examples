## 支持头条/微信小程序之外的小程序
#### 1. 修改webpack.config.js 
（1）修改globalObject和fileType改为对应小程序配置

（2）修改CopyPlugin插件配置，将对应小程序Taro的base模版拷贝到产物
#### 2. Taro的base模版
需在Taro构建的小程序项目中，在产物中获取base.xxxx类似模版文件，将模版文件通过CopyPlugin插件，按路径拷贝到产物即可。
