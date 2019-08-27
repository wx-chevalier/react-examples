import { Button, message } from 'antd';
import * as cs from 'classnames';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { BaseReactProps } from '../../../../shared';

import * as styles from './index.less';
import { themeClient } from '@/shared/env/theme';

export const AppHeader = (props: BaseReactProps & { basePath: string }) => {
  const { className, basePath } = props;

  const updateTheme = (newPrimaryColor?: string) => {
    if (newPrimaryColor) {
      const timeOut = 0;
      const hideMessage = message.loading('正在切换主题！', timeOut);
      themeClient.changeColor(newPrimaryColor).finally(() => hideMessage());
    }
  };

  return (
    <section>
      <header className={cs(className, styles.container)}>
        <nav className={styles.nav}>
          <NavLink
            exact
            to={`${basePath}/count`}
            className={styles.link}
            activeClassName={styles.active}
          >
            Count
          </NavLink>
          <NavLink
            exact
            to={`${basePath}/about`}
            className={styles.link}
            activeClassName={styles.active}
          >
            About
          </NavLink>
        </nav>
      </header>
      <Button
        type="primary"
        onClick={() => {
          updateTheme('#13C2C2');
        }}
      >
        点击切换主题
      </Button>
    </section>
  );
};
