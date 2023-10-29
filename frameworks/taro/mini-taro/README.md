## mini-taro 实现一个react版本的Taro原型
> 本项目以核心代码700行左右的代码量，实现了一套Taro运行时原型，可以帮助大家更好得理解Taro原理；
>> 配套的技术文章：https://juejin.cn/post/7055597134279606286

#### 能力说明

1. 基本运行时能力与Taro接近，支持将多个react语法构建的页面渲染到小程序上；
2. 支持react类组件，react函数组件，支持react hooks；支持使用css样式文件；
3. 实现了基本的事件系统、生命周期系统；支持useReady/useDidShow/useDidHide等hooks；
4. mini-taro侧重于运行时，构建层做简单实现；

#### 文件夹层级说明
```
/* 核心文件夹 */
-dist  // 产物文件夹
-demo  // demo页面React组件、应用配置文件夹
-src  // 本项目实现的Taro原型运行时核心代码

/* 其他文件夹 */
-build   // 构建辅助文件夹（相当于loader）
-scripts  // 打包脚本/模版文件

```
#### 体验

1. 安装依赖（npm install或yarn）；
2. 执行yarn build构建，（会先删除dist文件夹）生成新的dist文件夹，然后使用小程序IDE预览dist文件即可；
3. 注意：本项目默认支持**头条小程序**，另外可支持**微信小程序**，编译微信小程序时要修改webpack.config.js如下配置：
```
/**
 * 【小程序类型配置】
 * 对应小程序类型的配置，默认是字节小程序，另外支持微信小程序，需修改配置：
 * const globalObject = 'wx'
 * const fileType = {
 *  templ: '.wxml',
 *  style: '.wxss',
 * }
 */

const globalObject = 'tt';
const fileType = {
  templ: '.ttml',
  style: '.ttss',
}

```
4. 关于windows下删除dist文件夹失败的情况，尝试全局安装rimraf: `npm install rimraf -g`；
5. 如果要支持头条小程序、微信小程序之外的小程序，参考[文档](./SUPPORT.md)；

#### 效果

1. 渲染出的小程序页面

<img src="https://user-images.githubusercontent.com/17704150/149286811-945474f4-3dec-425e-8652-b492fe0765c6.png" width="200" />

<img src="https://user-images.githubusercontent.com/17704150/150515009-57a11144-bd1f-4357-b40f-da5a2f1bc1b1.gif" width="200" />

2. 对应的React页面组件

```
import React, { FC, useState } from 'react'
import { View, Text, Button, Input } from '@/index'

import './index.css'

export const EntryPage: FC = () => {

  const [name, setName] = useState('')
  const [count, setCount] = useState(0)
  const [list, setList] = useState([
    { key: 1, value: '这是第1个' },
    { key: 2, value: '这是第2个' },
    { key: 3, value: '这是第3个' },
  ])

  const increment = () => {
    setCount((val) => val + 1)
  }

  const changeName = (e: any) => {
    const value = e?.detail?.value || ''
    setName(value)
  }
  
  // ... 省略

  return (
    <View className="wrapper">
      <View style={{ color: 'blue' }}>
        <Text style={{ fontSize: '25px', fontWeight: '600' }}>style样式</Text>
        <Text className="class-sample">css样式</Text>
      </View>
      <!-- ...省略 -->
      <View style={{ margin: '20px 0' }}>
        <Text>count: {count}</Text>
        <Button onClick={() => increment()} type="primary">
          数字加一
        </Button>
      </View>
      <View>
        <Text>name: {name}</Text>
        <Input
          style={{ border: '1px solid blue' }}
          onInput={(e) => changeName(e)}
        />
      </View>
    </View>
  )
}

```
