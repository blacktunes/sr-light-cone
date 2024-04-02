import './main.styl'

import '@/assets/scripts/window'
import './assets/scripts/analytics'
import './assets/scripts/setup'
import './assets/scripts/keyboard'

import App from './App.vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'

window.BUILD_TIME = new Date(BUILD_TIME)

createApp(App)
  .use(VueDOMPurifyHTML, {
    allowedTags: ['br', 'span'],
    allowedAttributes: {
      span: ['style', 'class']
    }
  })
  .mount('#app')
