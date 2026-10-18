<script setup lang="ts">
import { withBase } from 'vitepress'
import { useProgress } from '../useProgress'

const { doneCount, total, percent } = useProgress()
</script>

<template>
  <div class="progress-summary">
    <div class="progress-summary__stat">
      <span class="progress-summary__label">学习进度</span>
      <span class="progress-summary__value">{{ doneCount }} / {{ total }}</span>
    </div>
    <div
      class="progress-summary__bar"
      role="progressbar"
      :aria-valuenow="percent"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <span :style="{ width: `${percent}%` }"></span>
    </div>
    <a class="progress-summary__link" :href="withBase('/roadmap/')">查看完整路线</a>
  </div>
</template>
