import { Radio, message } from 'antd';
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
      <img src="https://i.postimg.cc/0N7w0mnN/image.png" style={{ width: 800 }} alt="" />
    </div>

    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginTop: 24, marginRight: 16 }}>
        <h4>点击切换角色：</h4>
        <Radio.Group onChange={() => {}} defaultValue="user" size="small">
          <Radio.Button value="user">普通用户</Radio.Button>
          <Radio.Button value="admin">管理员</Radio.Button>
        </Radio.Group>
      </div>
      <ThemeColor
        title={'点击切换主题：'}
        formatMessage={formatMessage}
        onChange={color => {
          updateTheme(color);
        }}
      />
    </div>
  </div>
);
