import { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import useUserStore from './user'
import router from '@/router'
import { baseAddress, getMenuListByRoleId } from '@/api/url'
import { post } from '@/api/http'
import defaultRoutes from '@/router/routes/default-routes'
import { findRootPathRoute, generatorRoutes, mapTwoLevelRouter } from '../help'
import { constantRoutes } from '@/router/routes/constants'

const usePermissionStore = defineStore('permission-route', {
  state: () => {
    return {
      permissionRoutes: [] as RouteRecordRaw[],
    }
  },
  getters: {
    getPermissionSideBar(state) {
      return state.permissionRoutes.filter((it) => {
        return it.meta && !it.meta.hidden
      })
    },
    getPermissionSplitTabs(state) {
      return state.permissionRoutes.filter((it) => {
        return it.meta && !it.meta.hidden && it.children && it.children.length > 0
      })
    },
  },
  actions: {
    async getRoutes(data: { userId: number; roleId: number }) {
      try {
        if (getMenuListByRoleId) {
          const res = await post({
            url: baseAddress + getMenuListByRoleId,
            // In actual development, this place can be replaced with token to allow the back end to analyze user information to obtain Userid and ROLEID. The front -end can pass Userid and ROLEID.
            // This can increase security
            data,
          })
          return generatorRoutes(res.data)
        } else {
          return generatorRoutes(defaultRoutes)
        }
      } catch (error) {
        console.log(
          'The routing loading fails, please clear the cookie and localStorage, and log in again; if the real interface has been adopted, please make sure the menu interface address is true available and returned.'
        )
        return []
      }
    },
    async initPermissionRoute() {
      const userStore = useUserStore()
      // 加载路由
      const accessRoutes = await this.getRoutes({
        roleId: userStore.roleId,
        userId: userStore.userId,
      })
      const mapRoutes = mapTwoLevelRouter(accessRoutes)
      mapRoutes.forEach((it: any) => {
        router.addRoute(it)
      })
      // 配置 `/` 路由的默认跳转地址
      router.addRoute({
        path: '/',
        redirect: findRootPathRoute(accessRoutes),
        meta: {
          hidden: true,
        },
      })
      // 这个路由一定要放在最后
      router.addRoute({
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        meta: {
          hidden: true,
        },
      })
      this.permissionRoutes = [...constantRoutes, ...accessRoutes]
    },
    isEmptyPermissionRoute() {
      return !this.permissionRoutes || this.permissionRoutes.length === 0
    },
    reset() {
      this.$reset()
    },
  },
})

export default usePermissionStore
