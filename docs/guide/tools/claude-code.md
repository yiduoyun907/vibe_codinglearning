---
title: Claude Code 实操
description: 安装、权限、项目上下文与最小工作流
---

# Claude Code 实操

<LessonMeta level="入门" minutes="35" prerequisite="心智模型：从意图到交付" output="跑通一次完整的 Claude Code 协作" />

## 学习目标

学完这一课，你应该能：

- 在 Windows 上完成 Claude Code 的安装与验证。
- 理解项目级、用户级权限配置的作用。
- 用「计划 → 修改 → 验证 → 提交」完成一次任务。
- 知道什么时候该 `/clear`，什么时候该 `/compact`。

## 核心概念

### 1. 安装

Claude Code 是运行在终端里的编程智能体。它可以读写项目文件、执行命令、查看报错，并在你授权的范围内完成任务。

Windows 推荐使用原生安装（PowerShell）：

```powershell
irm https://claude.ai/install.ps1 | iex
```

也可以使用 npm 安装，要求 Node.js 22 或更高版本：

```bash
npm install -g @anthropic-ai/claude-code
```

安装完成后，打开新的终端窗口验证：

```bash
claude --version
```

::: tip Windows 上的额外建议
安装 [Git for Windows](https://git-scm.com/downloads/win)。Claude Code 在原生 Windows 上会优先使用 Bash 工具；没有 Git Bash 时会退回到 PowerShell 作为 shell。
:::

### 2. 第一次运行

```bash
cd 你的项目目录
claude
```

首次运行会要求登录。登录后在项目目录里启动会话，Claude Code 会把当前目录作为工作区。

### 3. 权限模型

Claude Code 的权限配置写在 `settings.json` 中，分为三个层级：

| 位置 | 作用范围 |
| --- | --- |
| `~/.claude/settings.json` | 你的所有项目 |
| `.claude/settings.json` | 当前项目，可提交到仓库 |
| `.claude/settings.local.json` | 当前项目，仅本地，不提交 |

核心字段是 `allow`、`ask`、`deny`：

```json
{
  "permissions": {
    "allow": ["Bash(npm run *)", "Bash(git status)", "Bash(git diff *)"],
    "ask": ["Bash(git push *)"],
    "deny": ["Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)"]
  }
}
```

关键规则：

- **deny 优先级最高**，任何层级设置的 deny 都不能被其他层级覆盖。
- `allow` 只是免去重复确认，不代表操作安全。
- 不要为了省事使用跳过所有权限确认的模式。真要用，也只在隔离环境和可回滚的项目里用。

### 4. 项目上下文：CLAUDE.md

`CLAUDE.md` 是每次会话开始时自动加载的项目说明。内容包括：

- 安装、构建、测试命令；
- 代码风格和目录约定；
- 不能改的文件、不能用的依赖；
- 项目特有的坑。

在项目里运行 `/init`，Claude 会读取项目结构并生成初稿。之后手动精简，保留「删掉它 Claude 就会犯错」的内容。

```bash
# 在 Claude Code 会话内执行
/init
```

### 5. 最小工作流

一次可靠的任务，按下面五步走：

1. **确认状态**：`git status` 干净，当前分支正确。
2. **要计划**：先把需求和验收标准说清楚，让 Claude 给出改动计划，确认后再执行。
3. **小步修改**：一次只做一个可验证的改动。
4. **验证**：运行测试或手动检查，再看 `git diff`。
5. **提交**：通过后立即提交，形成可回滚的检查点。

### 6. 上下文管理

| 场景 | 做法 |
| --- | --- |
| 换了一个不相关的任务 | `/clear`，开新会话 |
| 同一任务但对话很长 | `/compact`，压缩历史并保留摘要 |
| 需要确认加载了什么 | `/context` |
| 要让 Claude 看某个文件 | 用 `@文件路径` 引用，而不是整段粘贴 |

::: warning 不要把所有东西塞进一个会话
同一个会话里连续做三件不相关的事，旧上下文会干扰新任务。上下文越长，模型越容易忽略细节。
:::

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `/init` | 生成 CLAUDE.md 初稿 |
| `/clear` | 清空当前会话上下文 |
| `/compact` | 压缩会话历史 |
| `/context` | 查看上下文占用和已加载的记忆文件 |
| `/permissions` | 查看和调整权限 |
| `/mcp` | 管理 MCP 服务器 |
| `/model` | 切换模型 |
| `/doctor` | 检查安装与配置问题 |
| `/help` | 查看全部命令 |

## 动手任务

在一个空目录里完成下面这次协作：

1. 创建目录 `hello-claude`，进入并启动 `claude`。
2. 用一句话提出需求，并附上验收标准：

   > 创建一个单文件 `index.html`，实现一个计数器：显示当前数字，有加一、减一和重置三个按钮，页面在移动端可用。验收标准：点击按钮数字正确变化，刷新后归零，无控制台报错。

3. 先让 Claude 给出计划，确认后再让它写文件。
4. 打开页面手动验证三个验收点。
5. 让它做一个小改动（例如把按钮改成等宽排列），再验证一次。
6. 退出前运行 `/context`，观察当前上下文里有哪些内容。

如果你已经初始化了 Git，在每次验证通过后提交一次。

## 验收清单

- [ ] `claude --version` 能正常输出版本号。
- [ ] 能解释 `allow`、`ask`、`deny` 的区别，并知道 deny 优先级最高。
- [ ] 项目中存在一份经过精简的 CLAUDE.md。
- [ ] 完成过一次「计划 → 修改 → 验证 → 提交」。
- [ ] 知道 `/clear` 和 `/compact` 分别适用于什么场景。

## 常见坑

- **无脑点允许**：权限提示是在保护你，尤其是删除、推送、读取敏感文件之类的操作。
- **一个会话做所有事**：任务切换时不清上下文，旧信息会污染新判断。
- **不写 CLAUDE.md**：每次会话都重新解释项目，既低效又容易漏掉约定。
- **只看结果不看 diff**：能跑通不代表没有引入副作用。
- **把密钥贴进对话**：包括 `.env` 内容、Token、数据库连接串。
- **在脏工作区上让 AI 大改**：出问题时你无法区分哪些改动来自 AI。

## 延伸阅读

- [编辑器与终端](/guide/tools/editor-terminal)
- [Git 最小必要技能](/guide/tools/git-basics)
- [写一份好用的 CLAUDE.md](/guide/spec/claude-md)
- Claude Code 官方文档：<https://code.claude.com/docs>

<MarkComplete />
