import { defineConfig } from 'vitepress'
import taskLists from 'markdown-it-task-lists'
import { courseSections } from './lessons'

const base = process.env.BASE_PATH || '/'

/**
 * 中文检索分词：CJK 按单字 + 二元组切分，非 CJK 按单词切分。
 * 单字保证召回，二元组提升精度。
 */
function tokenize(text: string): string[] {
  const normalized = text.toLowerCase()
  const segments = normalized.match(/[一-鿿]+|[^一-鿿]+/g) ?? []
  const tokens: string[] = []

  for (const segment of segments) {
    if (/^[一-鿿]/.test(segment)) {
      const characters = Array.from(segment)
      tokens.push(...characters)
      for (let index = 0; index < characters.length - 1; index += 1) {
        tokens.push(characters[index] + characters[index + 1])
      }
      continue
    }

    tokens.push(...segment.split(/[^\p{L}\p{N}]+/u).filter(Boolean))
  }

  return tokens
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'Vibe Coding 学习站',
  description: '写给零基础学习者的 Vibe Coding 学习平台：从看懂第一个名词，到独立交付第一个项目。',
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }],
    ['meta', { name: 'theme-color', content: '#4f5bd5' }]
  ],
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(taskLists, { enabled: false, label: true })
    }
  },
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Vibe Coding',
    nav: [
      { text: '零基础开始', link: '/start/' },
      { text: '学习路线', link: '/roadmap/' },
      { text: '课程', link: '/guide/' },
      { text: '实验', link: '/labs/' },
      { text: '项目', link: '/projects/' },
      { text: '术语附录', link: '/appendix/' },
      {
        text: '更多',
        items: [
          { text: '反模式库', link: '/anti-patterns/' },
          { text: '学习日志', link: '/log/' },
          { text: '资源索引', link: '/resources/' }
        ]
      }
    ],
    sidebar: [
      {
        text: '入门准备',
        items: [
          { text: '零基础开始', link: '/start/' },
          { text: '学习路线', link: '/roadmap/' },
          { text: '课程总览', link: '/guide/' }
        ]
      },
      ...courseSections.map((section) => ({
        text: section.text,
        collapsed: false,
        items: section.items.map((lesson) => ({
          text: lesson.title,
          link: lesson.link
        }))
      })),
      {
        text: '动手实验',
        collapsed: true,
        items: [
          { text: '实验总览', link: '/labs/' },
          { text: '01 · 第一次交付', link: '/labs/01-first-delivery' },
          { text: '02 · 给项目写 CLAUDE.md', link: '/labs/02-claude-md' },
          { text: '03 · 从 SPEC 到代码', link: '/labs/03-spec-to-code' },
          { text: '04 · 用 Git 回滚', link: '/labs/04-git-rollback' }
        ]
      },
      {
        text: '项目与复盘',
        items: [
          { text: '实战项目', link: '/projects/' },
          { text: '反模式库', link: '/anti-patterns/' },
          { text: '学习日志', link: '/log/' },
          { text: '资源索引', link: '/resources/' }
        ]
      },
      {
        text: '术语与依据',
        items: [
          { text: '附录总览', link: '/appendix/' },
          { text: '编程与网站基础', link: '/appendix/glossary-basics' },
          { text: 'AI 与 Vibe Coding', link: '/appendix/glossary-ai' },
          { text: '工程、协作与安全', link: '/appendix/glossary-engineering' },
          { text: '内容依据', link: '/appendix/evidence' }
        ]
      }
    ],
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: { tokenize },
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 }
          }
        },
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '输入',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'esc'
                }
              }
            }
          }
        }
      }
    },
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdated: {
      text: '最后更新于'
    },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '语言',
    footer: {
      message: '个人学习项目，内容持续迭代。引用请注明来源。',
      copyright: 'Built with VitePress'
    }
  }
})
