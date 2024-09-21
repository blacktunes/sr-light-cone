const getImage = (name: string, full?: boolean) =>
  new URL(`../images/fate${full ? '_full' : ''}/${name}.webp`, import.meta.url).href

export const fateList = <const>[
  '开拓',
  '毁灭',
  '巡猎',
  '智识',
  '同谐',
  '虚无',
  '存护',
  '丰饶',
  '欢愉',
  '记忆',
  '繁育',
  '贪饕',
  '秩序',
  '均衡',
  '神秘'
]

declare global {
  /** 命途列表 */
  type Fate = (typeof fateList)[number]
}

type FateIcon = Partial<Record<(typeof fateList)[number], string>>

export const fateIcon: FateIcon = {
  开拓: getImage('开拓'),
  毁灭: 'https://patchwiki.biligame.com/images/sr/5/52/irtwtwwukfi8thb62po3xrhn10vvbnj.png',
  巡猎: 'https://patchwiki.biligame.com/images/sr/f/f4/2t0cqahe051lv3g7yl0i7si4dzwzol8.png',
  智识: 'https://patchwiki.biligame.com/images/sr/4/45/0afzd3seodfwyuj2uo4riz7kblernsh.png',
  同谐: 'https://patchwiki.biligame.com/images/sr/4/44/hdfq7d3wf9spz0pjcu7xskvfa31so5z.png',
  虚无: 'https://patchwiki.biligame.com/images/sr/0/09/azlg0mqjmid9dkog5901n1zit5w34ls.png',
  存护: 'https://patchwiki.biligame.com/images/sr/3/33/gylticx4vyz8yvcgi7sv85q99gr6aar.png',
  丰饶: 'https://patchwiki.biligame.com/images/sr/d/d7/ha9pgzf4yzeqccoah30ig1ayr5oedgo.png',
  欢愉: 'https://patchwiki.biligame.com/images/sr/c/c0/d51ukip8mywhkebtmyg1jnq64jjqg7b.png',
  记忆: 'https://patchwiki.biligame.com/images/sr/0/05/ox6lz0ednjkh355n5lurjoda85zff7m.png',
  繁育: getImage('繁育'),
  贪饕: getImage('贪饕'),
  秩序: getImage('秩序'),
  均衡: getImage('均衡'),
  神秘: getImage('神秘')
}

export const fateFullIcon: FateIcon = {
  开拓: getImage('开拓', true),
  毁灭: getImage('毁灭', true),
  巡猎: getImage('巡猎', true),
  智识: getImage('智识', true),
  同谐: getImage('同谐', true),
  虚无: getImage('虚无', true),
  存护: getImage('存护', true),
  丰饶: getImage('丰饶', true),
  欢愉: getImage('欢愉', true),
  记忆: getImage('记忆', true),
  繁育: getImage('繁育', true),
  贪饕: getImage('贪饕', true),
  秩序: getImage('秩序', true),
  均衡: getImage('均衡', true),
  神秘: getImage('神秘', true)
}
