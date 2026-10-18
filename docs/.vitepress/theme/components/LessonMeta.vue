<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  level?: string
  minutes?: string | number
  prerequisite?: string
  output?: string
}>()

const durationLabel = computed(() => {
  if (props.minutes === undefined) return ''
  if (typeof props.minutes === 'number') return `${props.minutes} 分钟`
  return /^\d+$/.test(props.minutes) ? `${props.minutes} 分钟` : props.minutes
})
</script>

<template>
  <div class="lesson-meta">
    <div v-if="level" class="lesson-meta__item">
      <span class="lesson-meta__label">难度</span>
      <span class="lesson-meta__value">{{ level }}</span>
    </div>
    <div v-if="minutes" class="lesson-meta__item">
      <span class="lesson-meta__label">预计用时</span>
      <span class="lesson-meta__value">{{ durationLabel }}</span>
    </div>
    <div v-if="prerequisite" class="lesson-meta__item">
      <span class="lesson-meta__label">前置</span>
      <span class="lesson-meta__value">{{ prerequisite }}</span>
    </div>
    <div v-if="output" class="lesson-meta__item lesson-meta__item--wide">
      <span class="lesson-meta__label">本课产出</span>
      <span class="lesson-meta__value">{{ output }}</span>
    </div>
  </div>
</template>
