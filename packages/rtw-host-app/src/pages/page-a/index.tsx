import * as React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import * as styles from './index.less';
import { AppHeader } from './components/AppHeader';
import { Counter } from './containers/Counter';
import { About } from './containers/About';
import { AsyncCounter } from './containers/AsyncCounter';

export default withRouter(({ match: { path } }) => (
  <div style={{ padding: 16 }}>
    <AppHeader basePath={path} />
    <main className={styles.main}>
      <Switch>
        <Route exact path={`${path}/count`} component={Counter} />
        <Route exact path={`${path}/async-count`} component={AsyncCounter} />
        <Route exact path={`${path}/about`} component={About} />
        <Redirect to={`${path}/count`} />
      </Switch>
    </main>
  </div>
));
