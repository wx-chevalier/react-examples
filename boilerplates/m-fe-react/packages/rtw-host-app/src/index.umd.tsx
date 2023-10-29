import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as smoothscroll from 'smoothscroll-polyfill';

import App from './skeleton/containers/App';
import { history } from './skeleton/env/history';
import store from './skeleton/env/store';

export let importApp: Function | null = null;

export function render(_importApp: Function) {
  smoothscroll.polyfill();
  importApp = _importApp;

  ReactDOM.render(
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </ConfigProvider>,
    document.getElementById('root'),
  );
}

export default App;
