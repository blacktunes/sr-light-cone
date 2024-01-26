<template>
  <div
    id="main"
    :style="{
      width: `${width * scale}px`,
      height: `${(height + bottom) * scale}px`
    }"
  >
    <div
      id="home"
      :style="{
        transform: `scale(${scale})`,
        width: `${width}px`,
        height: `${height}px`
      }"
    >
      <Component
        v-for="(item, index) in components"
        :key="index"
        :is="item"
      />
      <Component
        v-for="(item, key) in popupComponents"
        :index="item.index"
        :name="key"
        :is="item.compontnt"
        :key="key"
        @close="closeWindow"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, toRef } from 'vue'
import type { Component } from 'vue'
import viewport from './store/viewport'
import { closeWindow, popupComponents } from './assets/scripts/popup'

// 动态加载所有组件
const components: Component[] = []
const modules = {
  ...import.meta.glob<{ default: Component }>(
    [
      // 组件位置
      './components/*.vue'
    ],
    {
      eager: true,
      import: 'default'
    }
  )
}
for (const i in modules) {
  components.push(defineComponent(modules[i]))
}

// 计算窗口尺寸
const width = 3200
const height = (width / 16) * 9
const bottom = 0
const scale = toRef(viewport, 'scale')

const setSize = () => {
  viewport.horizontal = window.innerWidth <= 550 && window.innerWidth < window.innerHeight
  viewport.scale = Math.min(window.innerWidth / width, window.innerHeight / (height + bottom))
}
setSize()

window.onresize = () => {
  setSize()
}
</script>

<style lang="stylus" scoped>
#main
  #home
    position relative
    height 100%
    width 100%
    transform-origin left top
</style>
