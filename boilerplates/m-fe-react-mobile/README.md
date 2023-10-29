![](https://i.postimg.cc/0N7w0mnN/image.png)

# m-fe/react-mobile

m-fe-rm 是 [fe-boilerplates](https://github.com/wx-chevalier/fe-boilerplates) 的一部分，其基于 React & TS & Webpack & APICloud 提供快速移动端应用开发的能力。

# Develop

根目录下是 APICloud 的项目结构，具体的 Web 项目参考 / 目录下。

```sh
# 拉取并且提取出子项目
$ git clone https://github.com/wx-chevalier/m-fe-rm

# 添加全局的依赖更新工具
$ yarn global add npm-check-updates

# 为各个子项目安装依赖，以及链接各个子项目
$ yarn bootstrap && yarn build

# 执行预编译操作，其会启动双开发服务器
$ yarn start

# 执行 Lint 操作
$ yarn lint

# 前往 api-cloud 目录，执行远程热更新
# 使用 VSCode APICloud 插件进行 WiFi 同步
```

![WiFi 同步示意](https://s2.ax1x.com/2019/11/27/Qp7xyt.png)

值得说明的是，微前端作为概念对于不同人承载了不同的考量，其实现方式、落地路径也是见仁见智，若有不妥，敬请指教。

## Features

- 状态管理，灵活支持 Redux/MobX/Dva 等不同的状态管理框架，对于 Redux 提供全局统一的 Store 声明。

- 模块分割，非 APP 类可单独发布，APP 类可单独运行，与发布。发布版本可包含 ES, CJS, UMD 等，dist 目录下包含 ES/CJS 模块，build 目录下包含 APP 完整资源以及 UMD 模块。

- 应用编排：版本控制、应用注册、应用路由，子应用资源不使用 Hash 方式，而是使用语义化版本，`/[cdnHost]/[projectName]/[subAppName]/[x.y.z]/index.{js,css}`。

- 动态主题与样式切换，- 样式，LESS 文件支持 CSS Modules，CSS/SCSS 使用标准 CSS。

- 权限控制

- 路由与导航框架

- 国际化

- PWA

- 服务端渲染

## CI

m-fe-rm 内置了 Gitlab CI 的完整流程，请参考 .gitlab-ci.yml 及 scripts/{deploy, docker} 中的配置。

## Nav | 关联项目

- [react-snippets](https://github.com/wx-chevalier/react-snippets): React Snippets(.ts/.tsx), about design patterns/techniques used while developing with React and TypeScript.

- [vue-snippets](https://github.com/wx-chevalier/vue-snippets): Vue Snippets(.js/.ts), about design patterns/techniques used while developing with Vue and JavaScript/TypeScript.

- [m-fe-configs](https://github.com/wx-chevalier/m-fe-configs)：Common Dev Configs(ESLint, Prettier, Husky, etc.) for Micro-Frontend Apps

- [m-fe-rm](https://github.com/wx-chevalier/m-fe-rm): Micro-Frontend boilerplate with React & TypeScript & Webpack, for complicated cooperative applications. | 微前端项目模板

- [m-fe-vtw](https://github.com/wx-chevalier/m-fe-vtw): Micro-Frontend boilerplate with Vue & TypeScript & Webpack, for complicated cooperative applications. | 微前端项目模板

- [fractal-components](https://github.com/wx-chevalier/fractal-components): Massive Fractal Components in Several Libraries(Vanilla, React, Vue, Weapp), for building your great apps easily again

- [Legoble](https://github.com/wx-chevalier/Legoble): Build your apps like stacking Lego blocks 💫 总想自己实现一款可视化配置的动态应用构建工具，动态表单、动态布局、动态报告、动态规则、动态选择、动态流程

# About

## Copyright & More | 延伸阅读

笔者所有文章遵循[知识共享 署名 - 非商业性使用 - 禁止演绎 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh)，欢迎转载，尊重版权。您还可以前往 [NGTE Books](https://ng-tech.icu/books/) 主页浏览包含知识体系、编程语言、软件工程、模式与架构、Web 与大前端、服务端开发实践与工程架构、分布式基础架构、人工智能与深度学习、产品运营与创业等多类目的书籍列表：

[![NGTE Books](https://s2.ax1x.com/2020/01/18/19uXtI.png)](https://ng-tech.icu/books/)
