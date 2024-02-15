import { RouteRecordRaw } from 'vue-router';

import planetRouter from 'src/modules/planet/router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'planets',
  },
  {
    path: '/planets',
    ...planetRouter,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/NotFound/NotFound.vue'),
  },
];

export default routes;
