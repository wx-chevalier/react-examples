import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Route, Redirect, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';

import 'antd/dist/antd.less'; // 引入官方提供的 less 样式入口文件

import { Exception } from 'rtw-components';

import * as styles from './index.less';
import { manifest, Module } from '../manifest';
import AppContainer from '../../shared/AppContainer';
import store from '../../store/redux/store';
import { BasicLayout } from '../layouts/BasicLayout';

export interface IAppProps extends RouteComponentProps {}

export interface IAppState {}

export class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {};
  }

  renderRoute(appId: string, app: Module) {
    if (!app.loader || typeof app.loader !== 'function') {
      throw new Error(`${app.name} loader is not defined or defined wrongly`);
    }

    return (
      <Route
        key={appId}
        path={`/${appId}`}
        component={() => (
          <AppContainer
            appId={appId}
            appLoader={app.loader}
            onAppendReducer={store.appendReducer}
          />
        )}
      />
    );
  }

  render() {
    const routes = Object.keys(manifest);

    return (
      <section className={styles.container}>
        <BasicLayout breadcrumbNameMap={{}}>
          <Switch>
            <Route exact={true} path="/">
              <Redirect to={routes[0]} />
            </Route>
            {routes.map(r => this.renderRoute(r, manifest[r]))}
            <Route component={() => <Exception />} />
          </Switch>
        </BasicLayout>
      </section>
    );
  }
}

export default connect(
  state => ({ ...state }),
  {}
)(withRouter(App));
