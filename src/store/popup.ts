import { reactive } from 'vue'

export const popup = reactive({
  log: false,
  confirm: false,
  input: false,
  select: false
})

export const popupCallbalk = reactive<{
  [key in keyof typeof popup]?: () => boolean | undefined
}>({})

export const confirmData = reactive<{
  title: string
  tip?: string
  text: string[]
  fn?: () => void
}>({
  title: '',
  tip: undefined,
  text: [],
  fn: undefined
})

export const showConfirm = (config: {
  title: string
  tip?: string
  text: string[]
  fn?: () => void
}) => {
  confirmData.title = config.title
  confirmData.tip = config.tip
  confirmData.text = config.text
  confirmData.fn = config.fn
  openWindow('confirm')
}

export const inputData = reactive<{
  title: string
  tip?: string
  required: boolean
  text: string
  placeholder?: string
  fn?: (str: string) => void
}>({
  title: '',
  tip: undefined,
  required: true,
  text: '',
  placeholder: undefined,
  fn: undefined
})

export const showInput = (config: {
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
    openWindow('input')
    inputData.fn = (str: string) => {
      resolve(str)
    }
  })
}

export const selectData = reactive<{
  title: string
  list: string[] | readonly string[]
  select?: string
  fn?: () => void
}>({
  title: '测试',
  list: [],
  select: undefined,
  fn: undefined
})

export const showSelect = <T extends string[] | readonly string[]>(
  list: T,
  defaultText?: string
) => {
  return new Promise<T[number] | undefined>((resolve) => {
    selectData.list = list
    selectData.select = defaultText
    openWindow('select')
    selectData.fn = () => {
      resolve(selectData.select)
    }
  })
}

export const popupList: (keyof typeof popup)[] = []

export const openWindow = (key: keyof typeof popup) => {
  if (!popup[key]) {
    popupList.push(key)
    popup[key] = true
  }
}

export const closeWindow = (confirm?: boolean) => {
  const key = popupList.pop()
  if (key) {
    if (popup[key]) {
      if (confirm) {
        if (!popupCallbalk?.[key]?.()) {
          popupList.push(key)
        }
      } else {
        popup[key] = false
      }
      return true
    } else {
      closeWindow(confirm)
    }
  }
}
