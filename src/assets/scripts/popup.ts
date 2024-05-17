import Setting from '@/components/Popup/Setting.vue'
import Show from '@/components/Popup/Show/Show.vue'
import { setting } from '@/store/data'
import { loading, confirm, createPopupManager, cropper, input, select, log } from 'star-rail-vue'

export const popupManager = createPopupManager({
  loading,
  show: {
    component: Show,
    open: (id: number) => {
      setting.lightConeID = id
    },
    close: () => {
      setting.lightConeID = undefined
    }
  },
  log,
  setting: { component: Setting },
  cropper,
  confirm,
  select,
  input
})

popupManager.open('loading')
