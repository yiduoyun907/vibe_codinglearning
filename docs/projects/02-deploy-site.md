---
title: 项目 02 · 发布本站
description: 把学习站部署到 GitHub Pages
---

# 项目 02 · 发布本站

<LessonMeta level="实战" minutes="约 2 小时" prerequisite="完成实验 01–04" output="一个可通过公网访问的学习站" />

## 目标

把当前站点发布到 GitHub Pages，理解「本地能跑」和「线上可用」之间的差距。

## 前置条件

- 已安装 Git，并配置了 `user.name` 和 `user.email`；
- 有 GitHub 账号；
- 本地能运行 `npm run docs:build`。

## 步骤

### 1. 本地构建验证

```bash
npm install
npm run docs:build
npm run docs:preview
```

确认预览地址可以访问，导航、搜索和进度组件正常。

### 2. 初始化仓库

```bash
git init
git add .
git commit -m "chore: initial learning site"
git branch -M main
```

::: warning 提交前检查
确认 `.gitignore` 已排除 `node_modules`、构建产物和 `.env`。不要提交任何密钥。
:::

### 3. 创建远程仓库并推送

在 GitHub 创建一个空仓库，不要勾选自动生成 README。然后：

```bash
git remote add origin https://github.com/<你的用户名>/vibe_codinglearning.git
git push -u origin main
```

### 4. 配置 GitHub Pages

1. 打开仓库的 **Settings → Pages**；
2. 将 **Build and deployment → Source** 设为 **GitHub Actions**；
3. 等待 `Deploy VitePress site to Pages` 工作流完成；
4. 打开工作流输出的地址。

### 5. 处理路径问题

GitHub Pages 的项目站点默认部署在 `/<仓库名>/` 子路径下。仓库中的工作流已经设置：

```yaml
env:
  BASE_PATH: /vibe_codinglearning/
```

如果你的仓库名不同，同步修改这一行，否则样式和资源会 404。

### 6. 验证清单

- 首页、课程页、实验页可以直接访问；
- 刷新任意子页面不会 404；
- 搜索能返回中文结果；
- 暗色模式正常；
- 移动端导航可用；
- 学习进度在刷新后保留。

### 7. 记录

把部署过程中的报错、等待时间和最终地址写进[学习日志](/log/)。

## 常见问题

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| 页面样式丢失 | `BASE_PATH` 与仓库名不一致 | 修正工作流中的路径 |
| 子页面 404 | Pages 未正确配置或构建失败 | 检查 Actions 日志 |
| 搜索无结果 | 构建索引失败或分词配置异常 | 重新构建并检查控制台 |
| 工作流失败 | `package-lock.json` 未提交 | 运行 `npm install` 后提交锁文件 |
| 更新不生效 | 工作流未触发或缓存 | 查看 Actions 运行记录 |

## 验收清单

- [ ] 公网地址可以访问；
- [ ] 至少三个页面直接刷新不 404；
- [ ] 移动端布局正常；
- [ ] 仓库中没有提交密钥或 `node_modules`；
- [ ] 有一次完整的部署记录和复盘。

## 延伸

- 绑定自定义域名；
- 添加访问统计；
- 配置定时构建，自动更新最后修改时间。
