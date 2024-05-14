<template>
  <Popup :index="props.index">
    <Window
      title="设置"
      @close="close"
    >
      <div class="data">
        <div
          class="info"
          title="切换显示模式"
          @click="setting.details = !setting.details"
        >
          <div class="text">
            <span class="label">显示模式</span>
            <span class="value">{{ setting.details ? '智库界面' : '跃迁界面' }}</span>
          </div>
          <Icon
            name="change"
            class="icon"
          />
        </div>
        <div
          class="info"
          title="切换下载模式"
          @click="setting.download = !setting.download"
        >
          <div class="text">
            <span class="label">下载模式</span>
            <span class="value">{{ setting.download ? '下载图片' : '打开新窗口' }}</span>
          </div>
          <Icon
            name="change"
            class="icon"
          />
        </div>
        <div
          class="info"
          title="重置数据库"
          @click="reserDatabase"
        >
          <div class="text">
            <span class="label">光锥数量</span>
            <span class="value">{{ data.lightCone.length }}{{ dataUsage }} </span>
          </div>
          <Icon
            name="trash"
            class="icon"
          />
        </div>
        <div
          class="info"
          title="查看更新日志"
          @click="popupManager.open('log')"
        >
          <div class="text">
            <span class="label">最后更新</span>
            <span class="value">{{ Log[0]?.time || '-' }}</span>
          </div>
          <Icon
            name="note"
            class="icon"
          />
        </div>
      </div>
    </Window>
  </Popup>
</template>

<script lang="ts" setup>
import { popupManager } from '@/assets/scripts/popup'
import { data, setting } from '@/store/data'
import { Popup, Window } from 'star-rail-vue'
import Icon from '../Common/Icon.vue'
import Log from '@/assets/data/log'

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

const dataUsage = computed(() => ` (${countStrToSize(JSON.stringify(data.lightCone))})`)

const reserDatabase = () => {
  popupManager.open('confirm', {
    title: '重置数据库',
    tip: '该操作会清除所有光锥',
    text: ['确定重置数据库吗？'],
    fn: () => {
      popupManager.open('loading')
      const request = indexedDB.deleteDatabase('sr-light-cone')
      request.onblocked = () => {
        location.reload()
      }
      request.onsuccess = () => {
        location.reload()
      }
    }
  })
}
</script>

<style lang="stylus" scoped>
$margin = 40px

.data
  margin 40px 0
  width 1000px

  .info
    display flex
    justify-content space-between
    align-items center
    margin-bottom 20px
    border 2px solid rgba(0, 0, 0, 0.2)
    border-radius 10px
    font-size 36px

    &:hover
      background #ddd

      .icon
        color #333

    .text
      display flex
      align-items center
      height 100px

      .label
        display flex
        align-items center
        padding 0 $margin
        width 150px
        height 100%
        border-right 2px solid rgba(0, 0, 0, 0.2)

      .value
        margin 0 $margin
        color #333

    .icon
      margin-right $margin
      color #aaa
</style>
