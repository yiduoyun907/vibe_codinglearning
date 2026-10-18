---
title: 实验 04 · 用 Git 回滚
description: 三种场景下的安全回滚
---

# 实验 04 · 用 Git 回滚

<LessonMeta level="入门" minutes="30" prerequisite="Git 最小必要技能" output="三种回滚场景的操作记录" />

## 目标

在不丢失重要内容的前提下，完成三种回滚。重点不是记住命令，而是学会先判断场景，再选择命令。

## 准备

创建一个临时仓库：

```bash
mkdir -p ~/vibe-lab/git-rollback
cd ~/vibe-lab/git-rollback
git init
printf "version 1\n" > app.txt
git add app.txt
git commit -m "chore: baseline"
```

## 场景 A：未提交的改动不想要了

1. 让 AI 修改 `app.txt`（或手动修改）。
2. 查看改动：

   ```bash
   git status
   git diff
   ```

3. 丢弃改动：

   ```bash
   git restore app.txt
   ```

4. 确认内容恢复。

**判断点**：改动没有提交，且你确定不需要保留。

## 场景 B：已提交但未推送，需要撤销

1. 修改文件并提交：

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

4. 确认文件和历史都恢复。

**判断点**：提交只在本地，没有推送。`reset --hard` 会丢弃改动，执行前必须确认。

## 场景 C：已推送，需要撤销

1. 创建第二个提交（模拟已推送的改动）。
2. 用反向提交撤销：

   ```bash
   git revert HEAD
   ```

3. 查看历史，确认新增了一条反向提交，原提交仍在。

**判断点**：历史已经共享，不能用 `reset` 改写，应该用 `revert` 追加撤销记录。

## 额外练习

- 用 `git add -p` 只暂存 AI 改动中的一部分；
- 用 `git restore --staged` 取消暂存但保留工作区改动；
- 用 `git stash` 临时保存改动，切换分支后再恢复。

## 验收清单

- [ ] 三种场景都实际执行过，并记录了命令与结果。
- [ ] 能解释 `restore`、`reset --hard`、`revert` 的区别。
- [ ] 每次执行高风险命令前都先运行了 `git status`。
- [ ] 知道已推送历史为什么优先用 `revert`。
- [ ] 能在一分钟内判断一个回滚场景该用哪个命令。

## 复盘问题

- 哪种场景最容易误操作？为什么？
- 如果 AI 一次改动了十个文件，你会怎么拆分审查和回滚？
- 你的项目里，哪些操作一旦推送就不应该用 `reset`？
