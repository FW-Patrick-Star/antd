/*
 * @Author: your name
 * @Date: 2021-06-16 09:17:20
 * @LastEditTime: 2021-06-24 09:16:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \antd\config\routes.js
 */
export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/login',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/login',
            component: './Login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                redirect: '/dashboard',
              },
              {
                path: '/dashboard',
                name: 'DashBoard',
                icon: 'PieChartOutlined',
                component: './DashBoard',
              },
              {
                path: '/user',
                name: 'User',
                icon: 'UserOutlined',
                component: './User',
              },
              {
                path: '/goods',
                name: 'Goods',
                icon: 'ShoppingOutlined',
                component: './Goods',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
