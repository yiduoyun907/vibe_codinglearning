---
title: Claude Code 实操
description: 从安装到第一次完整协作
---

# Claude Code 实操

<LessonMeta level="入门" minutes="35" prerequisite="心智模型：从意图到交付" output="跑通一次完整的 Claude Code 协作" />

## 学习目标

学完这一课，你应该能：

- 在自己的电脑上安装并启动 Claude Code。
- 看懂权限提示，知道 allow、ask、deny 分别是什么意思。
- 完成一次「说需求 → 看计划 → 修改 → 验证」。
- 知道什么时候该清空会话，什么时候该压缩。

## 一句话理解

**Claude Code 是一个住在终端里的 AI 助手。它能读你的项目文件、改代码、运行命令，然后根据结果继续调整。**

## 先认识四个词

| 词 | 用大白话说 |
| --- | --- |
| 终端 | 用打字给电脑下命令的窗口，不是点按钮 |
| 项目目录 | 你这个项目所在的文件夹 |
| 会话 | 你和 AI 的一次连续对话 |
| 权限 | 规定 AI 能自动做什么、必须问你、绝对不能做什么 |

不懂的词可以查[术语附录](/appendix/)。

## 核心概念

### 1. 安装

Windows 推荐使用官方安装脚本。打开 **PowerShell**，输入：

```powershell
irm https://claude.ai/install.ps1 | iex
```

如果你更熟悉 npm，也可以这样安装（需要 Node.js 22 或更高版本）：

```bash
npm install -g @anthropic-ai/claude-code
```

安装完成后，**关掉终端再重新打开**，输入：

```bash
claude --version
```

能输出版本号，就说明安装成功。

