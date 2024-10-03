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
              @click="exportFile"
            >
              <span>导出</span>
            </div>
            <div
              class="btn"
              @click="inputFile"
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
import { inputFile, exportFile } from '@/assets/scripts/file'
import { popupManager } from '@/assets/scripts/popup'
import { data } from '@/store/data'
import { countStrToSize, Popup, Window } from 'star-rail-vue'

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
