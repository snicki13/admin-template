<template>
  <div>
    <n-grid :x-gap="10">
      <n-grid-item :span="5">
        <n-card class="h-full" :content-style="{ padding: '5px' }" :header-style="{ padding: '5px' }" :segmented="true">
          <template #header>
            <div class="flex items-center">
              <n-input class="mr-2" v-model:value="pattern" placeholder="search" size="small" />
              <n-switch size="small" v-model:value="expandAllFlag" />
            </div>
          </template>
          <n-tree :expanded-keys="getExpandedKeys" block-line :pattern="pattern" :data="departmentData" selectable
            :on-update:expanded-keys="onUpdateExpandedKeys" :on-update:selected-keys="onCheckedKeys" />
        </n-card>
      </n-grid-item>
      <n-grid-item :span="19">
        <div>
          <TableBody>
            <template #header>
              <TableHeader ref="tableHeaderRef" :show-filter="false">
                <template #top-right>
                  <DeleteButton @delete="onDeleteItems" />
                </template>
              </TableHeader>
            </template>
            <template #default>
              <n-data-table :loading="tableLoading" :data="dataList" :row-key="rowKey" :columns="tableColumns"
                :scroll-x="1000" :style="{ height: `${tableHeight}px` }" :flex-height="true"
                @update:checked-row-keys="onRowCheck" />
            </template>
            <template #footer>
              <TableFooter ref="tableFooterRef" :pagination="pagination" />
            </template>
          </TableBody>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts">
import { post } from '@/api/http'
import { getTableList } from '@/api/url'
import { renderTag } from '@/hooks/form'
import {
  TableActionModel,
  usePagination,
  useRenderAction,
  useRowKey,
  useTable,
  useTableColumn,
  useTableHeight,
} from '@/hooks/table'
import { DataTableColumn, NAvatar, useDialog, useMessage } from 'naive-ui'
import { defineComponent, h, onMounted, ref, shallowReactive, watch } from 'vue'
export default defineComponent({
  name: 'UserList',
  setup() {
    const table = useTable()
    const rowKey = useRowKey('id')
    const naiveDialog = useDialog()
    const message = useMessage()
    const pagination = usePagination(doRefresh)
    const checkedRowKeys = [] as Array<any>
    const departmentData = [
      {
        label: 'East area',
        key: 1,
        children: [
          {
            label: 'President',
            key: 11,
          },
          {
            label: 'Department of Finance',
            key: 12,
          },
          {
            label: 'Technical department',
            key: 13,
          },
          {
            label: 'Sales',
            key: 14,
          },
        ],
      },
      {
        label: 'Western Region',
        key: 2,
        children: [
          {
            label: 'President',
            key: 21,
          },
          {
            label: 'Department of Finance',
            key: 22,
          },
          {
            label: 'Technical department',
            key: 23,
          },
          {
            label: 'Sales',
            key: 24,
          },
        ],
      },
      {
        label: 'South China',
        Key: 3,
        children: [
          {
            label: 'Presidents Division',
            Key: 31,
          },
          {
            label: 'Finance Department',
            Key: 32,
          },
          {
            label: 'Technical Department',
            Key: 33,
          },
          {
            label: 'Sales Department',
            Key: 34,
          },
        ],
      },
      {
        label: 'Northern region',
        key: 4,
        children: [
          {
            label: 'Presidents Division',
            Key: 41,
          },
          {
            label: 'Finance Department',
            Key: 42,
          },
          {
            label: 'Technical Department',
            Key: 43,
          },
          {
            label: 'Sales Department',
            Key: 44,
          },
        ],
      },
    ]
    const tableColumns = useTableColumn(
      [
        table.selectionColumn,
        table.indexColumn,
        {
          title: 'name',
          key: 'nickName',
        },
        {
          title: 'gender',
          key: 'gender',
          width: 80,
          render: (rowData) => {
            return h('div', rowData.gender === 0 ? '男' : '女')
          },
        },
        {
          title: 'avatar',
          key: 'avatar',
          render: (rowData: any) => {
            return h(
              NAvatar,
              {
                circle: true,
                size: 'small',
              },
              { default: () => rowData.nickName.substring(0, 1) }
            )
          },
        },
        {
          title: 'address',
          key: 'address',
        },
        {
          title: 'Last Login Time',
          key: 'lastLoginTime',
        },
        {
          title: 'Last login IP',
          key: 'lastLoginIp',
        },
        {
          title: 'state',
          key: 'status',
          render: (rowData) =>
            renderTag(!!rowData.status ? 'normal' : 'Disable', {
              type: !!rowData.status ? 'success' : 'error',
              size: 'small',
            }),
        },
        {
          title: 'operate',
          key: 'actions',
          fixed: 'right',
          width: 80,
          render: (rowData) => {
            return useRenderAction([
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
      } as DataTableColumn
    )
    const expandAllFlag = ref(false)
    function doRefresh() {
      post({
        url: getTableList,
        data: () => {
          return {
            page: pagination.page,
            pageSize: pagination.pageSize,
          }
        },
      })
        .then((res) => {
          table.handleSuccess(res)
          pagination.setTotalSize((res as any).totalSize)
        })
        .catch(console.log)
    }
    function onDeleteItems() {
      naiveDialog.warning({
        title: 'Tip',
        content: 'Are you sure to delete this data?',
        positiveText: 'OK',
        onPositiveClick: () => {
          message.success('Data simulation is successfully deleted, the parameter is：' + JSON.stringify(checkedRowKeys))
        },
      })
    }
    function onDeleteItem(item: any) {
      naiveDialog.warning({
        title: 'hint',
        content: 'Are you sure you want to delete this data?',
        positiveText: 'Sure',
        onPositiveClick: () => {
          table.dataList.value!.splice(table.dataList.value!.indexOf(item), 1)
        },
      })
    }
    function onRowCheck(rowKeys: Array<any>) {
      checkedRowKeys.length = 0
      checkedRowKeys.push(...rowKeys)
    }
    function onUpdateExpandedKeys(keys: any) {
      getExpandedKeys.length = 0
      getExpandedKeys.push(...keys)
    }
    function onCheckedKeys(keys: any) {
      message.success('The selected value is--->' + JSON.stringify(keys))
    }
    const getExpandedKeys = shallowReactive([] as Array<number>)
    watch(
      () => expandAllFlag.value,
      (newVal) => {
        newVal
          ? getExpandedKeys.push(...departmentData.map((it) => it.key!))
          : (getExpandedKeys.length = 0)
      }
    )
    onMounted(async () => {
      table.tableHeight.value = await useTableHeight()
      doRefresh()
    })
    return {
      ...table,
      rowKey,
      pattern: ref(''),
      expandAllFlag,
      departmentData,
      tableColumns,
      pagination,
      onDeleteItem,
      onDeleteItems,
      onRowCheck,
      getExpandedKeys,
      onUpdateExpandedKeys,
      onCheckedKeys,
    }
  },
})
</script>

<style lang="scss" scoped>
.avatar-container {
  position: relative;
  width: 30px;
  margin: 0 auto;
  vertical-align: middle;

  .avatar {
    width: 100%;
    border-radius: 50%;
  }

  .avatar-vip {
    border: 2px solid #cece1e;
  }

  .vip {
    position: absolute;
    top: 0;
    right: -9px;
    width: 15px;
    transform: rotate(60deg);
  }
}

.gender-container {
  .gender-icon {
    width: 20px;
  }
}
</style>