::: tip Windows 上的额外建议
安装 [Git for Windows](https://git-scm.com/downloads/win)。Claude Code 在原生 Windows 上会优先使用 Bash 工具；没有 Git Bash 时会改用 PowerShell。
:::

### 2. 第一次启动

```bash
cd 你的项目目录
claude
```

第一次运行会让你登录。登录后，Claude Code 会把当前目录当作工作区。

::: warning 先确认你在哪个目录
在终端里先运行 `pwd`（Mac/Linux/Git Bash）或 `cd`（PowerShell）确认当前位置。**在错误的目录里启动，AI 可能会改错文件。**
:::

### 3. 权限：三道门

权限规则可以理解成三道门：

| 规则 | 意思 | 例子 |
| --- | --- | --- |
| allow | 这类操作可以直接做，不用每次问你 | `Bash(git status)` |
| ask | 做之前必须问你 | `Bash(git push *)` |
| deny | 任何情况下都不许做 | 读取 `.env` 文件 |

配置写在 `settings.json` 里：

```json
{
  "permissions": {
    "allow": ["Bash(npm run *)", "Bash(git status)", "Bash(git diff *)"],
    "ask": ["Bash(git push *)"],
    "deny": ["Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)"]
  }
}
```

三条重要规则：

- **deny 优先级最高**，任何层级设置后都不能被覆盖。
- allow 只是「不用重复确认」，不代表操作安全。
- 不要为了省事关闭所有权限确认。真要用，也只在临时目录和可回滚的项目里用。

### 4. CLAUDE.md：给 AI 的入职手册

`CLAUDE.md` 是每次会话自动加载的项目说明。它告诉 AI：

- 怎么安装、运行、测试；
- 项目有哪些约定；
- 哪些文件不能动；
- 以前踩过什么坑。

在项目里运行：

```text
/init
```

Claude 会生成一份初稿。初稿通常太长，你需要删掉「读代码就能知道」的内容。

### 5. 最小工作流

一次可靠的任务，按五步走：

1. **确认状态**：`git status` 干净，当前目录正确。
2. **先要计划**：把需求和验收标准说清楚，让 Claude 先说明它准备改哪些文件、怎么验证。
3. **小步修改**：一次只做一个能验证的改动。
4. **自己验证**：运行页面或测试，再看 `git diff`。
5. **提交存档**：通过后立即提交，形成可回滚的检查点。

### 6. 什么时候清空，什么时候压缩

| 情况 | 做法 | 为什么 |
| --- | --- | --- |
| 换了一个不相关的任务 | `/clear` | 旧任务的信息会干扰新任务 |
| 同一任务，但对话太长了 | `/compact` | 压缩历史，保留摘要，腾出空间 |
| 想确认 AI 现在看到了什么 | `/context` | 查看上下文占用和已加载的文件 |
| 想让 AI 看某个文件 | 用 `@文件路径` | 精确引用，不要整段粘贴 |

::: tip 一个习惯
每完成一个独立任务，就 `/clear` 一次。不要让同一个会话包办一整天的所有事情。
:::

## 常用命令

| 命令 | 用大白话说 |
| --- | --- |
| `/init` | 生成 CLAUDE.md 初稿 |
| `/clear` | 清空当前会话 |
| `/compact` | 压缩会话历史 |
| `/context` | 查看上下文里有什么 |
| `/permissions` | 查看和调整权限 |
| `/mcp` | 管理外部工具 |
| `/model` | 切换模型 |
| `/doctor` | 检查安装和配置问题 |
| `/help` | 查看全部命令 |

## 动手任务

在一个空目录里完成第一次协作：

### 第 1 步：建目录

```bash
mkdir -p ~/vibe-lab/hello-claude
cd ~/vibe-lab/hello-claude
```

### 第 2 步：启动

```bash
claude
```

### 第 3 步：提需求

把下面这段直接发给它：

```text
创建一个单文件 index.html，实现一个计数器：
- 显示当前数字
- 有加一、减一、重置三个按钮
- 页面在手机宽度下不溢出

验收标准：
1. 点击加一，数字加 1
2. 点击减一，数字减 1
3. 点击重置，数字回到 0
4. 刷新后数字归零
5. 浏览器控制台没有报错

先不要写代码，先告诉我你准备怎么做，以及怎么验证。
```

### 第 4 步：看计划，再让它做

如果计划合理，回复「按这个计划做」。如果不对，先改计划。

### 第 5 步：自己验证

打开 `index.html`，逐条检查五个验收标准。不要只问 AI「做好了吗」。

### 第 6 步：查看上下文

退出前运行 `/context`，看看当前会话里加载了哪些内容。

## 验收清单

- [ ] `claude --version` 能输出版本号。
- [ ] 能解释 allow、ask、deny 的区别，并知道 deny 优先级最高。
- [ ] 项目中有一份经过精简的 CLAUDE.md。
- [ ] 完成过一次「计划 → 修改 → 验证」。
- [ ] 知道 `/clear` 和 `/compact` 分别什么时候用。

## 卡住了怎么办

| 现象 | 先检查 |
| --- | --- |
| 提示 `claude` 不是可识别的命令 | 关掉终端重新打开；检查安装是否完成、PATH 是否生效 |
| 登录失败 | 检查网络和账号；按提示重新登录 |
| 权限提示太多 | 看清它在请求什么，再决定允许或拒绝；不要无脑点允许 |
| AI 改了不该改的文件 | 立即 `git diff` 查看，必要时 `git restore` 回滚 |
| 对话越来越慢、越来越乱 | `/clear` 或 `/compact` |
| 中文显示乱码 | 确认终端编码为 UTF-8；换用 Windows Terminal 或 Git Bash 试试 |

## 常见误解

- **「安装完就什么都会」**：它需要清晰的目标、上下文和验收标准。
- **「权限提示很烦，全部允许」**：权限是在保护你，尤其是删除、推送和读取敏感文件。
- **「一个会话可以做所有事」**：任务切换时不清上下文，旧信息会污染新判断。
- **「CLAUDE.md 越长越专业」**：太长会被忽略，只保留真正影响行为的内容。
- **「AI 说完成了就是完成了」**：验收必须由你自己做。

## 本课术语

- [终端](/appendix/glossary-basics#终端)
- [会话](/appendix/glossary-ai#会话)
- [权限](/appendix/glossary-ai#权限)
- [上下文](/appendix/glossary-ai#上下文)
- [CLAUDE.md](/appendix/glossary-ai#claude-md)

## 延伸阅读

- [编辑器与终端](/guide/tools/editor-terminal)
- [Git 最小必要技能](/guide/tools/git-basics)
- [写一份好用的 CLAUDE.md](/guide/spec/claude-md)
- Claude Code 官方文档：<https://code.claude.com/docs>

<MarkComplete />
