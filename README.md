# 简介
[播客茶馆导航](http://m.bokechaguan.com/)是一个播客相关资源的导航网站，包含播客推荐和播客相关资源。如果您希望查看该站的相关介绍，请点击这个[链接](https://coderdusk.com/post/podcast-teahouse/)。

# 项目介绍
这个项目包含前端（移动端）和后端的代码，分别在两个相应的文件夹。项目基于 uni-app ，分别导入即可运行，后端基于 uniCloud ，可以实现无服务器免费运行。前端桌面端在计划中。

# 技术栈
- uni-app / uniCloud
- 移动端：uView UI
- 管理后台：uniCloud Admin / ElementUI

# 如何运行
（1）下载 uni-app 官方 IDE HBuilderX (https://www.dcloud.io/hbuilderx.html)

（2）将后端代码文件夹导入到 HBuilderX 中

（3）到 [uniCloud 控制台](https://unicloud.dcloud.net.cn/home) 创建一个阿里云服务空间

（4）在 HBuilderX 中的项目的 uniCloud 文件夹右击，绑定刚刚创建的服务空间

![导入项目](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6fec5402-1210-4b81-9949-97c1987784b9/8a1c199f-5672-4238-a1ae-ecacc820577d.png)

（5）右键 cloudfunctions 文件夹，上传所有云函数、公共模块及actions

（6）右键 database ，上传所有数据集合Schema及扩展校验函数

（7）在顶部菜单栏中， 运行 - 运行到浏览器 ，选择一个浏览器

（8）首次使用，可以通过登录页面底部链接创建一个超级管理员（仅允许创建一次），该接口会判断系统里如果有 admin 角色的用户，就不再允许添加新的超级管理员。
注意：注册完毕后，建议从登录页面移除该链接

（9）将移动端代码文件夹导入 HBuilderX 并运行

（10）在 uniCloud 控制台设置跨域配置

（11）如果您只在本地运行，比如管理后台如果只一个人使用完全可以只在本地运行，直接通过 HBuilderX 内置的 NodeJS 服务器运行并管理就可以了。如果您需要把它们，比如移动端放在公网上访问，可以部署在自己的服务器上，也可以开通 uniCloud 的前端网页托管，然后根据需要绑定域名、上传SSL证书、配置跨域

# 雇用我
我现在正在寻找一份远程前端工作，全职、兼职、项目外包皆可。如果您有工作机会可以提供，欢迎通过邮箱(coderdusk@qq.com)或微信（hellodusk）联系我。
