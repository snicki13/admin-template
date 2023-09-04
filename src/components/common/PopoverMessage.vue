<template>
  <n-card :content-style="{ padding: '0px' }" :footer-style="{ padding: '0px' }" :bordered="false" :segmented="true">
    <div v-if="messages.length > 0">
      <div class="flex items-center max-w-sm p-1 mx-auto space-x-2 rounded-xl" v-for="(item, index) of messages"
        :key="index">
        <div class="flex-shrink-0">
          <n-icon size="40" color="#f00">
            <NotificationsCircle />
          </n-icon>
        </div>
        <div>
          <div class="text-sm font-medium">{{ item.title }}</div>
          <n-ellipsis :line-clamp="1" class="text-gray-500">{{ item.desc }}</n-ellipsis>
        </div>
      </div>
    </div>
    <n-empty v-else description="No news" class="pt-20 pb-20" />
    <template #footer>
      <div class="flex justify-evenly">
        <n-button type="text" @click="onClearMessage">Clear</n-button>
        <n-button type="text">See more</n-button>
      </div>
    </template>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, shallowReactive } from 'vue'
import { NotificationsCircle } from '@vicons/ionicons5'
export default defineComponent({
  name: 'PopoverMessage',
  components: { NotificationsCircle },
  emits: ['clear'],
  setup(props, { emit }) {
    const messages = shallowReactive([
      {
        title: 'You receive a message',
        desc: 'Blessings from friends Zhang Sans birthday wishes',
      },
      {
        title: 'You receive a message',
        desc: 'Blessings from friends Zhang San from the birthday wishes of Zhang San, a friend Zhang San',
      },
      {
        title: 'You receive a message',
        desc: 'Blessings from friends Zhang San from the birthday wishes of Zhang San, a friend Zhang San',
      },
      {
        title: 'You receive a message',
        desc: 'Blessings from friends Zhang San from Zhang Sans birthday wishes from friend Zhang San from the birthday wishes of Zhang San from friend Zhang San from the birthday wishes of Zhang San',
      },
      {
        title: 'You receive a message',
        desc: 'Blessings from friends Zhang Sans birthday wishes',
      },
      {
        title: 'You receive a message',
        desc: 'Blessings from friends Zhang Sans birthday wishes',
      },
    ])
    function onClearMessage() {
      messages.length = 0
      emit('clear')
    }
    return {
      onClearMessage,
      messages,
    }
  },
})
</script>
