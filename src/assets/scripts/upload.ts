import { data } from '@/store/data'
import { Parameter, setLocale, zhLocale } from '@ckpack/parameter'
import JSZip from 'jszip'
import { decompress, decompressFromUint8Array } from 'lz-string'
import { popupManager } from './popup'
import { fateList } from './images'

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

enum Accept {
  lightCone = '.srlc'
}

setLocale(zhLocale)
const parameter = new Parameter()

export const uploadFile = async (file: File) => {
  const accept = file.name.split('.').pop()
  if (`.${accept}` === Accept.lightCone) {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = (e) => {
      if (e.target?.result) {
        try {
          const lightConeList: LightCone[] = JSON.parse(
            decompressFromUint8Array(new Uint8Array(e.target.result as ArrayBuffer))
          )
          let time = Date.now()
          let num = 0
          for (const i in lightConeList) {
            lightConeList[i].time = time
            lightConeList[i].id = time++
            const val = parameter.validate(dataRule, lightConeList[i])
            if (val) {
              val.forEach((err) => {
                console.warn(err.message)
              })
            } else {
              data.lightCone.push(lightConeList[i])
              num += 1
            }
          }
          if (num === 0) {
            popupManager.open('confirm', {
              title: '光锥导入失败',
              text: ['请检查文件是否正确']
            })
          } else if (num < lightConeList.length) {
            popupManager.open('confirm', {
              title: '光锥导入完成',
              text: ['部分光锥导入失败']
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
    const zip = new JSZip()
    try {
      const zipContent = await zip.loadAsync(file)
      const raw = zipContent.files['raw.lc']
      if (!raw) {
        throw Error()
      }
      const lightCone = JSON.parse(decompress(await raw.async('text'))) as LightCone
      lightCone.time = Date.now()
      const val = parameter.validate(dataRule, lightCone)
      if (val) {
        val.forEach((err) => {
          console.warn(err.message)
        })
        throw Error()
      } else {
        data.lightCone.push(lightCone)
        popupManager.open('confirm', {
          title: '光锥导入完成',
          text: ['已添加新光锥', lightCone.name]
        })
      }
    } catch {
      popupManager.open('confirm', {
        title: '光锥导入失败',
        text: ['该文件可能不是由光锥生成器导出或内容已被修改']
      })
    }
  }
}
