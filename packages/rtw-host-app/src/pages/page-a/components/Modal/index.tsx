import * as cs from 'classnames';
import * as React from 'react';

import { BaseReactProps } from '@/skeleton/types/props';

import * as styles from './index.less';

export interface ModalProps extends BaseReactProps {
  show: boolean;

  /**
   * Occurs when the modal is visible and a key is pressed down.
   */
  onKeyDown?: (e: KeyboardEvent) => void;

  /**
   * Occurs when the mask is clicked.
   */
  onMaskClick?: () => void;
}

export const Modal = (props: ModalProps) => {
  const { className, children, show, onKeyDown = noop, onMaskClick = noop } = props;
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    setVisible(prevVisible => {
      if (show !== prevVisible) {
        // From invisible to visible (or visible to invisible step 1).
        return true;
      }
      return prevVisible;
    });
  }, [show]);
  React.useEffect(() => {
    if (show) {
      document.addEventListener('keydown', onKeyDown, true);
      return () => {
        document.removeEventListener('keydown', onKeyDown, true);
      };
    }
    return;
  }, [show, onKeyDown]);
  return (
    <div
      className={cs(className, styles.container, {
        [styles.containerHide]: !visible
      })}
      onAnimationEnd={_handleAnimationEnd}
    >
      <div
        className={cs(styles.mask, {
          [styles.fadeIn]: show,
          [styles.fadeOut]: !show
        })}
        onClick={onMaskClick}
      />
      <div
        className={cs(styles.content, {
          [styles.zoomIn]: show,
          [styles.zoomOut]: !show
        })}
      >
        {children}
      </div>
    </div>
  );

  function _handleAnimationEnd() {
    if (!show) {
      // From visible to invisible step 2.
      setVisible(false);
    }
  }
};

function noop() {}
