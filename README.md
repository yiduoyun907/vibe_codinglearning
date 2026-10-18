# Vibe Coding 学习站

面向零基础学习者的 Vibe Coding 学习与实践平台。以「路线 → 课程 → 实验 → 项目 → 复盘」为闭环，内容以 Markdown 维护，VitePress 构建为静态站点。

## 线上地址

- 站点：<https://yiduoyun907.github.io/vibe_codinglearning/>
- 仓库：<https://github.com/yiduoyun907/vibe_codinglearning>

## 设计原则

- **零基础可读**：先给生活化的比方，再给准确解释。
- **重要概念不简化**：每个关键术语保留「准确地说」和「常见误解」。
- **产出驱动**：每课都有动手任务和可观察的验收清单。
- **术语可查**：常用名词集中放在附录，正文只在第一次出现时简述并链接。
- **内容可维护**：Markdown + Git，推送后自动构建部署。

## 本地运行

```bash
npm install
npm run docs:dev
```

构建与预览：

```bash
npm run docs:build
npm run docs:preview
```

## 目录结构

```text
docs/
├── .vitepress/
│   ├── config.mts            # 站点、导航、侧边栏、搜索配置
│   ├── lessons.ts            # 课程清单（侧边栏与进度组件共用）
│   └── theme/
│       ├── index.ts          # 主题入口
│       ├── custom.css        # 视觉样式
│       └── components/       # 课程元信息、完成按钮、进度总览
├── index.md                  # 首页
├── start/                    # 零基础开始
├── roadmap/                  # 学习路线
├── guide/                    # 核心课程
│   ├── core/                 # 认知基础
│   ├── tools/                # 工具链
│   └── spec/                 # 提示与规格
├── labs/                     # 动手实验
├── projects/                 # 实战项目
├── anti-patterns/            # 反模式与事故库
├── log/                      # 学习日志
├── resources/                # 资源索引
└── appendix/                 # 术语附录
    ├── index.md              # 附录总览
    ├── glossary-basics.md    # 编程与网站基础
    ├── glossary-ai.md        # AI 与 Vibe Coding
    └── glossary-engineering.md # 工程、协作与安全
```

## 新增一课

1. 在 `docs/guide/` 对应阶段下新建 Markdown 文件。
2. 在 `docs/.vitepress/lessons.ts` 的 `courseSections` 中登记课程，侧边栏与进度统计会自动更新。
3. 课程正文使用统一结构：

```md
<LessonMeta level="入门" minutes="20" prerequisite="无" output="一份可运行的页面" />

## 学习目标

## 一句话理解

## 核心概念

## 动手任务

## 验收清单

## 卡住了怎么办

## 常见误解

## 本课术语

## 延伸阅读

<MarkComplete />
```

## 新增术语

1. 在对应的附录页新增 `### 术语名`。
2. 按四段结构写：一句话、打个比方、准确地说、常见误解。
3. 在相关课程的「本课术语」中加上链接，例如 `/appendix/glossary-ai#上下文`。
4. 运行 `npm run docs:build`，确认锚点可用。中文术语的锚点通常就是术语本身；含英文或标点的术语，建议构建后用页面检查确认。

## 部署到 GitHub Pages

仓库推送后，在 GitHub 仓库的 **Settings → Pages → Build and deployment** 中将 Source 设为 **GitHub Actions**。`.github/workflows/deploy.yml` 会自动构建并发布。

站点默认按仓库名 `vibe_codinglearning` 设置子路径。如果仓库名不同，修改工作流中的 `BASE_PATH`。

当前账户计划不支持私有仓库的 Pages，因此仓库为公开状态。

## 可复用模板

`templates/` 目录提供四份可直接复制的模板：

- `CLAUDE.md`：项目上下文
- `SPEC.md`：功能规格
- `handoff.md`：会话交接
- `learning-log.md`：学习日志

## 内容原则

- 每课必须有可验证的产出，不以「读完」为标准。
- 先给生活化比方，再给准确解释；重要概念不为了易懂而牺牲准确性。
- 优先记录真实踩坑与失败案例，而非搬运二手结论。
- 术语集中维护，正文与附录保持一致。
- 不在仓库中提交任何密钥、Token 或私人数据。
