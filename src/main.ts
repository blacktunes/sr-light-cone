import './main.styl'

import '@/assets/scripts/window'
import './assets/scripts/analytics'
import './assets/scripts/setup'
import './assets/scripts/keyboard'

import { createApp } from 'vue'
import App from './App.vue'

window.BUILD_TIME = new Date(BUILD_TIME)

createApp(App).mount('#app')
