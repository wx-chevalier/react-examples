// function组件页面的实例

import React, { FC, useState, useEffect } from 'react'
import { View, Text, Button, Input, useReady, useDidHide, useDidShow } from '@/index'
import { native } from '../../util'

import './index.css'

export const EntryPage: FC = () => {

  const [name, setName] = useState('')
  const [count, setCount] = useState(0)
  const [list, setList] = useState([
    { key: 1, value: '这是第1个' },
    { key: 2, value: '这是第2个' },
    { key: 3, value: '这是第3个' },
  ])

  useEffect(() => {
    console.log('[useEffect] Page Entry loaded!')
    return () => {
      console.log('[useEffect] Page Entry destroyed!')
    }
  }, [])

  // useReady Hook
  useReady(() => {
    console.log('[useReady] Page Entry ready')
  })

  // useDidShow
  useDidShow(() => {
    console.log('[useDidShow] Page Entry show')
  })

  // useDidHide
  useDidHide(() => {
    console.log('[useDidHide] Page Entry hide')
  })

  const increment = () => {
    setCount((val) => val + 1)
  }

  const changeName = (e: any) => {
    const value = e?.detail?.value || ''
    setName(value)
  }

  const addItem = () => {
    setList((arr) => arr.concat({ key: arr.length + 1, value: `这是第${arr.length + 1}个` }))
  }

  const deleteItem = () => {
    setList((arr) => arr.length <= 1 ? arr : arr.slice(0, -1))
  }

  const go = () => {
    native.navigateTo({
      url: '/pages/page-second/index',
    })
  }

  return (
    <View className="wrapper">
      <View style={{ color: 'blue' }}>
        <Text style={{ fontSize: '25px', fontWeight: '600' }}>style样式</Text>
        <Text className="class-sample">css样式</Text>
      </View>
      <View>列表</View>
      <View style={{ color: 'red' }}>
        {list.map((p) => {
          return <View key={p.key}>{p.value}</View>
        })}
      </View>
      <View className="inline-block">
        <Button onClick={() => addItem()} type="warn">
          增加列表item
        </Button>
        <Button onClick={() => deleteItem()} type="default">
          删除列表item
        </Button>
      </View>
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
      <View style={{ marginTop: '20px' }}>
        <Button type="default" onClick={() => go()}>
          去下一个页面
        </Button>
      </View>
    </View>
  )
}
