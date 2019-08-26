import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import * as styles from './index.less';
import { AppHeader } from './components/AppHeader';
import { Counter } from './containers/Counter';
import { About } from './containers/About';

export default withRouter(({ match: { path } }) => (
  <div>
    <AppHeader basePath={path} />
    <main className={styles.main}>
      <Switch>
        <Route exact path={`${path}/count`} component={Counter} />
        <Route exact path={`${path}/about`} component={About} />
      </Switch>
    </main>
  </div>
));
