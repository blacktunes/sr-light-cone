import './main.styl'

import { analytics } from 'star-rail-vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import App from './App.vue'
import { loadDatabase } from './assets/scripts/database'
import { hotkey } from './assets/scripts/hotkey'
import { logCheck } from './assets/scripts/log'
import { updateCheck } from './assets/scripts/update'

if (import.meta.env.MODE === 'production') {
  analytics('G-4MMBK9RWHE')
}

createApp(App)
  .use(VueDOMPurifyHTML, {
    allowedTags: ['br', 'span'],
    allowedAttributes: {
      span: ['style', 'class']
    }
  })
  .mount('#app')

hotkey()
logCheck('sr-light-cone-update')
loadDatabase().then(updateCheck)
