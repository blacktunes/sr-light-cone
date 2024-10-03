import DataManager from '@/components/Popup/DataManager.vue'
import Setting from '@/components/Popup/Setting.vue'
import Show from '@/components/Popup/Show/Show.vue'
import { state } from '@/store/setting'
import { confirm, createPopupManager, cropper, input, loading, log, select } from 'star-rail-vue'

export const popupManager = createPopupManager({
  loading,
  show: {
    component: Show,
    open: (id: number) => {
      state.lightConeID = id
    },
    close: () => {
      state.lightConeID = undefined
    }
  },
  log,
  data: { component: DataManager },
  setting: { component: Setting },
  cropper,
  confirm,
  select,
  input
})

popupManager.open('loading')
