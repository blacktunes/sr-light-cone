<template>
  <Popup :index="props.index">
    <Window
      title="数据管理"
      @close="close"
    >
      <div class="data">
        <div class="box">
          <div class="info">
            <span class="label">光锥数量</span>
            <span class="value">
              <span>{{ data.lightCone.length }}</span>
            </span>
          </div>
          <div class="info">
            <span class="label">数据大小</span>
            <span class="value">
              <span>{{ dataUsage }}</span>
            </span>
          </div>
        </div>
        <div class="box">
          <div class="btn-group">
            <div
              class="btn"
              :class="{ disable: !hasData }"
              @click="deleteData"
            >
              <span>清空</span>
            </div>
            <div
              class="btn"
              :class="{ disable: !hasData }"
              @click="downloadData"
            >
              <span>导出</span>
            </div>
            <div
              class="btn"
              @click="uploadDate"
            >
              <span>导入</span>
            </div>
          </div>
        </div>
      </div>
    </Window>
  </Popup>
</template>

<script lang="ts" setup>
import { popupManager } from '@/assets/scripts/popup'
import { Accept, uploadFile } from '@/assets/scripts/upload'
import { data } from '@/store/data'
import { compressToUint8Array } from 'lz-string'
import { Popup, Window } from 'star-rail-vue'

const props = defineProps<{
  name: string
  index: number
}>()

const emits = defineEmits<{
  (event: 'close', name: string): void
}>()

const close = () => {
  emits('close', props.name)
}

const countStrToSize = (str: string) => {
  let count = 0
  for (let i = 0; i < str.length; i++) {
    count += Math.ceil(str.charCodeAt(i).toString(2).length / 8)
  }

  if (count === 0) return '0 B'
  const k = 1024,
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(count) / Math.log(k))

  return `${Number((count / Math.pow(k, i)).toPrecision(3))} ${sizes[i]}`
}

const dataUsage = computed(() => `${countStrToSize(JSON.stringify(data.lightCone))}`)

const hasData = computed(() => data.lightCone.length > 0)

const deleteData = () => {
  if (!hasData.value) return

  popupManager.open('confirm', {
    title: '清空光锥',
    text: ['确定删除所有光锥吗？'],
    fn: async () => {
      data.lightCone.length = 0
      await nextTick()
      popupManager.open('confirm', {
        title: '光锥已清空',
        text: ['已删除所有光锥']
      })
    }
  })
}

const downloadData = () => {
  const str = JSON.stringify(toRaw(data.lightCone), null, 2)
  const blob = new Blob([compressToUint8Array(str)], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `SR-${new Date().toLocaleString()}${Accept.lightCone}`
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

const uploadDate = async () => {
  const el = document.createElement('input')
  el.type = 'file'
  el.accept = `.png,${Accept.lightCone}`
  el.onchange = async () => {
    const file = el.files?.[0]
    if (file) {
      await uploadFile(file)
    }
  }
  el.click()
  el.remove()
}
</script>

<style lang="stylus" scoped>
.data
  display flex
  flex-direction column
  margin 40px 0 60px
  width 1000px
  font-size 36px
  gap 30px

  .box
    box-sizing border-box
    border 4px solid rgba(0, 0, 0, 0.2)

  .info
    display flex
    justify-content space-between
    align-items center
    box-sizing border-box
    width 100%
    height 100px
    border-bottom 2px solid rgba(0, 0, 0, 0.2)

    &:last-child
      border-bottom none

    .label
      display flex
      flex 0 0 33.33%
      justify-content center
      align-items center
      height 100%
      border-right 2px solid rgba(0, 0, 0, 0.2)

    .value
      flex 1
      padding 0 50px
      color #333
      text-align center

  .btn-group
    display flex
    justify-content space-between
    align-items center
    box-sizing border-box
    width 100%
    height 100px
    border 2px solid rgba(0, 0, 0, 0)

    .btn
      display flex
      flex 0 0 calc(33.33% + 1px)
      justify-content center
      align-items center
      box-sizing border-box
      height 100%
      border-right 2px solid rgba(0, 0, 0, 0.2)
      color #333
      user-select none

      &:last-child
        border-right none

      &:hover
        background #ddd

.line
  width 100%
  height 30px

.disable
  color rgba(0, 0, 0, 0.2) !important
  pointer-events none
</style>
