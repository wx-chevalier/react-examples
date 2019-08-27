import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import * as React from 'react';
import { formatMessage } from '@/i18n';

export default () => (
  <Result
    status="404"
    title="404"
    style={{
      background: 'none'
    }}
    subTitle={formatMessage({
      id: 'exception-404.description.404',
      defaultMessage: 'Sorry, the page you visited does not exist.'
    })}
    extra={
      <Link to="/">
        <Button type="primary">
          {formatMessage({ id: 'exception-404.exception.back', defaultMessage: 'Back Home' })}
        </Button>
      </Link>
    }
  />
);
