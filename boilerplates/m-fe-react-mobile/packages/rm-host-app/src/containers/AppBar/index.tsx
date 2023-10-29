import { Icon, NavBar } from 'antd-mobile';
import React, { Component } from 'react';

export interface AppBarProps {
  title: string;
  rightClick?: () => void;
}

export class AppBar extends Component<AppBarProps> {
  render(): JSX.Element {
    const { title, rightClick } = this.props;
    if (rightClick) {
      return (
        <NavBar
          mode="dark"
          icon={<Icon type="left" size="lg" onClick={() => {}} />}
          rightContent={
            <Icon
              type="search"
              style={{ marginRight: '16px' }}
              onClick={() => {
                rightClick();
              }}
            />
          }
        >
          {title}
        </NavBar>
      );
    } else {
      return (
        <NavBar
          mode="dark"
          icon={<Icon type="left" size="lg" onClick={() => {}} />}
        >
          {title}
        </NavBar>
      );
    }
  }
}
