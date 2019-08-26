import * as cs from 'classnames';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { BaseReactProps } from '../../../../skeleton';

import * as styles from './index.less';

export const AppHeader = (props: BaseReactProps) => {
  const { className } = props;
  return (
    <header className={cs(className, styles.container)}>
      <nav className={styles.nav}>
        <NavLink exact to="/" className={styles.link} activeClassName={styles.active}>
          Home
        </NavLink>
        <NavLink exact to="/about" className={styles.link} activeClassName={styles.active}>
          About
        </NavLink>
      </nav>
    </header>
  );
};
