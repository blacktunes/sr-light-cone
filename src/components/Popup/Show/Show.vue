<template>
  <Popup :index="index">
    <Component :is="setting.details ? Details : EventWarp" @close="close" />
  </Popup>
</template>

<script lang="ts" setup>
import Popup from '@/components/Common/Popup.vue'
import Details from './Details.vue'
import EventWarp from './EventWarp.vue'
import { setting } from '@/store/data'

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
</script>
