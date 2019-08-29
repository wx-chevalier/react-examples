import { MenuDataItem } from '@ant-design/pro-layout';

export const menu: MenuDataItem = {
  name: 'Test',
  path: '/',
  routes: [
    {
      icon: 'dashboard',
      path: '/page-home',
      name: 'Home'
    },
    {
      icon: 'highlight',
      path: '/page-a',
      name: 'Async App'
    },
    {
      icon: 'form',
      path: '/redux-app',
      name: 'Micro App'
    },
    {
      icon: 'exception',
      path: '/exception',
      name: 'Exception'
    }
  ]
};
