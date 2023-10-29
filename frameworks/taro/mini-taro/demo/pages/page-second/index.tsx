// class组件页面

import React from 'react'
import { View, Text, Button } from '@/index'
import TestFunctionComp from '../../component/test-comp'
import { native } from '../../util'

export class SecondPage extends React.Component<unknown, { text: string }> {

  constructor(props: Record<string, unknown>) {
    super(props)
    this.state = {
      text: '你好呀，这里是第二个页面！'
    }
  }

  public changeText() {
     this.setState({ text: '今天是好天气' })
  }

  public returnEntry() {
    native.navigateBack()
  }

  render() {
    return  <View className="wrapper" style={{ marginTop: '20px', padding: '10px' }}>
      <Text style={{ color: 'red' }}>{this.state.text}</Text>
      <Button style={{ margin: '10px 0' }} type="primary" onClick={() => this.changeText()}>修改文字</Button>
      <Button type="primary" onClick={() => this.returnEntry()}>返回上页面</Button>
      <TestFunctionComp />
    </View>
  }
}
