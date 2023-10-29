import { ConnectedRouter } from 'connected-react-router';
import dayjs from 'dayjs';
import timeZone from 'dayjs-ext/plugin/timeZone';
import zh from 'dayjs/locale/zh-cn';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import badMutable from 'dayjs/plugin/badMutable';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isMoment from 'dayjs/plugin/isMoment';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { App, history, store } from './skeleton';

import './index.less';

dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(badMutable);
dayjs.extend(customParseFormat);
dayjs.extend(isMoment);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(localeData);
dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(timeZone);
dayjs.extend(utc);

dayjs.locale(zh);

ReactDOM.render(
  <IntlProvider locale="en">
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </IntlProvider>,
  document.getElementById('root'),
);
