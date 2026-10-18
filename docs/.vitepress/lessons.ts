export type LessonLevel = '入门' | '进阶' | '实战'

export interface Lesson {
  id: string
  title: string
  link: string
  level: LessonLevel
  minutes: number
}

export interface CourseSection {
  text: string
  items: Lesson[]
}

export const courseSections: CourseSection[] = [
  {
    text: '阶段一 · 认知基础',
    items: [
      {
        id: 'guide/core/what-is-vibe-coding',
        title: 'Vibe Coding 是什么，不是什么',
        link: '/guide/core/what-is-vibe-coding',
        level: '入门',
        minutes: 15
      },
      {
        id: 'guide/core/mental-model',
        title: '心智模型：从意图到交付',
        link: '/guide/core/mental-model',
        level: '入门',
        minutes: 20
      },
      {
        id: 'guide/core/capability-boundaries',
        title: '能力边界：AI 何时帮你、何时拖慢你',
        link: '/guide/core/capability-boundaries',
        level: '入门',
        minutes: 20
      },
      {
        id: 'guide/core/risk-and-responsibility',
        title: '风险与责任',
        link: '/guide/core/risk-and-responsibility',
        level: '入门',
        minutes: 20
      }
    ]
  },
  {
    text: '阶段二 · 工具链',
    items: [
      {
        id: 'guide/tools/claude-code',
        title: 'Claude Code 实操',
        link: '/guide/tools/claude-code',
        level: '入门',
        minutes: 35
      },
      {
        id: 'guide/tools/editor-terminal',
        title: '编辑器与终端',
        link: '/guide/tools/editor-terminal',
        level: '入门',
        minutes: 25
      },
      {
        id: 'guide/tools/git-basics',
        title: 'Git 最小必要技能',
        link: '/guide/tools/git-basics',
        level: '入门',
        minutes: 30
      },
      {
        id: 'guide/tools/mcp',
        title: 'MCP 与工具扩展',
        link: '/guide/tools/mcp',
        level: '进阶',
        minutes: 25
      }
    ]
  },
  {
    text: '阶段三 · 提示与规格',
    items: [
      {
        id: 'guide/spec/requirement-decomposition',
        title: '需求拆解',
        link: '/guide/spec/requirement-decomposition',
        level: '进阶',
        minutes: 30
      },
      {
        id: 'guide/spec/claude-md',
        title: '写一份好用的 CLAUDE.md',
        link: '/guide/spec/claude-md',
        level: '进阶',
        minutes: 25
      },
      {
        id: 'guide/spec/prd-spec',
        title: 'PRD 与 SPEC',
        link: '/guide/spec/prd-spec',
        level: '进阶',
        minutes: 30
      },
      {
        id: 'guide/spec/context-management',
        title: '上下文管理',
        link: '/guide/spec/context-management',
        level: '进阶',
        minutes: 25
      }
    ]
  }
]

export const allLessons: Lesson[] = courseSections.flatMap((section) => section.items)

export const totalMinutes: number = allLessons.reduce((sum, lesson) => sum + lesson.minutes, 0)
