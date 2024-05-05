<template>
  <Popup :index="props.index">
    <Window
      title="设置"
      @close="close"
    >
      <div class="data">
        <div class="info">
          <div>当前模式: {{ setting.details ? '跃迁' : '智库' }}</div>
          <div style="margin-top: 20px">光锥数量: {{ data.lightCone.length }}{{ dataUsage }}</div>
        </div>
        <div class="box">
          <Btn
            class="btn"
            name="切换显示模式"
            @click="showModeChange"
          />
          <Btn
            class="btn"
            name="查看更新日志"
            @click="popup.open('log')"
          />
          <div class="line"></div>
          <Btn
            class="btn"
            name="重置数据库"
            @click="reserDatabase"
          />
        </div>
      </div>
    </Window>
  </Popup>
</template>

<script lang="ts" setup>
import { popup } from '@/assets/scripts/popup'
import Btn from '@/components/Common/Btn.vue'
import Popup from '@/utils/components/Popup.vue'
import Window from '@/components/Common/Window.vue'
import { setting, data, showModeChange } from '@/store/data'

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
  popup.open('confirm', {
    title: '重置数据库',
    tip: '该操作会清除所有光锥',
    text: ['确定重置数据库吗？'],
    fn: () => {
      popup.open('loading')
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
.data
  margin 40px 0
  width 1000px

  .info
    margin-bottom 40px
    padding 30px 50px
    border 2px solid rgba(0, 0, 0, 0.2)
    border-radius 10px
    font-size 36px

  .box
    width 100%

    .btn
      margin 10px 0 0
      height 100px
      font-size 42px

    .line
      margin 20px 0
      width 100%
      border-bottom 5px solid rgba(150, 150, 150, 0.5)

    :deep(.disable)
      border none !important

      &:before
        display block !important
</style>
