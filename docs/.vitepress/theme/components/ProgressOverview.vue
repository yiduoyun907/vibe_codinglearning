<script setup lang="ts">
import { withBase } from 'vitepress'
import { courseSections } from '../../lessons'
import { useProgress } from '../useProgress'

const { doneCount, total, percent, isDone, reset } = useProgress()

function handleReset(): void {
  const confirmed = window.confirm('确定要清除所有学习进度吗？此操作不可撤销。')
  if (confirmed) reset()
}
</script>

<template>
  <div class="progress-overview">
    <div class="progress-overview__header">
      <div class="progress-overview__stat">
        <span class="progress-overview__value">{{ percent }}%</span>
        <span class="progress-overview__caption">{{ doneCount }} / {{ total }} 课已完成</span>
      </div>
      <div
        class="progress-overview__bar"
        role="progressbar"
        :aria-valuenow="percent"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span :style="{ width: `${percent}%` }"></span>
      </div>
      <button type="button" class="progress-overview__reset" @click="handleReset">
        重置进度
      </button>
    </div>

    <section
      v-for="section in courseSections"
      :key="section.text"
      class="progress-overview__section"
    >
      <h3>{{ section.text }}</h3>
      <ul>
        <li
          v-for="lesson in section.items"
          :key="lesson.id"
          :class="{ 'is-done': isDone(lesson.id) }"
        >
          <span class="progress-overview__check" aria-hidden="true"></span>
          <a :href="withBase(lesson.link)">{{ lesson.title }}</a>
          <span class="progress-overview__meta">{{ lesson.minutes }} 分钟</span>
        </li>
      </ul>
    </section>
  </div>
</template>
