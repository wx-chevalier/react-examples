import React, { Component } from 'react';
import { connect } from 'react-redux';

import { commonActions } from '@/store/ducks/common';
import { IState } from '@/store/ducks';
import { Button } from 'antd';

export class AsyncCounterComp extends Component<any> {
  render() {
    const { count, incr } = this.props;
    return (
      <div>
        <h1>基于 Promise 的异步计数器</h1>

        <div>{count}</div>

        <Button
          onClick={() => {
            incr();
          }}
        >
          + 1
        </Button>
      </div>
    );
  }
}

export const AsyncCounter = connect(
  (state: IState) => ({
    count: state.common.count
  }),
  { ...commonActions }
)(AsyncCounterComp);
