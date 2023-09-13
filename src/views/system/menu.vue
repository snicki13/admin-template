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
          :row-key="rowKey"
          :columns="tableColumns"
        />
      </template>
    </TableBody>
    <ModalDialog ref="modalDialog" @confirm="onConfirm" content-height="50vh">
      <template #content>
        <DataForm ref="dataForm" :options="itemFormOptions" />
      </template>
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { defineComponent, h, onMounted, ref, Ref, unref } from 'vue'
  import { post } from '@/api/http'
  import { getMenuList } from '@/api/url'
  import {
    TableActionModel,
    useRenderAction,
    useRowKey,
    useTable,
    useTableColumn,
  } from '@/hooks/table'
  import { NIcon, useDialog, useMessage } from 'naive-ui'
  import { TableColumn } from 'naive-ui/lib/data-table/src/interface'
  import SvgIcon from '@/components/svg-icon/index.vue'
  import IconSelector from '@/components/common/IconSelector.vue'
  import { DataFormType, ModalDialogType, FormItem } from '@/types/components'
  import { renderInput, renderSwitch, renderTreeSelect } from '@/hooks/form'
  import { isExternal, transformTreeSelect } from '@/utils'
  import { findRouteByUrl } from '@/store/help'
  import usePermissionStore from '@/store/modules/permission'
  export default defineComponent({
    name: 'Menu',
    setup() {
      let actionModel = 'add'
      let tempItem: { menuUrl: string } | null = null
      const table = useTable()
      const naiveDialog = useDialog()
      const message = useMessage()
      const permissionStore = usePermissionStore()
      const modalDialog = ref<ModalDialogType | null>(null)
      const dataForm = ref<DataFormType | null>(null)
      const rowKey = useRowKey('menuUrl')
      const tableColumns = useTableColumn(
        [
          {
            title: 'Menu name',
            key: 'menuName',
          },
          {
            title: 'Menu address',
            key: 'menuUrl',
          },
          {
            title: 'Menu icon',
            key: 'icon',
            render: (rowData) => {
              return rowData.iconPrefix === 'iconfont'
                ? h(SvgIcon, {
                    prefix: rowData.iconPrefix ? (rowData.iconPrefix as string) : 'iconfont',
                    name: rowData.icon ? (rowData.icon as string) : 'menu',
                  })
                : h(NIcon, null, {
                    default: () => {
                      return h(
                        'svg',
                        {
                          'aria-hidden': false,
                        },
                        {
                          default: () => {
                            return [
                              h('use', {
                                href: '#icon-menu',
                              }),
                            ]
                          },
                        }
                      )
                    },
                  })
            },
          },
          {
            title: 'isCached',
            key: 'cacheable',
            render: (rowData) => {
              return h('div', null, { default: () => (rowData.cacheable ? 'yes' : 'no') })
            },
          },
          {
            title: 'isHidden',
            key: 'hidden',
            render: (rowData) => {
              return h('div', null, { default: () => (rowData.hidden ? 'yes' : 'no') })
            },
          },
          {
            title: 'fixTitle',
            key: 'affix',
            render: (rowData) => {
              return h('div', null, { default: () => (rowData.affix ? 'yes' : 'no') })
            },
          },
          {
            title: 'actions',
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
              ] as TableActionModel[])
            },
          },
        ],
        {
          align: 'center',
        } as TableColumn
      )
      const itemFormOptions = [
        {
          label: 'parentMenu',
          key: 'parentPath',
          value: ref(null),
          validator: (formItem, message) => {
            if (!formItem.value.value) {
              message.error('Please select the upper menu')
              return false
            }
            return true
          },
          render: (formItem) =>
            renderTreeSelect(
              formItem.value,
              transformTreeSelect(unref(table.dataList)!, 'menuName', 'menuUrl'),
              {
                showPath: true,
              }
            ),
        },
        {
          label: 'Menu name',
          key: 'menuName',
          required: true,
          value: ref(null),
          render: (formItem) =>
            renderInput(formItem.value, {
              placeholder: 'Please enter the menu name',
            }),
        },
        {
          label: 'Menu address',
          key: 'menuUrl',
          required: true,
          value: ref(null),
          disabled: ref(false),
          render: (formItem) =>
            renderInput(formItem.value, {
              placeholder: 'Please enter the menu address',
              disabled: (formItem.disabled as Ref<boolean>).value,
            }),
          reset: (formItem) => {
            formItem.value.value = null
            ;(formItem.disabled as Ref<boolean>).value = false
          },
        },
        {
          label: 'External link address',
          key: 'outLink',
          value: ref(null),
          render: (formItem) =>
            renderInput(formItem.value, {
              placeholder: 'Please enter the external link address',
            }),
        },
        {
          label: 'Menu icon',
          key: 'icon',
          value: ref(null),
          render: (formItem) => {
            return h(IconSelector, {
              defaultIcon: formItem.value.value,
              onUpdateIcon: (newIcon: any) => {
                formItem.value.value = newIcon.name
              },
            })
          },
        },
        {
          label: 'Whether to cache',
          key: 'cacheable',
          value: ref(false),
          render: (formItem) => renderSwitch(formItem.value),
        },
        {
          label: 'Whether to hide',
          key: 'hidden',
          value: ref(false),
          render: (formItem) => renderSwitch(formItem.value),
        },
        {
          label: 'Whether it is fixed',
          key: 'affix',
          value: ref(true),
          render: (formItem) => renderSwitch(formItem.value),
        },
      ] as Array<FormItem>
      function doRefresh() {
        post({
          url: getMenuList,
          data: {},
        })
          .then(table.handleSuccess)
          .catch(console.log)
      }
      function onAddItem() {
        actionModel = 'add'
        modalDialog.value?.show().then(() => {
          dataForm.value?.reset()
        })
      }
      function onUpdateItem(item: any) {
        actionModel = 'edit'
        tempItem = item
        itemFormOptions.forEach((it) => {
          it.value.value = item[it.key] || null
          if (it.key === 'menuUrl' && it.disabled) {
            if (isExternal(item.menuUrl)) {
              it.value.value = ''
            }
            ;(it.disabled as Ref<boolean>).value = true
          }
        })
        const external = itemFormOptions.find((it) => it.key === 'redirect')
        if (isExternal(item.menuUrl)) {
          external!.value.value = item.menuUrl
        }
        modalDialog.value?.show()
      }
      function onConfirm() {
        if (actionModel === 'add') {
          if (dataForm.value?.validator()) {
            message.success(
              'Simulation creation menu is successful, the parameters are:' +
                JSON.stringify(dataForm.value?.generatorParams())
            )
          }
        } else {
          if (dataForm.value?.validator()) {
            const params = dataForm.value?.generatorParams()
            if (tempItem) {
              const tempRoute = findRouteByUrl(
                permissionStore.getPermissionSideBar,
                tempItem.menuUrl
              )
              if (tempRoute && tempRoute.meta && tempRoute.meta.badge) {
                ;(tempRoute.meta as any).badge = (params as any).badge || ''
              }
            }
            message.success(
              'Simulating modification menu success, the parameter is:' + JSON.stringify(params)
            )
          }
        }
      }
      function onDeleteItem(item: any) {
        naiveDialog.warning({
          title: 'hint',
          content: 'Do you want to delete this data?',
          positiveText: 'delete',
          onPositiveClick: () => {
            message.success(
              'The simulation deletion is successful, the parameter is：' + JSON.stringify(item)
            )
          },
        })
      }
      onMounted(doRefresh)
      return {
        rowKey,
        modalDialog,
        dataForm,
        ...table,
        itemFormOptions,
        tableColumns,
        onAddItem,
        onDeleteItem,
        onConfirm,
      }
    },
  })
</script>
<style lang="scss" scoped>
  .icon-wrapper {
    list-style: none;
    border: 1px solid #f5f5f5;
    overflow: hidden;
    padding: 0;

    .icon-item {
      float: left;
      width: 25%;
      font-size: 26px;
      border-right: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
      text-align: center;
      cursor: pointer;

      & > div {
        font-size: 12px;
      }

      &:hover {
        box-shadow:
          0 2px 4px rgba(0, 0, 0, 0.12),
          0 0 6px rgba(0, 0, 0, 0.04);
      }
    }
  }
</style>
