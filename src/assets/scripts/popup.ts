import { confirmCallback } from '@/components/Popup/Confirm'
import ConfirmVue from '@/components/Popup/Confirm/Confirm.vue'
import { cropperCallback } from '@/components/Popup/Cropper'
import ImageCropperVue from '@/components/Popup/Cropper/Cropper.vue'
import { inputCallback } from '@/components/Popup/Input'
import InputVue from '@/components/Popup/Input/Input.vue'
import LoadingVue from '@/components/Popup/Loading.vue'
import LogVue from '@/components/Popup/Log.vue'
import { selectCallback } from '@/components/Popup/Select'
import SelectVue from '@/components/Popup/Select/Select.vue'
import SettingVue from '@/components/Popup/Setting.vue'
import ShowViewVue from '@/components/Popup/Show/Show.vue'
import { setting } from '@/store/data'
import { Popup } from '../../utils/scripts/popup'

export const popup = new Popup(
  {
    loading: LoadingVue,
    show: ShowViewVue,
    cropper: ImageCropperVue,
    confirm: ConfirmVue,
    select: SelectVue,
    input: InputVue,
    log: LogVue,
    setting: SettingVue
  },
  {
    show: (id: number) => {
      setting.lightConeID = id
    },
    cropper: cropperCallback.open,
    confirm: confirmCallback.open,
    select: selectCallback.open,
    input: inputCallback.open
  },
  {
    show: () => {
      setting.lightConeID = undefined
    },
    cropper: cropperCallback.close,
    confirm: confirmCallback.close,
    select: selectCallback.close,
    input: inputCallback.close
  },
  {
    cropper: cropperCallback.confirm,
    confirm: confirmCallback.confirm,
    select: selectCallback.confirm,
    input: inputCallback.confirm
  }
)

popup.open('loading')
