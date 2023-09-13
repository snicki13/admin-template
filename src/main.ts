import { createApp } from 'vue'
import App from './App.vue'
import './styles'
import useGlobalComponents from './components'
import { useAppRouter } from './router'
import useRouterGuard from './router/guard'
import useAppPinia from './store'
import useMock from '../mock'
import { createI18n } from 'vue-i18n'

function vawBoot() {
  const app = createApp(App)
  useAppPinia(app)
  useAppRouter(app)
  useGlobalComponents(app)
  useRouterGuard()
  useMock()
  app.use(
    createI18n({
      legacy: false,
    })
  )
  app.mount('#app')
}

vawBoot()
