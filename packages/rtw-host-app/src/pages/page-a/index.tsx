import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import * as styles from './index.less';
import { AppHeader } from './components/AppHeader';
import { Counter } from './containers/Counter';
import { About } from './containers/About';

export default () => (
  <div>
    <AppHeader />
    <main className={styles.main}>
      <Switch>
        <Route exact path="/" component={Counter} />
        <Route exact path="/about" component={About} />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
);
