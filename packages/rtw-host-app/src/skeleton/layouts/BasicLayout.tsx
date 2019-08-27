/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps
} from '@ant-design/pro-layout';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { formatMessage } from '@/i18n';

import AuthorizedWrapper from '../auth/AuthorizedWrapper';
import { RightContent } from '../decorator/GlobalHeader/RightContent';

import logo from '../../assets/logo.svg';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

/**
 * use AuthorizedWrapper check all menu item
 */
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return AuthorizedWrapper.check(item.authority, localItem, null) as MenuDataItem;
  });

const footerRender: BasicLayoutProps['footerRender'] = () => {
  return (
    <div
      style={{
        padding: '0px 24px 24px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <h3 style={{ marginRight: 16 }}>王下邀月熊</h3>
      <a href="https://github.com/wx-chevalier/m-fe-rtw">m-fe-rtw</a>
    </div>
  );
};

export const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { children } = props;

  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void => {
    console.log('global/changeLayoutCollapsed: ' + payload);
  };

  return (
    <>
      <ProLayout
        logo={logo}
        onCollapse={handleMenuCollapse}
        menuDataRender={menuDataRender}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
              defaultMessage: 'Home'
            })
          },
          ...routers
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={footerRender}
        formatMessage={formatMessage}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        {...props}
      >
        {children}
      </ProLayout>
    </>
  );
};
