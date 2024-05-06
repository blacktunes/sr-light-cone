import { getFontEmbedCSS, toPng } from 'html-to-image'

export const screenshot = async (dom: HTMLElement, name = '', width?: number, height?: number) => {
  try {
    const fontEmbedCSS = await getFontEmbedCSS(dom)
    const title = `${name} - ${new Date().toLocaleString()}`
    const dataUrl = await toPng(dom, {
      width,
      height,
      fontEmbedCSS
    })
    const img = new Image()
    img.src = dataUrl
    img.alt = title
    img.style.width = '100%'
    const win = window.open('', '_blank')
    if (win) {
      win.document.body.style.display = 'flex'
      win.document.body.style.justifyContent = 'center'
      win.document.body.style.alignItems = 'center'
      win.document.title = title
      win.document.body.appendChild(img)
    } else {
      const link = document.createElement('a')
      link.download = `${title}.png`
      link.href = dataUrl
      link.click()
    }
  } catch (error) {
    console.error('截图保存错误', error)
  }
}
