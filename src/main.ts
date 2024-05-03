import './main.styl'

import VueDOMPurifyHTML from 'vue-dompurify-html'
import App from './App.vue'
import { loadDatabase } from './assets/scripts/IndexedDB'
import { hotkey } from './assets/scripts/hotkey'
import { logCheck } from './assets/scripts/log'
import { analytics } from './utils/scripts/analytics'

window.BUILD_TIME = new Date(BUILD_TIME)

analytics('G-4MMBK9RWHE')

createApp(App)
  .use(VueDOMPurifyHTML, {
    allowedTags: ['br', 'span'],
    allowedAttributes: {
      span: ['style', 'class']
    }
  })
  .mount('#app')

hotkey()
logCheck('sr-light-cone-time')
loadDatabase()
