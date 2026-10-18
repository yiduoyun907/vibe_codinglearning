---
title: 项目 02 · 部署静态站点
description: 把本地站点发布到公网
---

# 项目 02 · 部署静态站点

<LessonMeta level="实战" minutes="约 2 小时" prerequisite="完成实验 01–04" output="一个公网可访问的静态站点" />

## 一句话理解

**本地能打开，不等于别人能打开。这个项目带你跨过「部署」这道坎。**

## 先看一个真实例子

本站就是按下面这套流程部署的：

- 站点：<https://yiduoyun907.github.io/vibe_codinglearning/>
- 仓库：<https://github.com/yiduoyun907/vibe_codinglearning>
- 部署方式：GitHub Actions + GitHub Pages

你可以直接观察它的工作流文件：`.github/workflows/deploy.yml`。

## 前置条件

- 已安装 Git，并配置了 `user.name` 和 `user.email`；
- 有 GitHub 账号；
- 本地能运行 `npm run docs:build`。

## 步骤

### 第 1 步：本地构建验证

```bash
npm install
npm run docs:build
npm run docs:preview
```

确认预览地址可以访问，导航、搜索和进度功能正常。

### 第 2 步：初始化仓库

```bash
git init
git add .
git commit -m "chore: initial site"
git branch -M main
```

::: warning 提交前检查
确认 `.gitignore` 已排除 `node_modules`、构建产物和 `.env`。不要提交任何密钥。
:::

### 第 3 步：创建远程仓库并推送

在 GitHub 创建一个空仓库，不要勾选自动生成 README。然后：

```bash
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

### 第 4 步：配置 GitHub Pages

1. 打开仓库的 **Settings → Pages**；
2. 把 **Build and deployment → Source** 设为 **GitHub Actions**；
3. 等待工作流完成；
4. 打开工作流输出的地址。

### 第 5 步：处理子路径

GitHub Pages 的项目站点默认在 `/<仓库名>/` 子路径下。工作流中要设置：

```yaml
env:
  BASE_PATH: /<仓库名>/
```

如果路径不对，页面样式和资源会 404。

### 第 6 步：验证

- 首页、课程页、实验页都能直接访问；
- 刷新任意子页面不会 404；
- 搜索能返回中文结果；
- 暗色模式正常；
- 手机导航可用；
- 学习进度刷新后保留。

## 常见问题

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| 页面样式丢失 | `BASE_PATH` 与仓库名不一致 | 修正工作流中的路径 |
| 子页面 404 | Pages 未正确配置或构建失败 | 检查 Actions 日志 |
| 搜索无结果 | 构建索引失败 | 重新构建并检查控制台 |
| 工作流失败 | `package-lock.json` 未提交 | 运行 `npm install` 后提交锁文件 |
| 更新不生效 | 工作流未触发或有缓存 | 查看 Actions 运行记录 |

## 验收清单

- [ ] 公网地址可以访问。
- [ ] 至少三个页面直接刷新不 404。
- [ ] 手机布局正常。
- [ ] 仓库中没有提交密钥或 `node_modules`。
- [ ] 有一次完整的部署记录和复盘。

## 卡住了怎么办

- **构建失败**：先在本地运行 `npm run docs:build`，看完整报错。
- **样式全丢**：检查 `BASE_PATH` 是否以 `/` 开头和结尾，并且和仓库名一致。
- **页面 404**：检查 Pages 的 Source 是否设为 GitHub Actions。
- **私有仓库无法启用 Pages**：当前账户计划可能不支持私有仓库 Pages；可以改为公开仓库，或改用其他托管平台。

## 延伸

- 绑定自定义域名；
- 添加访问统计；
- 配置定时构建。

## 本项目术语

- [部署](/appendix/glossary-basics#部署)
- [静态网站](/appendix/glossary-basics#静态网站)
- [CI/CD](/appendix/glossary-engineering#ci-cd)
- [仓库](/appendix/glossary-engineering#仓库)
