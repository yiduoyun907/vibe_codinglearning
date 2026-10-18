---
title: Git 最小必要技能
description: 给项目装一台时光机，能存档、能看改动、能回滚
---

# Git 最小必要技能

<LessonMeta level="入门" minutes="30" prerequisite="编辑器与终端" output="一次完整的 AI 改动审查与回滚" />

## 学习目标

学完这一课，你应该能：

- 在让 AI 改代码之前，先存一个档。
- 看懂 AI 到底改了哪几行。
- 在三种常见情况下，安全地退回到之前的状态。

## 一句话理解

**Git 是给项目装的一台时光机：每次改动前存个档，出问题就能读档。**

## 核心概念

### 1. 先认识三个词

| 词 | 用大白话说 |
| --- | --- |
| 仓库 | 被 Git 管理的项目文件夹 |
| 提交 | 给当前改动拍一张有说明的快照 |
| diff | 两个版本之间的差异，标出新增、删除和修改 |

### 2. 四个区域

| 区域 | 用大白话说 |
| --- | --- |
| 工作区 | 你现在看到的文件 |
| 暂存区 | 你准备放进下一次存档的改动 |
| 本地仓库 | 已经存好的历史记录 |
| 远程仓库 | GitHub 等网站上的副本 |

日常操作，就是在这些区域之间移动改动。

### 3. 最小命令集

```bash
git init                      # 把当前文件夹变成仓库
git status                    # 看当前状态
git diff                      # 看还没暂存的改动
git diff --staged             # 看已经暂存的改动
git add 文件名                 # 把指定文件放进暂存区
git add -p                    # 一块一块地选择要暂存的改动
git commit -m "说明"           # 存档，并写一句说明
git log --oneline --graph     # 看历史记录
```

回滚相关：

```bash
git restore 文件名             # 丢弃工作区里未暂存的改动
git restore --staged 文件名     # 取消暂存，但保留文件改动
git revert 提交编号             # 生成一个反向提交，适合已推送的历史
git reset --hard 提交编号       # 把本地分支重置到某个提交
```

::: danger 三个高风险操作
- `git restore .`：丢弃所有未暂存改动。
- `git reset --hard`：丢弃工作区和暂存区，移动分支指针。
- `git clean -fd`：删除未跟踪的文件。

执行前先运行 `git status`，确认没有你想保留的内容。
:::

### 4. 让 AI 改代码时的正确节奏

```bash
git status                 # 1. 确认当前状态
git add .                  # 2. 把当前内容放进暂存区
git commit -m "chore: 改动前的基线"

# 3. 让 AI 修改

git diff                   # 4. 看它到底改了什么
# 5. 验证通过后，再提交
git add .
git commit -m "feat: 描述这次改动"
```

关键点：

- **改之前先存档**，哪怕只是一个临时检查点。
- **一次提交只做一件事**，方便回滚。
- **说明写「为什么」**，不要只写「update」。

### 5. 三种回滚场景

| 场景 | 用什么 | 结果 |
| --- | --- | --- |
| 改了但没提交，不想要了 | `git restore 文件名` | 丢掉工作区改动 |
| 已提交但没推送 | `git reset --hard 上一个提交` | 本地历史回退 |
| 已推送，需要撤销 | `git revert 提交编号` | 新增一条反向提交，历史保留 |

::: warning 先判断，再执行
回滚前先问自己两个问题：**提交了吗？推送了吗？** 答案不同，用的命令完全不同。
:::

## 动手任务

在一个临时目录里完成三轮练习。

### 第 1 轮：建立基线

```bash
mkdir -p ~/vibe-lab/git-rollback
cd ~/vibe-lab/git-rollback
git init
printf "version 1\n" > app.txt
git add app.txt
git commit -m "chore: baseline"
```

### 第 2 轮：审查一次 AI 改动

1. 让 Claude 修改 `app.txt`，或者自己手动改。
2. 运行：

   ```bash
   git status
   git diff
   ```

3. 逐行说出每一处改动的作用。
4. 如果有一处你不认可，运行：

   ```bash
   git restore app.txt
   ```

### 第 3 轮：回滚一次提交

1. 修改并提交：

   ```bash
   printf "bad change\n" >> app.txt
   git add app.txt
   git commit -m "feat: bad change"
   ```

2. 查看历史：

   ```bash
   git log --oneline
   ```

3. 回到上一个提交：

   ```bash
   git reset --hard HEAD~1
   ```

4. 确认文件和历史都恢复了。

## 验收清单

- [ ] 能在 AI 修改前后各存一次档。
- [ ] 能读懂 `git diff` 里的新增、删除和修改行。
- [ ] 能区分 `restore`、`reset --hard`、`revert` 的使用场景。
- [ ] 知道哪些操作不可逆，执行前会先看 `git status`。
- [ ] 提交说明能说清目的，而不是只写「update」。

## 卡住了怎么办

| 现象 | 先检查 |
| --- | --- |
| `fatal: not a git repository` | 你是不是在项目目录里；先运行 `git init` |
| 提示没有可提交的内容 | 改动是否已保存；是否已经暂存 |
| 不知道自己在哪个分支 | 运行 `git status` 或 `git branch` |
| 回滚后文件没了 | 先别继续操作；用 `git reflog` 找到之前的提交 |
| 提交里混入了不该提交的文件 | 先看 `.gitignore`，再考虑用 `git restore --staged` 取消暂存 |

## 常见误解

- **「Git 就是 GitHub」**：Git 是工具，GitHub 是托管网站。
- **「无脑 `git add .` 很省事」**：可能把密钥、日志、构建产物一起提交。
- **「不提交也能随便改」**：出问题时你没有回滚点。
- **「已推送的历史也能随便 reset」**：会影响其他人，应该用 `revert`。
- **「删除文件就等于删掉密钥」**：密钥一旦进入历史，必须立即更换。

## 本课术语

- [版本控制](/appendix/glossary-engineering#版本控制)
- [仓库](/appendix/glossary-engineering#仓库)
- [提交](/appendix/glossary-engineering#提交)
- [分支](/appendix/glossary-engineering#分支)
- [diff](/appendix/glossary-engineering#diff)
- [回滚](/appendix/glossary-engineering#回滚)

## 延伸阅读

- [Claude Code 实操](/guide/tools/claude-code)
- [上下文管理](/guide/spec/context-management)
- [Git 官方书籍（中文）](https://git-scm.com/book/zh/v2)

<MarkComplete />
