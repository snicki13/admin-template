/**
 * 这里的 defaultRoutes 是为了在一开始对接项目的时候，后端人员还没有准备好菜单接口，导致前端开发者不能进入主页面。
 * 所以这里返回默认的菜单数据，同时也向大家说明菜单数据的数据结构。后端的菜单接口一定要按这个格式去返回json数据，否则会解析菜单失败
 */
export default [
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
      },
    ],
  },
  {
    menuUrl: '/system',
    menuName: 'System',
    icon: 'icon-settings',
    parentPath: '',
    routeName: 'system',
    children: [
      {
        parentPath: '/system',
        menuUrl: '/system/department',
        menuName: 'SystemDepartment',
        routeName: 'department',
        localFilePath: '/system/local-path/department',
      },
      {
        parentPath: '/system',
        menuUrl: '/system/user',
        menuName: 'User',
        routeName: 'user',
        isRootPath: true,
      },
      {
        parentPath: '/system',
        menuUrl: '/system/role',
        menuName: 'Rollen',
      },
      {
        parentPath: '/system',
        menuUrl: '/system/menu',
        menuName: 'Menu',
      },
    ],
  },
]
