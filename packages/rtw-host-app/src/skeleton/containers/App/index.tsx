import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';

import store from '@/skeleton/env/store';

import { Module, manifest } from '../../../manifest';
import { Exception404 } from '../../components/exception/404';
import { NavLayout } from '../../layouts/NavLayout';
import AppContainer from '../AppContainer';

import * as styles from './index.less';

export interface IAppProps extends RouteComponentProps {}

export interface IAppState {}

export class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {};
  }

  renderRoute(appId: string, app: Module) {
    if (app.component) {
      return <Route key={appId} path={`/${appId}`} component={app.component} />;
    }

    if (!app.loader || typeof app.loader !== 'function') {
      throw new Error(`${appId} loader is not defined or defined wrongly`);
    }

    return (
      <Route
        key={appId}
        path={`/${appId}`}
        component={() => (
          <AppContainer
            appId={appId}
            appLoader={app.loader!}
            onAppendReducer={store.appendReducer}
          />
        )}
      />
    );
  }

  render() {
    const { location } = this.props;
    const routes = Object.keys(manifest);

    return (
      <section className={styles.container}>
        <NavLayout matchedPath={location.pathname} disableContentMargin={false}>
          <Switch>
            <Route exact={true} path="/">
              <Redirect to={routes[0]} />
            </Route>
            {routes.map(r => this.renderRoute(r, manifest[r]))}
            <Route component={() => <Exception404 />} />
          </Switch>
        </NavLayout>
      </section>
    );
  }
}

export default connect(state => ({ ...state }), {})(withRouter(App));
