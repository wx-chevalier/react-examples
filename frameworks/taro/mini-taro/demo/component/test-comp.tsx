// 普通function组件

import React, { FC, useEffect, useState } from 'react'
import { View, Text } from '@/index'

const TestComp: FC<{}> = () => {
  const [content, set] = useState('（准备更新function组件）')
  useEffect(() => {
    // 2s 后更新数字
    const t1 = setTimeout(() => {
      set('（更新成功）')
    }, 2000)
    return () => {
      clearTimeout(t1)
    }
  }, [])

  return <View style={{ color: 'blue', marginTop: '10px', border: '1px solid red' }}>
    <Text>这里是function组件</Text>
    <Text>{content}</Text>
  </View>
}

export default TestComp
