import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import * as smoothscroll from 'smoothscroll-polyfill';

import App from './skeleton/App';
import store from './store/redux/store';
import { history } from './shared/env/history';

smoothscroll.polyfill();

ReactDOM.render(
  <IntlProvider locale="en">
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </ConfigProvider>
  </IntlProvider>,
  document.getElementById('root')
);
