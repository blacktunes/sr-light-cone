import './main.styl'

import { analytics } from 'star-rail-vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import App from './App.vue'
import { loadDatabase } from './assets/scripts/database'
import { hotkey } from './assets/scripts/hotkey'
import { logCheck, updateCheck } from './assets/scripts/update'

analytics('G-4MMBK9RWHE', import.meta.env.MODE === 'development')

createApp(App)
  .use(VueDOMPurifyHTML, {
    allowedTags: ['br', 'span'],
    allowedAttributes: {
      span: ['style', 'class']
    }
  })
  .mount('#app')

hotkey()
logCheck()
loadDatabase().then(updateCheck)
