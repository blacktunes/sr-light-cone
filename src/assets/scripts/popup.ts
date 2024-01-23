import ShowViewVue from '@/components/Popup/Show.vue'
import ConfirmVue from '@/components/Popup/Confirm/Confirm.vue'
import ImageCropperVue from '@/components/Popup/Cropper/Cropper.vue'
import SelectVue from '@/components/Popup/Select/Select.vue'
import InputVue from '@/components/Popup/Input/Input.vue'
import LogVue from '@/components/Popup/Log.vue'
import { setting } from '@/store/data'
import { cropper, cropperSetting } from '@/components/Popup/Cropper/cropper'
import { confirmData } from '@/components/Popup/Confirm/confirm'
import { selectData } from '@/components/Popup/Select/select'
import { inputData } from '@/components/Popup/Input/input'
import { imageCompress } from './images'
import { computed, markRaw, ref, reactive, type Component, type ComputedRef } from 'vue'

const components = {
  show: ShowViewVue,
  cropper: ImageCropperVue,
  confirm: ConfirmVue,
  select: SelectVue,
  input: InputVue,
  log: LogVue
}

const callbacks = {
  open: {
    show: (id: number) => {
      setting.lightConeID = id
    },
    cropper: (config?: { aspectRatio?: number; maxWidth?: number }) => {
      return new Promise<{ base64: string; raw: File }>((resolve) => {
        const el = document.createElement('input')
        el.type = 'file'
        el.accept = 'image/*'
        el.onchange = async () => {
          if (el.files?.[0]) {
            resolve({
              base64: await cropper(await imageCompress(el.files[0], config?.maxWidth), config),
              raw: el.files[0]
            })
          }
        }
        el.click()
      })
    },
    confirm: (config: { title: string; tip?: string; text: string[]; fn?: () => void }) => {
      confirmData.title = config.title
      confirmData.tip = config.tip
      confirmData.text = config.text
      confirmData.fn = config.fn
    },
    select: <T extends string[] | readonly string[]>(
      title: string,
      list: T,
      defaultText?: string
    ) => {
      return new Promise<T[number] | undefined>((resolve) => {
        selectData.title = title
        selectData.list = list
        selectData.select = defaultText
        selectData.fn = () => {
          resolve(selectData.select)
        }
      })
    },
    input: (config: {
      title: string
      tip?: string
      required?: boolean
      defaultText?: string
      placeholder?: string
    }) => {
      return new Promise<string>((resolve) => {
        inputData.title = config.title
        inputData.tip = config.tip
        inputData.required = config.required === undefined ? true : config.required
        if (config.defaultText) {
          inputData.text = config.defaultText
        }
        inputData.placeholder = config.placeholder
        inputData.fn = (str: string) => {
          resolve(str)
        }
      })
    }
  },
  close: {
    show: () => {
      setting.lightConeID = undefined
    },
    cropper: async () => {
      cropperSetting.img = ''
      cropperSetting.fn = undefined
      cropperSetting.aspectRatio = undefined
    },
    confirm: () => {
      confirmData.title = ''
      confirmData.tip = undefined
      confirmData.text = []
      confirmData.fn = undefined
    },
    select: () => {
      selectData.title = ''
      selectData.list = []
      selectData.select = undefined
      selectData.fn = undefined
    },
    input: () => {
      inputData.fn?.('')
      inputData.title = ''
      inputData.tip = undefined
      inputData.required = true
      inputData.text = ''
      inputData.placeholder = undefined
      inputData.fn = undefined
    }
  },
  enter: {}
}

/*------------------------------------------------------------*/
type ComponentKeys = keyof typeof components

export const popupComponents: Record<
  string,
  {
    compontnt: Component
    index: ComputedRef<number>
  }
> = reactive({})
// 正在显示的组件
export const popup = ref<Set<ComponentKeys>>(new Set())
const _popup = computed(() => Array.from(popup.value))
// 最后打开的组件
export const currentComponent = computed<ComponentKeys | undefined>(
  () => _popup.value[_popup.value.length - 1]
)
// 组件的确认事件
export const enterCallback: Partial<Record<ComponentKeys, () => boolean | Promise<boolean>>> =
  callbacks.enter

let i: ComponentKeys
for (i in components) {
  const key = i
  popupComponents[i] = {
    compontnt: markRaw(components[i]),
    index: computed(() => {
      return _popup.value.indexOf(key)
    })
  }
}

namespace Open {
  export type type = Required<typeof callbacks.open>
  export type keys = keyof Open.type
  export type args<T> = T extends Open.keys ? Parameters<Open.type[T]> : []
  export type result<T> = T extends Open.keys
    ? {
        [K in Open.keys]: Unpacked<ReturnType<Open.type[K]>>
      }[T]
    : void
}
export const openWindow = async <T extends ComponentKeys>(
  key: T,
  ...args: Open.args<T>
): Promise<Open.result<T>> => {
  popup.value.add(key)
  let res
  if (key in callbacks.open) {
    res = await (callbacks.open[key as Open.keys] as (...args: any[]) => any)(...args)
  }
  return res
}

namespace Close {
  export type type = Required<typeof callbacks.close>
  export type keys = keyof Close.type
  export type args<T> = T extends Close.keys ? Parameters<Close.type[T]> : []
  export type result<T> = T extends Close.keys
    ? {
        [K in Close.keys]: Unpacked<ReturnType<Close.type[K]>>
      }[T]
    : void
}
export const closeWindow = async <T extends ComponentKeys>(
  key: T,
  ...args: Close.args<T>
): Promise<Close.result<T>> => {
  popup.value.delete(key)
  let res
  if (key in callbacks.close) {
    res = await (callbacks.close[key as Close.keys] as (...args: any[]) => any)(...args)
  }
  return res
}
