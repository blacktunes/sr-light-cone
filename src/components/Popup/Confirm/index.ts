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

let confirm = () => {}
export const confirmCallback = {
  open: (config: { title: string; tip?: string; text: string[]; fn?: () => void }) => {
    confirmData.title = config.title
    confirmData.tip = config.tip
    confirmData.text = config.text
    confirmData.fn = config.fn
  },
  close: () => {
    confirmData.title = ''
    confirmData.tip = undefined
    confirmData.text = []
    confirmData.fn = undefined
  },
  set confirm(fn: () => any) {
    confirm = fn
  },
  get confirm() {
    return () => {
      confirm()
    }
  }
}
