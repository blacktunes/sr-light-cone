<template>
  <Popup :index="props.index">
    <Window
      title="设置"
      @close="close"
    >
      <div class="data">
        <div
          class="info"
          title="切换显示光锥的界面类型"
          @click="setting.details = !setting.details"
        >
          <div class="text">
            <span class="label">界面类型</span>
            <span class="value">{{ setting.details ? '智库' : '跃迁' }}</span>
          </div>
          <Icon
            name="change"
            class="icon"
          />
        </div>
        <div
          class="info"
          title="切换截图的保存模式"
          @click="setting.download = !setting.download"
        >
          <div class="text">
            <span class="label">截图保存</span>
            <span class="value">{{ setting.download ? '下载图片' : '新窗口打开图片' }}</span>
          </div>
          <Icon
            name="change"
            class="icon"
          />
        </div>
        <div
          class="info"
          title="切换截图的图片质量"
          @click="qualityChange"
        >
          <div class="text">
            <span class="label">图片质量</span>
            <span class="value">{{
              setting.quality === 1 ? '高(3200×1800)' : '低(1600×900)'
            }}</span>
          </div>
          <Icon
            name="change"
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
import Log from '@/assets/data/log'
import { popupManager } from '@/assets/scripts/popup'
import { setting } from '@/store/data'
import { Popup, Window } from 'star-rail-vue'
import Icon from '../Common/Icon.vue'

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

const qualityChange = () => {
  if (setting.quality === 1) {
    setting.quality = 0.5
  } else {
    setting.quality = 1
  }
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
