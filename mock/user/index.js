import { getMenuListByRoleId, getAllMenuByRoleId, login, updateUserInfo } from '@/api/url'
import { randomString } from '@/utils'
import Mock from 'mockjs'
import { baseData } from '../base.ts'
import { adminRoutes, editorRoutes } from '../router'

Mock.mock(RegExp(login), 'post', function (options) {
  const username = JSON.parse(options.body).username
  const data = {}
  if (username === 'admin') {
    baseData.code = 200
    baseData.msg = 'login successful'
    data.nickName = 'Super administrator'
    data.userName = 'admin'
    data.userId = 1
    data.roleId = 1
    data.token = randomString(100)
    data.roles = [
      {
        roleCode: 'ROLE_admin',
        roleId: 1,
        roleName: 'Super administrator',
      },
    ]
    baseData.data = data
  } else if (username === 'editor') {
    baseData.code = 200
    baseData.msg = 'login successful'
    data.nickName = 'editor'
    data.userName = 'editor'
    data.userId = 2
    data.roleId = 2
    data.token = randomString(100)
    data.roles = [
      {
        roleCode: 'ROLE_editor',
        roleId: 2,
        roleName: 'Website editor',
      },
    ]
    baseData.data = data
  } else {
    baseData.code = 500
    baseData.data = ''
    baseData.msg = 'wrong user name or password'
  }
  return Mock.mock(baseData)
})

Mock.mock(RegExp(getAllMenuByRoleId), 'post', function (options) {
  const roleId = JSON.parse(options.body).roleId || ''
  if (!roleId) {
    return Mock.mock({ code: 500, data: '', msg: 'Get the menu list failed' })
  }
  const allRoutes = [...adminRoutes]
  allRoutes.forEach((it) => {
    it.isSelect = parseInt(roleId) === 1 || it.menuUrl.indexOf('authority') === -1
    it.children.forEach((child) => {
      child.isSelect = parseInt(roleId) === 1 || child.menuUrl.indexOf('authority') === -1
    })
  })
  return Mock.mock({ code: 200, data: allRoutes, msg: 'Get the menu list success' })
})

Mock.mock(RegExp(getMenuListByRoleId), 'post', function (options) {
  const roleId = JSON.parse(options.body).roleId || ''
  if (!roleId) {
    return Mock.mock({ code: 500, data: '', msg: 'Get the menu list failed' })
  }
  if (parseInt(roleId) === 1) {
    // 超级管理员
    return Mock.mock({ code: 200, data: adminRoutes, msg: 'Get the menu list success' })
  } else if (parseInt(roleId) === 2) {
    // 编辑
    return Mock.mock({
      code: 200,
      data: editorRoutes,
      msg: 'Get the menu list success',
    })
  } else {
    return Mock.mock({
      code: 500,
      data: '',
      msg: 'Currently only supports super administrators and editor menu menus',
    })
  }
})

Mock.mock(RegExp(updateUserInfo), 'post', function () {
  return Mock.mock({ ...baseData, msg: 'Update information success' })
})
