import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Exception } from '../src/decorators/Exception';

storiesOf('Exception', module).add(
  'with text',
  () => <Exception onClick={action('clicked')}>Hello Button</Exception>,
  {
    info: { inline: true }
  }
);
