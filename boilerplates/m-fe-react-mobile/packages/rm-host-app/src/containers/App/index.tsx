import { Button } from 'antd-mobile';
import cn from 'classnames';
import React from 'react';

import { AppBar } from '../AppBar';

import styles from './index.less';

export interface AppProps {
  className?: string;
  style?: Record<string, string | number>;
}

export const App = ({ className, style }: AppProps) => {
  return (
    <div className={cn(className, styles.container)} style={style}>
      <AppBar title="Test" />
      <Button type="primary">a</Button>
    </div>
  );
};
