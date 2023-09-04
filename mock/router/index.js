import { getMenuList } from '@/api/url'
import Mock from 'mockjs'

export const adminRoutes = [
  {
    menuUrl: '/index',
    menuName: 'Dashborad',
    routeName: 'dashborad',
    icon: 'icon-dashboard',
    parentPath: '',
    children: [
      {
        parentPath: '/index',
        menuUrl: '/index/home',
        menuName: 'Main console',
        routeName: 'home',
      },
      {
        parentPath: '/index',
        menuUrl: '/index/work-place',
        menuName: 'Workbench',
        routeName: 'workPlace',
        isRootPath: true,
      },
    ],
  },
  {
    menuUrl: '/system',
    menuName: 'System Management',
    iconPrefix: 'iconfont',
    icon: 'setting',
    parentPath: '',
    children: [
      {
        parentPath: '/system',
        menuUrl: '/system/department',
        menuName: 'Department management',
        badge: 'new',
        localFilePath: '/system/local-path/department',
        routeName: 'my-department',
      },
      {
        parentPath: '/system',
        menuUrl: '/system/user',
        menuName: 'User Management',
        badge: 'dot',
      },
      {
        parentPath: '/system',
        menuUrl: '/system/role',
        menuName: 'Role management',
        badge: '12',
      },
      {
        parentPath: '/system',
        menuUrl: '/system/menu',
        menuName: 'Menu management',
      },
    ],
  },
  {
    menuUrl: '/list',
    menuName: 'List page',
    iconPrefix: 'iconfont',
    icon: 'detail',
    parentPath: '',
    children: [
      {
        parentPath: '/list',
        menuUrl: '/list/table-with-search',
        menuName: 'Form search',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/table-custom',
        menuName: 'Custom form',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/list',
        menuName: 'Ordinary list',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/card-list',
        menuName: 'Card list',
      },
    ],
  },
  {
    menuUrl: '/form',
    menuName: 'Table page',
    badge: 'dot',
    iconPrefix: 'iconfont',
    icon: 'file-text',
    parentPath: '',
    children: [
      {
        parentPath: '/form',
        menuUrl: '/form/base-form-view',
        menuName: 'Dynamic form',
        cacheable: true,
      },
      {
        parentPath: '/form',
        menuUrl: '/form/advance-form',
        menuName: 'High -level form',
        cacheable: true,
      },
      {
        parentPath: '/form',
        menuUrl: '/form/step-form',
        menuName: 'Stepping table',
      },
    ],
  },
  {
    menuUrl: '/other',
    menuName: 'Function/component',
    iconPrefix: 'iconfont',
    icon: 'appstore',
    parentPath: '',
    children: [
      {
        parentPath: '/other',
        menuUrl: '/other/chart',
        menuName: 'chart',
        children: [
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/icon',
            menuName: 'icon',
          },
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/echarts',
            menuName: 'echarts',
          },
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/icon-selector',
            menuName: 'Icon selector',
          },
        ],
      },
      {
        parentPath: '/other',
        menuUrl: '/other/print',
        menuName: 'Print',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/badge',
        menuName: 'notification',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/clipboard',
        menuName: 'Clipboard',
      },
      {
        parentPath: '/other',
        menuUrl: 'http://www.vueadminwork.com',
        menuName: 'External link (official website)',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/qrcode',
        menuName: 'QR code',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/css-animation',
        menuName: 'CSS animation',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/player',
        menuName: 'player',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/big-preview',
        menuName: 'Preview',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/city-selector',
        menuName: 'Provincial and city selector',
      },
    ],
  },
  {
    menuUrl: '/result',
    menuName: 'Results page',
    iconPrefix: 'iconfont',
    icon: 'file-unknown',
    parentPath: '',
    children: [
      {
        parentPath: '/result',
        menuUrl: '/result/success',
        menuName: 'Successful page',
      },
      {
        parentPath: '/result',
        menuUrl: '/result/fail',
        menuName: 'Failed page',
      },
    ],
  },
  {
    menuUrl: '/editor',
    menuName: 'editor',
    badge: '12',
    iconPrefix: 'iconfont',
    icon: 'edit',
    parentPath: '',
    children: [
      {
        parentPath: '/editor',
        menuUrl: '/editor/rich-text',
        menuName: 'Rich text',
      },
      {
        parentPath: '/editor',
        menuUrl: '/editor/markdown',
        menuName: 'markdown',
      },
    ],
  },
  {
    menuUrl: '/draggable',
    menuName: 'Drag',
    iconPrefix: 'iconfont',
    icon: 'interation',
    parentPath: '',
    children: [
      // {
      //   parentPath: '/draggable',
      //   menuUrl: '/draggable/dialog-draggable',
      //   menuName: '拖拽对话框',
      // },
      {
        parentPath: '/draggable',
        menuUrl: '/draggable/card-draggable',
        menuName: 'Drag',
        cacheable: true,
      },
    ],
  },
  {
    menuUrl: '/next',
    menuName: 'Multi -level menu',
    iconPrefix: 'iconfont',
    icon: 'Partition',
    parentPath: '',
    children: [
      {
        parentPath: '/next',
        menuUrl: '/next/menu1',
        menuName: 'menu-1',
        cacheable: true,
      },
      {
        parentPath: '/next',
        menuUrl: '/next/menu2',
        menuName: 'menu-2',
        children: [
          {
            parentPath: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-1',
            menuName: 'menu-2-1',
            children: [
              {
                parentPath: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-1',
                menuName: 'menu-2-1-1',
                cacheable: true,
              },
              {
                parentPath: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-2',
                menuName: 'menu-2-1-2',
              },
            ],
          },
          {
            parentPath: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-2',
            menuName: 'menu-2-2',
            cacheable: true,
          },
        ],
      },
    ],
  },
  {
    menuUrl: '/map',
    menuName: 'map',
    iconPrefix: 'iconfont',
    icon: 'location',
    children: [
      {
        parentPath: '/map',
        menuUrl: '/map/gaode',
        menuName: 'Gaode Map',
      },
      {
        parentPath: '/map',
        menuUrl: '/map/baidu',
        menuName: 'Baidu map',
      },
    ],
  },
  {
    menuUrl: '/project',
    menuName: 'Project information',
    iconPrefix: 'iconfont',
    icon: 'detail',
    isSingle: true,
    children: [
      {
        parentPath: '/project',
        menuUrl: '/project/infomation',
        menuName: 'Project dependence',
      },
    ],
  },
]
export const editorRoutes = [
  {
    menuUrl: '/list',
    menuName: 'List page',
    iconPrefix: 'iconfont',
    icon: 'detail',
    parentPath: '',
    children: [
      {
        parentPath: '/list',
        menuUrl: '/list/table-with-search',
        menuName: 'Form search',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/table-custom',
        menuName: 'Custom form',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/list',
        menuName: 'Ordinary list',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/card-list',
        menuName: 'Card list',
      },
    ],
  },
  {
    menuUrl: '/form',
    menuName: 'Table page',
    badge: 'dot',
    iconPrefix: 'iconfont',
    icon: 'file-text',
    parentPath: '',
    children: [
      {
        parentPath: '/form',
        menuUrl: '/form/base-form-view',
        menuName: 'Dynamic form',
        cacheable: true,
      },
      {
        parentPath: '/form',
        menuUrl: '/form/advance-form',
        menuName: 'High -level form',
        cacheable: true,
      },
      {
        parentPath: '/form',
        menuUrl: '/form/step-form',
        menuName: 'Stepping table',
      },
    ],
  },
  {
    menuUrl: '/other',
    menuName: 'Function/component',
    iconPrefix: 'iconfont',
    icon: 'appstore',
    parentPath: '',
    children: [
      {
        parentPath: '/other',
        menuUrl: '/other/chart',
        menuName: 'chart',
        children: [
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/icon',
            menuName: 'icon',
          },
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/echarts',
            menuName: 'echarts',
          },
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/icon-selector',
            menuName: 'Icon selector',
          },
        ],
      },
      {
        parentPath: '/other',
        menuUrl: '/other/print',
        menuName: 'Print',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/badge',
        menuName: 'notification',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/clipboard',
        menuName: 'Clipboard',
      },
      {
        parentPath: '/other',
        menuUrl: 'http://www.baidu.com',
        menuName: 'External chain',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/qrcode',
        menuName: 'QR code',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/css-animation',
        menuName: 'CSS animation',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/flow',
        menuName: 'flow chart',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/player',
        menuName: '播放器',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/big-preview',
        menuName: '大图预览',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/city-selector',
        menuName: '省市区选择器',
      },
    ],
  },
  {
    menuUrl: '/result',
    menuName: '结果页面',
    iconPrefix: 'iconfont',
    icon: 'file-unknown',
    parentPath: '',
    children: [
      {
        parentPath: '/result',
        menuUrl: '/result/success',
        menuName: '成功页面',
      },
      {
        parentPath: '/result',
        menuUrl: '/result/fail',
        menuName: '失败页面',
      },
    ],
  },
  {
    menuUrl: '/editor',
    menuName: '编辑器',
    badge: '12',
    iconPrefix: 'iconfont',
    icon: 'edit',
    parentPath: '',
    children: [
      {
        parentPath: '/editor',
        menuUrl: '/editor/rich-text',
        menuName: '富文本',
      },
      {
        parentPath: '/editor',
        menuUrl: '/editor/markdown',
        menuName: 'markdown',
      },
    ],
  },
  {
    menuUrl: '/next',
    menuName: '多级菜单',
    iconPrefix: 'iconfont',
    icon: 'Partition',
    parentPath: '',
    children: [
      {
        parentPath: '/next',
        menuUrl: '/next/menu1',
        menuName: 'menu-1',
        cacheable: true,
      },
      {
        parentPath: '/next',
        menuUrl: '/next/menu2',
        menuName: 'menu-2',
        children: [
          {
            parentPath: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-1',
            menuName: 'menu-2-1',
            children: [
              {
                parentPath: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-1',
                menuName: 'menu-2-1-1',
                cacheable: true,
              },
              {
                parentPath: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-2',
                menuName: 'menu-2-1-2',
              },
            ],
          },
          {
            parentPath: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-2',
            menuName: 'menu-2-2',
            cacheable: true,
          },
        ],
      },
    ],
  },
  {
    menuUrl: '/map',
    menuName: '地图',
    iconPrefix: 'iconfont',
    icon: 'location',
    children: [
      {
        parentPath: '/map',
        menuUrl: '/map/gaode',
        menuName: '高德地图',
      },
      {
        parentPath: '/map',
        menuUrl: '/map/baidu',
        menuName: '百度地图',
      },
    ],
  },
  {
    menuUrl: '/project',
    menuName: '项目信息',
    iconPrefix: 'iconfont',
    icon: 'detail',
    isSingle: true,
    children: [
      {
        parentPath: '/project',
        menuUrl: '/project/infomation',
        menuName: '项目依赖',
      },
    ],
  },
]

Mock.mock(RegExp(getMenuList), 'post', function () {
  return Mock.mock({ code: 200, data: adminRoutes, msg: '获取菜单列表成功' })
})
