export const inputData = reactive<{
  title: string
  tip?: string
  required: boolean
  text: string
  placeholder?: string
  textarea?: boolean
  fn?: (str: string | null) => void
}>({
  title: '',
  tip: undefined,
  required: true,
  text: '',
  placeholder: undefined,
  textarea: undefined,
  fn: undefined
})

export const inputOpen = (config: {
  title: string
  tip?: string
  required?: boolean
  defaultText?: string
  placeholder?: string
  textarea?: boolean
}) => {
  return new Promise<string | null>((resolve) => {
    inputData.title = config.title
    inputData.tip = config.tip
    inputData.required = config.required === undefined ? true : config.required
    if (config.defaultText) {
      inputData.text = config.defaultText
    }
    inputData.placeholder = config.placeholder
    inputData.textarea = config.textarea
    inputData.fn = (str: string | null) => {
      resolve(str)
    }
  })
}

export const inputClose = () => {
  inputData.fn?.(null)
  inputData.title = ''
  inputData.tip = undefined
  inputData.required = true
  inputData.text = ''
  inputData.placeholder = undefined
  inputData.textarea = undefined
  inputData.fn = undefined
}
