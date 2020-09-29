- [x] :trophy:JSX
- [x] :dart:rangeAPI
- [x] :dart:add setState
- [x] :dart:add demo
- [x] :dart:fix range bug
- [x] :trophy:complete setState
- [x] :dart:virtual DOM
- [x] :dart:entity DOM
- [ ] :trophy:dom comparison

[English](./README.EN.md) | 简体中文

<p align="center"><img width="200" src="https://ae01.alicdn.com/kf/Ue4d9024a61f64bf486ac1eebe45596daU.jpg"></p>

<p align="center">
  <a href="https://circleci.com/gh/vuejs/vue/tree/dev"><img src="https://img.shields.io/circleci/project/github/vuejs/vue/dev.svg" alt="Build Status"></a>
  <a href="https://codecov.io/github/vuejs/vue?branch=dev"><img src="https://img.shields.io/codecov/c/github/vuejs/vue/dev.svg" alt="Coverage Status"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/v/vue.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/l/vue.svg" alt="License"></a>
</p>


# 开发笔记

- [生态](#生态)
- [必须收藏的资源](#必须收藏的资源)
- [快速入门](#快速入门)
  - [安装](#安装)
  - [用法](#用法)
- [贡献者们](#贡献者们)
- [维护者](#维护者)
- [感谢](#感谢)
- [License](#license)

### 特性

- 构建简易版 虚拟DOM树 ,完成虚拟DOM到实体DOM的映射, 模拟了简单的 diff算法
- 已经支持一些小型demo的渲染和运行

## 参考资料

- [21天造React](https://zhuanlan.zhihu.com/p/29869797)
- [React接口文档](https://reactjs.org/docs/implementation-notes.html)

## 快速入门

### 安装

```bash
$ cd simulated-React    # please ignore this command if you executed 'omi init' in an empty folder
$ npm webpack           # develop
```

目录说明:

```
├─ main.js
├─ package-json
├─ simulated_react.js   // 主要的逻辑代码
├─ dist
│  ├─ main.html         // html和CSS文件入口
│  ├─ main.js           // 存放webpack打包代码的位置
| ├─ launch.json
```

[→ simple demo]()

## 贡献者们

<table>
    <tbody>
        <tr>
            <td>
                <a target="_blank" href="https://github.com/gloomyKevin"><img width="60px" src="https://avatars1.githubusercontent.com/u/47132374?s=460&u=a4cddb370a56c1c4253607dcf5ba96b524c6a989&v=4"></a>
            </td>
        </tr>
    </tbody>
</table>

## 维护者

- [gloomyKevin](https://github.com/gloomyKevin)


## License

- [MIT]()


