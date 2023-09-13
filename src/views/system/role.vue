<template>
  <div class="main-container">
    <TableBody>
      <template #header>
        <TableHeader :show-filter="false">
          <template #top-right>
            <AddButton @add="onAddItem" />
          </template>
        </TableHeader>
      </template>
      <template #default>
        <n-data-table
          :loading="tableLoading"
          :data="dataList"
          :columns="tableColumns"
          :row-key="rowKey"
        />
      </template>
    </TableBody>
    <ModalDialog ref="modalDialogRef" @confirm="onDataFormConfirm">
      <template #content>
        <DataForm ref="dataFormRef" :options="formItems" />
      </template>
    </ModalDialog>
    <ModalDialog ref="menuModalDialogRef" title="Menu permissions" contentHeight="40vh">
      <template #content>
        <n-tree
          :data="menuData"
          checkable
          block-line
          cascade
          :default-expanded-keys="defaultExpandedKeys"
          :default-checked-keys="defaultCheckedKeys"
        />
      </template>
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getMenuListByRoleId, getRoleList } from '@/api/url'
  import {
    TableActionModel,
    useRenderAction,
    useRowKey,
    useTable,
    useTableColumn,
  } from '@/hooks/table'
  import { DataFormType, ModalDialogType, FormItem } from '@/types/components'
  import { DataTableColumn, NInput, TreeOption, useDialog, useMessage } from 'naive-ui'
  import { defineComponent, h, nextTick, onMounted, ref, shallowReactive } from 'vue'
  interface RoleModeType {
    roleName: string
    roleCode: string
    description: string
  }
  const ROLE_CODE_FLAG = 'ROLE_'
  const formItems = [
    {
      label: 'Role Name',
      type: 'input',
      key: 'name',
      value: ref(null),
      validator: (formItem, message) => {
        if (!formItem.value.value) {
          message.error('Please enter the character name')
          return false
        }
        return true
      },
      render: (formItem) => {
        return h(NInput, {
          value: formItem.value.value,
          onUpdateValue: (val) => {
            formItem.value.value = val
          },
          placeholder: 'Please enter the character name',
        })
      },
    },
    {
      label: 'Character number',
      key: 'roleCode',
      value: ref(null),
      maxLength: 20,
      validator: (formItem, message) => {
        if (!formItem.value.value) {
          message.error('Please enter the character code')
          return false
        }
        return true
      },
      render: (formItem) => {
        return h(
          NInput,
          {
            value: formItem.value.value,
            onUpdateValue: (val) => {
              formItem.value.value = val
            },
            placeholder: 'Please enter the character description',
          },
          {
            prefix: () => h('div', ROLE_CODE_FLAG),
          }
        )
      },
    },
    {
      label: 'Character description',
      key: 'description',
      value: ref(null),
      maxLength: 50,
      inputType: 'text',
      validator: (formItem, message) => {
        if (!formItem.value.value) {
          message.error('Please enter the character name')
          return false
        }
        return true
      },
      render: (formItem) => {
        return h(NInput, {
          value: formItem.value.value,
          onUpdateValue: (val) => {
            formItem.value.value = val
          },
          placeholder: 'Please enter the character description',
          type: 'textarea',
          rows: 3,
        })
      },
    },
  ] as FormItem[]
  function handleMenuData(
    menuData: Array<any>,
    defaultCheckedKeys: Array<string>,
    defaultExpandedKeys: Array<string>
  ) {
    const tempMenus = [] as Array<TreeOption>
    menuData.forEach((it) => {
      const tempMenu = {} as TreeOption
      tempMenu.key = it.menuUrl
      tempMenu.label = it.menuName
      defaultCheckedKeys.push(tempMenu.key as string)
      if (it.children) {
        defaultExpandedKeys.push(tempMenu.key as string)
        tempMenu.children = handleMenuData(it.children, defaultCheckedKeys, defaultExpandedKeys)
      }
      tempMenus.push(tempMenu)
    })
    return tempMenus
  }
  export default defineComponent({
    name: 'Role',
    setup() {
      const modalDialogRef = ref<ModalDialogType | null>(null)
      const dataFormRef = ref<DataFormType | null>(null)
      const menuModalDialogRef = ref<ModalDialogType | null>(null)
      const table = useTable<RoleModeType>()
      const rowKey = useRowKey('id')
      const naiveDialog = useDialog()
      const message = useMessage()
      const menuData = shallowReactive([] as Array<TreeOption>)
      const tableColumns = useTableColumn(
        [
          table.selectionColumn,
          table.indexColumn,
          {
            title: 'Role Name',
            key: 'name',
          },
          {
            title: 'Character number',
            key: 'roleCode',
          },
          {
            title: 'Character description',
            key: 'description',
          },
          {
            title: 'Creation time',
            key: 'createTime',
          },
          {
            title: 'operate',
            key: 'actions',
            render: (rowData) => {
              return useRenderAction([
                {
                  label: 'edit',
                  onClick: onUpdateItem.bind(null, rowData),
                },
                {
                  label: 'delete',
                  type: 'error',
                  onClick: onDeleteItem.bind(null, rowData),
                },
                {
                  label: 'Menu permissions',
                  type: 'success',
                  onClick: onShowMenu.bind(null, rowData),
                },
              ] as TableActionModel[])
            },
          },
        ],
        {
          align: 'center',
        } as DataTableColumn
      )
      const defaultCheckedKeys = shallowReactive([] as Array<string>)
      const defaultExpandedKeys = shallowReactive([] as Array<string>)
      function doRefresh() {
        post<Array<RoleModeType>>({
          url: getRoleList,
          data: {},
        })
          .then((res) => {
            table.handleSuccess(res)
          })
          .catch(console.log)
      }
      function onAddItem() {
        modalDialogRef.value?.toggle()
        nextTick(() => {
          dataFormRef.value?.reset()
        })
      }
      function onUpdateItem(item: any) {
        modalDialogRef.value?.toggle()
        nextTick(() => {
          formItems.forEach((it) => {
            const key = it.key
            const propName = item[key]
            if (propName) {
              if (it.key === 'roleCode') {
                it.value.value = propName.replace(ROLE_CODE_FLAG, '')
              } else {
                it.value.value = propName
              }
            }
          })
        })
      }
      function onDeleteItem(data: any) {
        naiveDialog.warning({
          title: 'hint',
          content: 'Do you want to delete this menu?',
          positiveText: 'delete',
          onPositiveClick: () => {
            message.success(
              'The simulation menu is successfully deleted, the parameter is' + JSON.stringify(data)
            )
          },
        })
      }
      function onDataFormConfirm() {
        if (dataFormRef.value?.validator()) {
          modalDialogRef.value?.toggle()
          naiveDialog.success({
            title: 'hint',
            positiveText: 'Sure',
            content:
              'The simulation menu is successfully added, the parameter is:' +
              JSON.stringify(dataFormRef.value.generatorParams()),
          })
        }
      }
      function onShowMenu(item: any) {
        post({
          url: getMenuListByRoleId,
          data: {
            roleId: item.id,
          },
        })
          .then((res) => {
            menuData.length = 0
            menuData.push(...handleMenuData(res.data, defaultCheckedKeys, defaultExpandedKeys))
            menuModalDialogRef.value?.toggle()
          })
          .catch(console.log)
      }
      onMounted(doRefresh)
      return {
        modalDialogRef,
        menuModalDialogRef,
        dataFormRef,
        rowKey,
        menuData,
        tableColumns,
        formItems,
        defaultCheckedKeys,
        defaultExpandedKeys,
        ...table,
        onAddItem,
        onDataFormConfirm,
      }
    },
  })
</script>
