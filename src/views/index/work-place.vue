<template>
  <div class="main-container">
    <n-card
      title="Workbench"
      :content-style="{ padding: '10px' }"
      :header-style="{ padding: '10px' }"
    >
      <n-grid :cols="4" :y-gap="15" item-responsive responsive="screen">
        <n-grid-item class="flex" span="4 s:2 m:2 l:2 xl:2 2xl:2">
          <div class="avatar-wrapper">
            <img :src="avatar" />
          </div>
          <div class="flex flex-col justify-around ml-3.5 flex-1">
            <div class="text-lg"
              >Good morning, Andy, youth is only once, don't let yourself be bad</div
            >
            <div class="text-sm text-gray-500"
              >There are light rain today, don't forget to bring an umbrella when you go out ~
            </div>
          </div>
        </n-grid-item>
        <n-grid-item class="flex justify-end" span="4 s:2 m:2 l:2 xl:2 2xl:2">
          <div class="flex flex-col justify-around align-end item-action">
            <div class="text-gray">Number of projects</div>
            <div class="text-xl">12</div>
          </div>
          <div class="flex flex-col justify-around align-end item-action">
            <div class="text-gray">To do it</div>
            <div class="text-xl">3/20</div>
          </div>
          <div class="flex flex-col justify-around align-end item-action">
            <div class="text-gray">Current date</div>
            <div class="text-xl">{{ currentDate }}</div>
          </div>
        </n-grid-item>
      </n-grid>
    </n-card>
    <n-grid
      class="mt-4 mb-4"
      :y-gap="15"
      :x-gap="15"
      cols="2 s:2 m:3 l:6 xl:6 2xl:6"
      responsive="screen"
    >
      <n-grid-item v-for="(item, index) of fastActions" :key="index">
        <n-card @click="fastActionClick(item)">
          <div class="flex flex-col items-center justify-center">
            <span
              :class="[item.icon, 'iconfont']"
              :style="{ color: item.color, fontSize: '30px' }"
            ></span>
            <span class="mt-1">{{ item.title }}</span>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-grid
      class="mt-4 mb-4"
      :y-gap="15"
      :x-gap="15"
      cols="2 s:2 m:3 l:6 xl:6 2xl:6"
      responsive="screen"
    >
      <n-grid-item v-for="(item, index) of dataItems" :key="index">
        <ProjectItem :item="item" />
      </n-grid-item>
    </n-grid>

    <n-grid cols="1 s:1 m:2 l:2 xl:2 2xl:2" :y-gap="15" :x-gap="15" responsive="screen">
      <n-grid-item>
        <n-card
          title="project progress"
          :content-style="{ padding: '5px' }"
          :header-style="{ padding: '10px' }"
        >
          <n-data-table :columns="columns" :data="dataSource" :pagination="false" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card
          title="Project dynamics"
          :content-style="{ padding: '5px' }"
          :header-style="{ padding: '10px' }"
        >
          <TodoItem v-for="(item, index) of waitingItmes" :key="index" :item="item" />
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts">
  import ProjectItem from './components/ProjectItem.vue'
  import TodoItem from './components/TodoItem.vue'
  import { computed, defineComponent } from 'vue'
  import { useRouter } from 'vue-router'
  import { random } from 'lodash-es'
  import useUserStore from '@/store/modules/user'
  import { DeviceType } from '@/store/types'
  import useAppConfigStore from '@/store/modules/app-config'
  const COLORS = ['#67C23A', '#E6A23C', '#F56C6C', '#409EFF']
  const date = new Date()
  export default defineComponent({
    name: 'WorkPlace',
    components: {
      ProjectItem,
      TodoItem,
    },
    setup() {
      const appConfigStore = useAppConfigStore()
      const waitingItmes = [
        {
          name: 'Lege',
          content: 'Ouch, yes, come on, come on',
          time: '04-04',
        },
        {
          name: 'General',
          content: 'Print files to the manager',
          time: '04-04',
        },
        {
          name: 'Old Li',
          content:
            'Wait until the weekend, go shopping with colleagues, buy new clothes, buy new mobile phones, buy bags, and buy all kinds of buying and buying',
          time: '04-02',
        },
        {
          name: 'Flower brother',
          content: 'New colleagues entry training work',
          time: '04-01',
        },
        {
          name: 'Qing Qing Xuan',
          content: 'Arrange tickets for leaders, hotel accommodation and other issues',
          time: '03-31',
        },
      ]
      const isMobileScreen = computed(() => {
        return appConfigStore.deviceType === DeviceType.MOBILE
      })
      const dataSource = [
        {
          key: '1',
          projectName: 'Arco Admin Develop',
          beginTime: '2021-12-01',
          endTime: '2021-12-31',
          progress: 100,
          status: 'Finish',
        },
        {
          key: '2',
          projectName: 'Official website development',
          beginTime: '2021-12-01',
          endTime: '2021-12-31',
          progress: 90,
          status: 'in progress',
        },
        {
          key: '3',
          projectName: 'Documentation',
          beginTime: '2021-12-01',
          endTime: '2021-12-31',
          progress: 80,
          status: 'in progress',
        },
        {
          key: '4',
          projectName: 'Each version upgrade work',
          beginTime: '2021-12-01',
          endTime: '2025-12-31',
          progress: 50,
          status: 'in progress',
        },
        {
          key: '5',
          projectName: 'Soft text writing',
          beginTime: '2021-12-01',
          endTime: '2025-12-31',
          progress: 50,
          status: 'in progress',
        },
        {
          key: '5',
          projectName: 'Tool writing',
          beginTime: '2021-12-01',
          endTime: '2025-12-31',
          progress: 50,
          status: 'in progress',
        },
      ]
      const userStore = useUserStore()
      const avatar = computed(() => userStore.avatar)
      const router = useRouter()
      const fastActionClick = ({ path = '/' }) => {
        router.push(path)
      }
      return {
        isMobileScreen,
        waitingItmes,
        avatar,
        currentDate: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(),
        dataItems: [
          {
            title: 'Vue Admin Work',
            target: 'http://qingqingxuan.gitee.io/vue-admin-work',
            gitee: 'http://www.vueadminwork.com',
            ui: 'Element UI',
          },
          {
            title: 'Vue Admin Work X',
            target: 'http://qingqingxuan.gitee.io/vue-admin-work-x',
            gitee: 'http://www.vueadminwork.com',
            ui: 'Element Plus',
          },
          {
            title: 'Admin Work Pro',
            target: 'http://qingqingxuan.gitee.io/admin-work',
            gitee: 'http://www.vueadminwork.com',
            ui: 'NaiveUI',
          },
          {
            title: 'Arco Work',
            target: 'http://qingqingxuan.gitee.io/admin-work',
            gitee: 'http://www.vueadminwork.com',
            ui: 'ArcoDesign',
          },
          {
            title: 'Vue Admin Work A',
            target: 'http://qingqingxuan.gitee.io/vue-admin-work-x',
            gitee: 'http://www.vueadminwork.com',
            ui: 'Antd',
          },
          {
            title: 'Admin Work',
            target: 'http://qingqingxuan.gitee.io/admin-work',
            gitee: 'http://www.vueadminwork.com',
            ui: 'NaiveUI',
          },
        ],
        fastActions: [
          {
            title: 'front page',
            icon: 'icon-dashboard-fill',
            path: '/',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: 'System Management',
            path: '/system/department',
            icon: 'icon-setting-fill',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: 'List',
            path: '/list/table-custom',
            icon: 'icon-detail-fill',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: 'Form',
            path: '/form/base-form-view',
            icon: 'icon-file-text-fill',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: 'Multi -level menu',
            path: '/next/menu2/menu-2-1/menu-2-1-1',
            icon: 'icon-golden-fill',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: 'More features',
            path: '/other/qrcode',
            icon: 'icon-appstore-fill',
            color: COLORS[random(0, COLORS.length)],
          },
        ],
        fastActionClick,
        dataSource,
        columns: [
          {
            title: 'Item name',
            key: 'projectName',
          },
          {
            title: 'Starting time',
            key: 'beginTime',
          },
          {
            title: 'End Time',
            key: 'endTime',
          },
          {
            title: 'schedule',
            key: 'progress',
          },
          {
            title: 'state',
            key: 'status',
          },
        ],
      }
    },
  })
</script>

<style lang="scss" scoped>
  .avatar-wrapper {
    width: 3rem;
    height: 3rem;
    max-width: 3rem;
    max-height: 3rem;
    min-width: 3rem;
    min-height: 3rem;

    & > img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid var(--primary-color);
    }
  }

  .item-action {
    position: relative;
    padding: 0 30px;
  }

  .item-action::after {
    position: absolute;
    top: 20%;
    right: 0;
    height: 60%;
    content: '';
    display: block;
    width: 1px;
    background-color: #e0e0e0;
  }

  div.item-action:last-child::after {
    width: 0;
  }

  .fast-item-wrapper {
    border-right: 1px solid #f7f7f7;
    border-bottom: 1px solid #f7f7f7;
    height: 80px;
  }

  .fast-item-wrapper:hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px #ddd;
  }

  .el-link + .el-link {
    margin-bottom: 10px;
  }
</style>
