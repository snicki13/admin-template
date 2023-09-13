<template>
  <div class="main-container">
    <TableBody ref="tableBody">
      <template #header>
        <TableHeader
          :show-filter="true"
          title="Query conditions"
          @search="onSearch"
          @reset-search="onResetSearch"
        >
          <template #search-content>
            <DataForm
              ref="searchForm"
              :form-config="{
                labelWidth: 60,
              }"
              :options="conditionItems"
              preset="grid-item"
            />
          </template>
        </TableHeader>
      </template>
      <template #default>
        <n-data-table
          size="small"
          :loading="tableLoading"
          :data="dataList"
          :columns="tableColumns"
          :row-key="rowKey"
          :style="{ height: `${tableHeight}px` }"
          :flex-height="true"
        />
      </template>
      <template #footer>
        <TableFooter :pagination="pagination" />
      </template>
    </TableBody>
  </div>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getTableList } from '@/api/url'
  import { renderTag } from '@/hooks/form'
  import { usePagination, useRowKey, useTable, useTableColumn, useTableHeight } from '@/hooks/table'
  import { DataFormType, FormItem } from '@/types/components'
  import {
    DataTableColumn,
    NAvatar,
    NCheckbox,
    NCheckboxGroup,
    NDatePicker,
    NInput,
    NSelect,
    NSpace,
    NTimePicker,
    SelectOption,
    useMessage,
  } from 'naive-ui'
  import { defineComponent, h, onMounted, ref } from 'vue'
  const conditionItems: Array<FormItem> = [
    {
      key: 'name',
      label: 'username',
      value: ref(null),
      render: (formItem) => {
        return h(NInput, {
          value: formItem.value.value,
          onUpdateValue: (val) => {
            formItem.value.value = val
          },
          placeholder: 'Please type in your name',
        })
      },
    },
    {
      key: 'sex',
      label: 'The users surname is',
      value: ref(null),
      optionItems: [
        {
          label: '男',
          value: 0,
        },
        {
          label: '女',
          value: 1,
        },
      ],
      render: (formItem) => {
        return h(NSelect, {
          options: formItem.optionItems as Array<SelectOption>,
          value: formItem.value.value,
          placeholder: 'Please choose the users last name',
          onUpdateValue: (val) => {
            formItem.value.value = val
          },
        })
      },
    },
    {
      key: 'date',
      label: 'date',
      value: ref(null),
      render: (formItem) => {
        return h(NDatePicker, {
          value: formItem.value.value,
          placeholder: 'Please select the date',
          style: 'width: 100%',
          onUpdateValue: (val) => {
            formItem.value.value = val
          },
          type: 'date',
        })
      },
    },
    {
      key: 'time',
      label: 'time',
      value: ref(null),
      render: (formItem) => {
        return h(NTimePicker, {
          options: formItem.optionItems as Array<SelectOption>,
          value: formItem.value.value,
          placeholder: 'Please choose time',
          style: 'width: 100%',
          onUpdateValue: (val) => {
            formItem.value.value = val
          },
        })
      },
    },
    {
      key: 'checkbox',
      label: '复选',
      value: ref(null),
      optionItems: [
        {
          label: 'Option 1',
          value: 0,
        },
        {
          label: 'Option 2',
          value: 1,
        },
      ],
      render: (formItem) => {
        return h(
          NCheckboxGroup,
          {
            options: formItem.optionItems as Array<SelectOption>,
            value: formItem.value.value,
            placeholder: 'Please choose the users last name',
            onUpdateValue: (val) => {
              formItem.value.value = val
            },
          },
          {
            default: () => {
              return h(
                NSpace,
                {
                  itemStyle: 'display: flex;',
                },
                {
                  default: () => {
                    return formItem.optionItems?.map((it) => {
                      return h(NCheckbox, {
                        key: it.value,
                        label: it.label,
                        value: it.value,
                      })
                    })
                  },
                }
              )
            },
          }
        )
      },
    },
  ]
  export default defineComponent({
    name: 'TableWithSearch',
    setup() {
      const searchForm = ref<DataFormType | null>(null)
      const pagination = usePagination(doRefresh)
      pagination.pageSize = 20
      const table = useTable()
      const message = useMessage()
      const rowKey = useRowKey('id')
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
            title: 'name',
            key: 'nickName',
          },
          {
            title: 'Last Login Time',
            key: 'lastLoginTime',
            width: 180,
          },
          {
            title: 'Last login IP',
            key: 'lastLoginIp',
          },
          {
            title: 'state',
            key: 'status',
            render: (rowData) =>
              renderTag(!!rowData.status ? 'Ok' : 'Error', {
                type: !!rowData.status ? 'success' : 'error',
                size: 'small',
              }),
          },
        ],
        {
          align: 'center',
        } as DataTableColumn
      )
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
            pagination.setTotalSize(res.totalSize || 10)
          })
          .catch(console.log)
      }
      function onSearch() {
        message.success(
          '模拟查询成功，参数为：' + JSON.stringify(searchForm.value?.generatorParams())
        )
      }
      function onResetSearch() {
        searchForm.value?.reset()
      }
      onMounted(async () => {
        table.tableHeight.value = await useTableHeight()
        doRefresh()
      })
      return {
        ...table,
        rowKey,
        pagination,
        searchForm,
        tableColumns,
        conditionItems,
        onSearch,
        onResetSearch,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .avatar-container {
    position: relative;
    width: 30px;
    height: 30px;
    margin: 0 auto;
    vertical-align: middle;

    .avatar {
      width: 100%;
      height: 100%;
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
