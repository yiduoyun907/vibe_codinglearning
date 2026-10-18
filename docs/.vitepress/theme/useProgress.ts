import { computed, onMounted, onUnmounted, ref } from 'vue'
import { allLessons } from '../lessons'

const STORAGE_KEY = 'vibe-coding-progress'

function readCompleted(): string[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.filter((item): item is string => typeof item === 'string')
  } catch {
    return []
  }
}

export function useProgress() {
  const completed = ref<string[]>([])
  const total = allLessons.length
  const doneCount = computed(() =>
    allLessons.filter((lesson) => completed.value.includes(lesson.id)).length
  )
  const percent = computed(() =>
    total === 0 ? 0 : Math.round((doneCount.value / total) * 100)
  )

  function refresh(): void {
    completed.value = readCompleted()
  }

  function isDone(id: string): boolean {
    return completed.value.includes(id)
  }

  function toggle(id: string): void {
    const next = isDone(id)
      ? completed.value.filter((item) => item !== id)
      : [...completed.value, id]

    completed.value = next

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // 浏览器禁用存储时，进度仅在当前页面生命周期内有效。
    }

    window.dispatchEvent(new CustomEvent('vibe-progress-change'))
  }

  function reset(): void {
    completed.value = []

    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // 忽略存储不可用的情况。
    }

    window.dispatchEvent(new CustomEvent('vibe-progress-change'))
  }

  onMounted(() => {
    refresh()
    window.addEventListener('storage', refresh)
    window.addEventListener('vibe-progress-change', refresh)
  })

  onUnmounted(() => {
    window.removeEventListener('storage', refresh)
    window.removeEventListener('vibe-progress-change', refresh)
  })

  return { completed, total, doneCount, percent, isDone, toggle, reset, refresh }
}
