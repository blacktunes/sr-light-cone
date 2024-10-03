import { setLocalStorage } from 'star-rail-vue'

export const KEY = {
  DATABASE_NAME: 'sr-light-cone',
  SETTING_KEY: 'sr-light-cone-setting',
  FILE_ACCEPT: '.srlc',
  RAW_NAME: 'raw.lc',
  UPDATE_KEY: 'sr-light-cone-update'
}

export const state: {
  lightConeID?: number
  screenshot: boolean
} = reactive({
  lightConeID: undefined,
  screenshot: false
})

export const setting: {
  details: boolean
  download: boolean
  quality: number
} = reactive({
  details: false,
  download: true,
  quality: 1
})

setLocalStorage(setting, KEY.SETTING_KEY)
