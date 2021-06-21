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
              },
              /* {
                path: '/todo',
                name: 'todo',
                icon: 'UnorderedListOutlined',
                component: './Todo',
              }, */
              
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
