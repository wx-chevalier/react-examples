import { Icon, Tooltip } from 'antd';
import React from 'react';

import * as styles from './index.less';

export interface TagProps {
  color: string;
  check: boolean;
  className?: string;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = ({ color, check, ...rest }) => (
  <div {...rest} style={{ backgroundColor: color }}>
    {check ? <Icon type="check" /> : ''}
  </div>
);

export interface ThemeColorProps {
  colors?: {
    key: string;
    color: string;
  }[];
  title?: string;
  value?: string;
  onChange?: (color: string) => void;
  formatMessage: (data: { id: any; defaultMessage?: string }) => string;
}

export const ThemeColor: React.FC<ThemeColorProps> = ({
  colors,
  title,
  value,
  onChange,
  formatMessage,
}) => {
  const colorList = colors || [
    {
      key: 'dust',
      color: '#F5222D',
    },
    {
      key: 'volcano',
      color: '#FA541C',
    },
    {
      key: 'sunset',
      color: '#FAAD14',
    },
    {
      key: 'cyan',
      color: '#13C2C2',
    },
    {
      key: 'green',
      color: '#52C41A',
    },
    {
      key: 'daybreak',
      color: '#1890FF',
    },
    {
      key: 'geekblue',
      color: '#2F54EB',
    },
    {
      key: 'purple',
      color: '#722ED1',
    },
  ];
  return (
    <div className={styles.themeColor}>
      <h3 className={styles.themeColorTitle}>{title}</h3>
      <div className={styles.themeColorContent}>
        {colorList.map(({ key, color }) => (
          <Tooltip
            key={color}
            title={formatMessage({ id: `app.setting.themecolor.${key}` })}
          >
            <Tag
              className={styles.themeColorBlock}
              color={color}
              check={value === color}
              onClick={() => onChange && onChange(color)}
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
