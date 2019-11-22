import * as React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { AppHeader } from './components/AppHeader';
import { About } from './containers/About';
import { AsyncCounter } from './containers/AsyncCounter';
import { Counter } from './containers/Counter';

import * as styles from './index.less';

export default withRouter(({ match: { path } }) => (
  <div style={{ padding: 16 }}>
    <AppHeader basePath={path} />
    <main className={styles.main}>
      <Switch>
        <Route exact={true} path={`${path}/count`} component={Counter} />
        <Route
          exact={true}
          path={`${path}/async-count`}
          component={AsyncCounter}
        />
        <Route exact={true} path={`${path}/about`} component={About} />
        <Redirect to={`${path}/count`} />
      </Switch>
    </main>
  </div>
));
