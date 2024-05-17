const log: Log[] = [
  {
    time: '2024-05-17',
    text: [
      {
        text: '重构框架',
        info: [
          '将大部分通用组件拆分到npm包<a href="https://www.npmjs.com/package/star-rail-vue" trage="_blank">star-rail-vue</a>',
          '如出现功能异常请及时联系修复'
        ],
        highlight: true
      },
      {
        text: '重做设置窗口',
        info: '增加了下载模式选项，可以选择直接下载截图或者打开新窗口显示'
      },
      {
        text: '优化部分动画效果'
      }
    ]
  },
  {
    time: '2024-05-06',
    text: [
      {
        text: '重构框架',
        highlight: true
      },
      {
        text: '修复了部分显示异常'
      }
    ]
  },
  {
    time: '2024-04-09',
    text: [
      {
        text: '优化跃迁界面的动画效果'
      },
      {
        text: '修复跃迁界面截图背景丢失'
      },
      {
        text: '修复智库界面技能说明高亮错误'
      }
    ]
  },
  {
    time: '2024-04-07',
    text: [
      {
        text: '增加PWA相关功能',
        info: ['增加离线访问，加载完成后没有网络也可以使用', '增加图片/字体缓存，减少加载时间'],
        highlight: true
      },
      {
        text: '增加光锥详情界面',
        info: ['可在主界面右下角的按钮或展示界面按Tab切换为跃迁界面'],
        highlight: true
      },
      {
        text: '增加命途',
        info: ['贪饕', '均衡', '秩序', '神秘']
      },
      {
        text: '优化动画效果'
      }
    ]
  },
  {
    time: '2024-03-29',
    text: [
      {
        text: '优化弹出窗口',
        info: '修复Loading界面层级过高的问题'
      },
      {
        text: '优化移动端的显示和操作'
      },
      {
        text: '修复新建光锥后不会自动打开的问题'
      }
    ]
  },
  {
    time: '2024-01-27',
    text: [
      {
        text: '重写底层框架',
        highlight: true
      }
    ]
  },
  {
    time: '2023-12-14',
    text: [
      {
        text: '增加新获得标记'
      },
      {
        text: '优化素材和部分效果'
      },
      {
        text: '图片剪裁增减键盘确认'
      }
    ]
  },
  {
    time: '2023-12-10',
    text: [
      {
        text: '增加GIF动图支持'
      },
      {
        text: '替换繁育图标'
      }
    ]
  },
  {
    time: '2023-12-07',
    text: [
      {
        text: '增加分类筛选展示',
        info: ['现在可以同时保存多个光锥']
      },
      {
        text: '增加命途',
        info: ['开拓', '欢愉', '记忆', '繁育']
      },
      {
        text: '增加图片剪裁'
      },
      {
        text: '增加图片保存功能'
      },
      {
        text: '完善功能和细节',
        info: [
          '',
          '上传图片后会以文件名为默认光锥名',
          '增加光锥界面的细节',
          '移除部分兼容性较差的属性'
        ]
      }
    ]
  },
  {
    time: '2023-11-29',
    text: [
      {
        text: '初版上线'
      }
    ]
  }
]

export default log
