type Unpacked<T> = T extends Promise<infer U> ? U : T

/** 命途列表 */
type Fate =
  | '开拓'
  | '毁灭'
  | '巡猎'
  | '智识'
  | '同谐'
  | '虚无'
  | '存护'
  | '丰饶'
  | '欢愉'
  | '记忆'
  | '繁育'

interface LightCone {
  id: number
  name: string
  type: Fate
  level: 3 | 4 | 5
  image?: string
  time: number
  new?: boolean
}

interface Log {
  time: string
  text: {
    text: string
    info?: string | string[]
    author?: string
    url?: string
    highlight?: boolean
  }[]
}
