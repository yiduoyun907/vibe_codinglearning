# Vibe Coding 学习站

个人 Vibe Coding 学习与实践平台。以「路线 → 课程 → 实验 → 项目 → 复盘」为闭环，内容以 Markdown 维护，VitePress 构建为静态站点。

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

```
docs/
├── .vitepress/
│   ├── config.mts            # 站点、导航、侧边栏、搜索配置
│   ├── lessons.ts            # 课程清单（侧边栏与进度组件共用）
│   └── theme/
│       ├── index.ts          # 主题入口
│       ├── custom.css        # 视觉样式
│       └── components/       # 课程元信息、完成按钮、进度总览
├── index.md                  # 首页
├── roadmap/                  # 学习路线
├── guide/                    # 核心课程
│   ├── core/                 # 认知基础
│   ├── tools/                # 工具链
│   └── spec/                 # 提示与规格
├── labs/                     # 动手实验
├── projects/                 # 实战项目
├── anti-patterns/            # 反模式与事故库
├── log/                      # 学习日志
└── resources/                # 资源索引
```

## 新增一课

1. 在 `docs/guide/` 对应阶段下新建 Markdown 文件。
2. 在 `docs/.vitepress/lessons.ts` 的 `courseSections` 中登记课程，侧边栏与进度统计会自动更新。
3. 课程正文使用统一结构：

```md
<LessonMeta level="入门" minutes="20" prerequisite="无" output="一份可运行的页面" />

## 学习目标

## 核心概念

## 动手任务

## 验收清单

## 常见坑

## 延伸阅读

<MarkComplete />
```

## 部署到 GitHub Pages

仓库推送后，在 GitHub 仓库的 **Settings → Pages → Build and deployment** 中将 Source 设为 **GitHub Actions**。`.github/workflows/deploy.yml` 会自动构建并发布。

站点默认按仓库名 `vibe_codinglearning` 设置子路径。如果仓库名不同，修改工作流中的 `BASE_PATH`。

## 可复用模板

`templates/` 目录提供四份可直接复制的模板：

- `CLAUDE.md`：项目上下文
- `SPEC.md`：功能规格
- `handoff.md`：会话交接
- `learning-log.md`：学习日志

## 内容原则

- 每课必须有可验证的产出，不以「读完」为标准。
- 优先记录真实踩坑与失败案例，而非搬运二手结论。
- 先写自用版本，内容成熟后再整理为公开教程。
- 不在仓库中提交任何密钥、Token 或私人数据。
