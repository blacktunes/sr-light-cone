import { currentLightCone, data } from '@/store/data'
import { KEY, setting, state } from '@/store/setting'
import { Parameter, setLocale, zhLocale } from '@ckpack/parameter'
import {
  createDownloadFile,
  decompressFromArrayBuffer,
  decompressFromZip,
  screenshot
} from 'star-rail-vue'
import { fateList } from './images'
import { popupManager } from './popup'

setLocale(zhLocale)
const parameter = new Parameter()

const dataRule = {
  id: {
    isRequired: true,
    type: 'number'
  },
  name: 'string',
  type: {
    type: 'enum',
    enum: fateList
  },
  level: {
    type: 'enum',
    enum: [3, 4, 5]
  },
  image: 'string',
  time: {
    isRequired: false,
    type: 'number'
  },
  new: {
    isRequired: false,
    type: 'boolean'
  },
  details: {
    isRequired: false,
    type: 'object',
    rule: {
      name: { isRequired: false, type: 'string' },
      info: { isRequired: false, type: 'string' },
      state: {
        type: 'array',
        itemType: 'object',
        itemRule: {
          hp: { isRequired: false, type: 'string' },
          atk: { isRequired: false, type: 'string' },
          def: { isRequired: false, type: 'string' },
          skill: { isRequired: false, type: 'string' }
        }
      }
    }
  }
}

export const inputFile = async () => {
  const el = document.createElement('input')
  el.type = 'file'
  el.accept = `.png,${KEY.FILE_ACCEPT}`
  el.onchange = async () => {
    const file = el.files?.[0]
    if (file) {
      await importFile(file)
    }
  }
  el.click()
  el.remove()
}

export const importFile = async (file: File, open?: boolean) => {
  const accept = file.name.split('.').pop()
  if (`.${accept}` === KEY.FILE_ACCEPT) {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = (e) => {
      if (e.target?.result) {
        try {
          const newDataList: LightCone[] = decompressFromArrayBuffer(e.target.result as ArrayBuffer)
          let time = Date.now()
          let num = 0
          for (const i in newDataList) {
            newDataList[i].time = time
            newDataList[i].id = time++
            const val = parameter.validate(dataRule, newDataList[i])
            if (val) {
              val.forEach((err) => {
                console.warn(err.message)
              })
            } else {
              data.lightCone.push(newDataList[i])
              num += 1
            }
          }
          if (num === 0) {
            popupManager.open('confirm', {
              title: '光锥导入失败',
              text: ['请检查文件是否正确']
            })
          } else {
            popupManager.open('confirm', {
              title: '光锥导入完成',
              text: [`已添加${num}张新光锥`]
            })
          }
        } catch (err) {
          popupManager.open('confirm', {
            title: '光锥导入失败',
            text: [String(err)]
          })
        }
      }
    }
  } else {
    try {
      const newData = await decompressFromZip<LightCone>(file, KEY.RAW_NAME)
      const time = Date.now()
      newData.time = time
      newData.id = time
      const val = parameter.validate(dataRule, newData)
      if (val) {
        val.forEach((err) => {
          console.warn(err.message)
        })
        throw Error()
      } else {
        data.lightCone.push(newData)
        if (open) {
          popupManager.open('show', newData.id)
        } else {
          popupManager.open('confirm', {
            title: '光锥导入完成',
            text: ['已添加新光锥', newData.name]
          })
        }
      }
    } catch {
      popupManager.open('confirm', {
        title: '光锥导入失败',
        text: ['该文件可能不是由光锥生成器导出或内容已被修改']
      })
    }
  }
}

export const exportFile = () => {
  const blob = createDownloadFile(data.lightCone)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `SR-${new Date().toLocaleString()}${KEY.FILE_ACCEPT}`
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export const createScreenshot = (dom?: HTMLElement | null) => {
  if (popupManager.isLoading()) return

  state.screenshot = true
  popupManager.open('loading')
  nextTick(() => {
    if (dom) {
      if (!currentLightCone.value) return

      screenshot(
        dom,
        {
          name: currentLightCone.value.name,
          download: setting.download,
          data: {
            raw: JSON.stringify(toRaw(currentLightCone.value)),
            filename: 'raw.lc'
          }
        },
        { pixelRatio: setting.quality }
      )
        .catch(() => {
          popupManager.open('confirm', {
            title: '图片保存异常',
            text: ['可能是浏览器拦截了新窗口'],
            tip: '请尝试在设置中切换下载模式'
          })
        })
        .finally(() => {
          setTimeout(() => {
            state.screenshot = false
            popupManager.close('loading')
          }, 1000)
        })
    } else {
      state.screenshot = false
      popupManager.close('loading')
    }
  })
}
