import Loading from '@/components/Popup/Loading.vue'
import Log from '@/components/Popup/Log.vue'
import Setting from '@/components/Popup/Setting.vue'
import Show from '@/components/Popup/Show/Show.vue'
import { setting } from '@/store/data'
import { confirm, createPopupManager, cropper, input, select } from 'star-rail-vue'

export const popupManager = createPopupManager({
  loading: { component: Loading },
  show: {
    component: Show,
    open: (id: number) => {
      setting.lightConeID = id
    },
    close: () => {
      setting.lightConeID = undefined
    }
  },
  log: { component: Log },
  setting: { component: Setting },
  cropper,
  confirm,
  select,
  input
})

popupManager.open('loading')
