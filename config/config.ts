// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'star web',
    locale: false,
    siderWidth: 208,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/back',
      layout: true,
      routes: [

        {
          path: '/back/account',
          component: './admin/account.jsx',
        },
      ]
    },
    {
      path: '/test',
      layout: false,
      component: './mypage',
      // routes: [],
      routes: [
        {
          path: '/test/content',
          component: './content',
        },
        {
          path: '/test/upload',
          component: './upload',
        },
        {
          path: '/test/userinfo',
          component: './userinfo',
        },
        {

          path: '/test/videopage',
          component: './videopage',
        },
      ]
    },
    {
      path: '/user',
      // layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },

    {
      path: '/admin',
      name: '用户管理',
      icon: 'crown',
      routes: [
        {
          name: '账号管理',
          icon: 'table',
          path: '/admin/users',
          component: './admin/account.jsx',
        },
      ],
    },
    {
      path: '/tag',
      name: '标签相关',
      icon: 'crown',
      routes: [
        {
          name: '标签管理',
          icon: 'table',
          path: '/tag/list',
          component: './tag/index.jsx',
        },
      ],
    }
    ,
    {
      path: '/',
      redirect: '/test/content',
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
