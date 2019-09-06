import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import * as smoothscroll from 'smoothscroll-polyfill';

import 'antd/dist/antd.less'; // 引入官方提供的 less 样式入口文件

import App from './skeleton/containers/App';
import store from './store/store';
import { history } from './skeleton/env/history';

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
