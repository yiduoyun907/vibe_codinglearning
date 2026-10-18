<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useProgress } from '../useProgress'

const { page } = useData()
const { isDone, toggle } = useProgress()

const lessonId = computed(() => page.value.relativePath.replace(/\.md$/, ''))
const done = computed(() => isDone(lessonId.value))
</script>

<template>
  <div class="mark-complete" :class="{ 'is-done': done }">
    <button type="button" @click="toggle(lessonId)">
      <span class="mark-complete__icon" aria-hidden="true"></span>
      {{ done ? '已完成，点击撤销' : '标记本课为已完成' }}
    </button>
    <span class="mark-complete__hint">进度仅保存在当前浏览器，不会上传。</span>
  </div>
</template>
