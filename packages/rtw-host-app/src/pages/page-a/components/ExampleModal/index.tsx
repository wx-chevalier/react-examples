import * as cs from 'classnames';
import * as React from 'react';
import { useInterval } from 'react-fxxking-hooks';

import { BaseReactProps } from '@/skeleton/types';

import { Modal } from '../Modal';

import * as styles from './index.less';

export interface ExampleModalProps extends BaseReactProps {
  show: boolean;

  onOK?: () => void;
  onCancel?: () => void;
}

function noop() {}

export const ExampleModal = (props: ExampleModalProps) => {
  const { className, show, onOK = noop, onCancel = noop } = props;

  // The following is a simple example of how to use React hooks.
  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    // Reset time.
    setTime(0);
  }, [show]);
  useInterval(() => setTime(prevTime => prevTime + 1), 1000, !show);

  return (
    <Modal className={cs(className)} show={show} onKeyDown={_handleKeyDown} onMaskClick={onCancel}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h6>Dialog</h6>
        </header>
        <div className={styles.main}>
          <div>Press Esc or click the buttons.</div>
          <div>
            Time Elapsed: <span className={styles.time}>{`${time}s`}</span>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={cs(styles.btn, styles.btnCancel)} onClick={onCancel}>
            Cancel
          </div>
          <div className={cs(styles.btn, styles.btnOK)} onClick={onOK}>
            OK
          </div>
        </div>
      </div>
    </Modal>
  );

  function _handleKeyDown(e: KeyboardEvent) {
    // Escape to cancel.
    if (e.keyCode === 27) {
      onCancel();
    }
  }
};
