import { LAYOUT } from '@/store/keys'

export const asyncRoutes = [
  {
    path: '/index',
    component: LAYOUT,
    name: 'Index',
    meta: {
      title: 'Dashboard',
      iconPrefix: 'iconfont',
      icon: 'dashboard',
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/index/main.vue'),
        meta: {
          title: 'Main console',
          affix: true,
          cacheable: true,
          iconPrefix: 'iconfont',
          icon: 'menu',
        },
      },
      {
        path: 'work-place',
        name: 'WorkPlace',
        component: () => import('@/views/index/work-place.vue'),
        meta: {
          title: 'Workbench',
          affix: true,
          iconPrefix: 'iconfont',
          icon: 'menu',
        },
      },
    ],
  },
]
