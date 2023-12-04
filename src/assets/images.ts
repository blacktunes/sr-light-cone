import 欢愉 from '@/assets/欢愉.webp'
import 繁育 from '@/assets/繁育.webp'
import { cropperOpen } from '@/store/cropper'

export const fateList = <const>[
  '毁灭',
  '巡猎',
  '智识',
  '同谐',
  '虚无',
  '存护',
  '丰饶',
  '欢愉',
  '繁育'
]

type FateIcon = Partial<Record<(typeof fateList)[number], string>>

export const fateIcon: FateIcon = {
  毁灭: 'https://patchwiki.biligame.com/images/sr/5/52/irtwtwwukfi8thb62po3xrhn10vvbnj.png',
  巡猎: 'https://patchwiki.biligame.com/images/sr/f/f4/2t0cqahe051lv3g7yl0i7si4dzwzol8.png',
  智识: 'https://patchwiki.biligame.com/images/sr/4/45/0afzd3seodfwyuj2uo4riz7kblernsh.png',
  同谐: 'https://patchwiki.biligame.com/images/sr/4/44/hdfq7d3wf9spz0pjcu7xskvfa31so5z.png',
  虚无: 'https://patchwiki.biligame.com/images/sr/0/09/azlg0mqjmid9dkog5901n1zit5w34ls.png',
  存护: 'https://patchwiki.biligame.com/images/sr/3/33/gylticx4vyz8yvcgi7sv85q99gr6aar.png',
  丰饶: 'https://patchwiki.biligame.com/images/sr/d/d7/ha9pgzf4yzeqccoah30ig1ayr5oedgo.png',
  欢愉: 'https://patchwiki.biligame.com/images/sr/c/c0/d51ukip8mywhkebtmyg1jnq64jjqg7b.png',
  繁育: 'https://patchwiki.biligame.com/images/sr/6/6a/klt1z9rywqk66mu9y7q7crxi0iz21p8.png'
}

export const fateFullIcon: FateIcon = {
  毁灭: 'https://patchwiki.biligame.com/images/sr/7/7f/q9b09m1w8qsmmsx50gk36ruzi2t4njy.png',
  巡猎: 'https://patchwiki.biligame.com/images/sr/c/cd/2zjsly4r0sjvl81p7u5v0kafsk5jfn2.png',
  智识: 'https://patchwiki.biligame.com/images/sr/3/3e/517a28zga8ufjxcujfqcs5ycsq75n8w.png',
  同谐: 'https://patchwiki.biligame.com/images/sr/4/44/l84guf6iv5iltvetpb6x53jlpo3340s.png',
  虚无: 'https://patchwiki.biligame.com/images/sr/5/54/oi1xyd1qyboiwrjjr405xfk0eyc3tox.png',
  存护: 'https://patchwiki.biligame.com/images/sr/e/ee/poj7ygfrfv3ncutemra1g1md892p78r.png',
  丰饶: 'https://patchwiki.biligame.com/images/sr/5/53/1okpzbf8i1jh38zh61oupczeytz45rg.png',
  欢愉,
  繁育
}

export const imageCompress = (file: File | Blob, width?: number) => {
  return new Promise<string>((reslove) => {
    const src = URL.createObjectURL(file)
    const img = new Image()
    img.src = src
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reslove('')
        return
      }

      width = width ? (img.width < width ? img.width : width) : img.width
      canvas.width = width
      canvas.height = width * (img.height / img.width)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      reslove(canvas.toDataURL('image/webp'))
      URL.revokeObjectURL(src)
    }
  })
}

export const imageCropper = async (config?: { aspectRatio?: number; maxWidth?: number }) => {
  return new Promise<{ base64: string; raw: File }>((resolve) => {
    const el = document.createElement('input')
    el.type = 'file'
    el.accept = 'image/*'
    el.onchange = async () => {
      if (el.files?.[0]) {
        const img = await imageCompress(el.files[0])
        resolve({
          base64: await cropperOpen(img, config),
          raw: el.files[0]
        })
      }
    }
    el.click()
  })
}
