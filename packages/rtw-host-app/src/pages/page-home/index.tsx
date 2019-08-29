import { Button, message } from 'antd';
import * as React from 'react';

import * as styles from './index.less';

import { themeClient } from '@/shared/env/theme';

import { ThemeColor } from './components/ThemeColor';
import { formatMessage } from '../../i18n/index';

const updateTheme = (newPrimaryColor?: string) => {
  if (newPrimaryColor) {
    const timeOut = 0;
    const hideMessage = message.loading('正在切换主题！', timeOut);
    themeClient.changeColor(newPrimaryColor).finally(() => hideMessage());
  }
};

export const Home: React.SFC = () => (
  <div className={styles.container}>
    <div>
      <img src="https://i.postimg.cc/0N7w0mnN/image.png" style={{ width: 600 }} alt="" />
    </div>
    <Button
      type="primary"
      onClick={() => {
        updateTheme('#13C2C2');
      }}
    >
      点击切换主题
    </Button>
    <ThemeColor
      formatMessage={formatMessage}
      onChange={color => {
        updateTheme(color);
      }}
    />
  </div>
);
