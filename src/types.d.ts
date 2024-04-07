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
  | '贪饕'
  | '秩序'
  | '均衡'
  | '迷思'

interface LightCone {
  id: number
  name: string
  type: Fate
  level: 3 | 4 | 5
  image?: string
  time: number
  new?: boolean
  details: LightConeDetails
}

interface LightConeDetails {
  name: string
  info: string
  state: [LightConeState, LightConeState]
}

interface LightConeState {
  hp: string
  atk: string
  def: string
  skill: string
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
