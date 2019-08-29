import * as cs from 'classnames';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { BaseReactProps } from '../../../../shared';

import * as styles from './index.less';

export const AppHeader = (props: BaseReactProps & { basePath: string }) => {
  const { className, basePath } = props;

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
    </section>
  );
};
