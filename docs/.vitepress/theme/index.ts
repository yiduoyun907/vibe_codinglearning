import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'
import LessonMeta from './components/LessonMeta.vue'
import MarkComplete from './components/MarkComplete.vue'
import ProgressOverview from './components/ProgressOverview.vue'
import ProgressSummary from './components/ProgressSummary.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LessonMeta', LessonMeta)
    app.component('MarkComplete', MarkComplete)
    app.component('ProgressOverview', ProgressOverview)
    app.component('ProgressSummary', ProgressSummary)
  }
} satisfies Theme
