<template>
  <Popup
    :index="index"
    transition="show-transition"
  >
    <Component
      :is="setting.details ? Details : EventWarp"
      @close="close"
    />
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

<style lang="stylus">
.show-transition-enter-active
.show-transition-leave-active
  transition all 0.2s

.show-transition-enter-from
.show-transition-leave-to
  opacity 0

.show-transition-leave-active .details-box
  transition opacity 0.5s ease-in, transform 0.35s ease-out

.show-transition-leave-to .details-box
  opacity 0
  transform translateY(-5%)
</style>
