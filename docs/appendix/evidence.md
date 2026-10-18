---
title: 内容依据
description: 阶段一结论的来源、证据等级与适用边界
---

# 内容依据

<LessonMeta level="全阶段" minutes="按需查阅" prerequisite="无" output="能核对一个结论来自哪里、适用于什么条件" />

## 为什么有这个页面

课程里的结论不应该是「感觉有道理」。这个页面用来回答三个问题：

1. 这句话来自哪里？
2. 它是在什么条件下得出的？
3. 它适不适用于我？

你不需要从头读完。想核对某一课时，再回来查。

## 怎么读证据

看到一项研究或一条行业结论时，先问六个问题：

| 问题 | 为什么重要 |
| --- | --- |
| 样本是谁？有多少人？ | 16 个资深开发者的结论，不能直接套到零基础学习者 |
| 任务是什么？持续多久？ | 一个 1 小时的练习题，和两周的真实项目不是一回事 |
| 有没有对照组？ | 没有对照，就很难排除其他因素 |
| 谁资助或参与了研究？ | 厂商参与不等于结论错误，但需要知道利益关系 |
| 结论能复现吗？ | 有数据、代码和方法的结论更可信 |
| 适用边界是什么？ | 任何研究都有边界，越过边界使用就是误用 |

::: tip 本站的引用原则
正文只写「这项研究在什么条件下发现了什么」，不写笼统的「研究表明」。完整来源和局限放在本页。
:::

## 证据等级

| 等级 | 类型 | 例子 | 怎么用 |
| --- | --- | --- | --- |
| A | 同行评审论文、随机对照试验 | METR 2025、Copilot RCT 2023 | 可作为强证据，但仍要看边界 |
| B | 官方文档、行业标准 | Anthropic Docs、OWASP、NIST | 可作为实践依据，注意厂商立场 |
| C | 大规模行业调查 | DORA 2025、Stack Overflow 2025 | 可看趋势，通常是相关而非因果 |
| D | 专家观点、个人经验 | Karpathy、Simon Willison、本站日志 | 可提供框架和启发，不等同于实证 |

等级不是「谁更权威」的排名，而是提醒你：**不同证据能支持不同强度的结论。**

## 阶段一主张与证据

| 课程 | 主张 | 主要来源 | 适用边界 |
| --- | --- | --- | --- |
| 第 1 课 | Vibe Coding 的原意是接受 AI 代码而不逐行审查 | Karpathy 原始表述 | 个人周末项目，不是生产方法论 |
| 第 1 课 | 审查、测试、能解释代码，就不属于 Vibe Coding | Simon Willison | 专家定义，不是实证研究 |
| 第 1 课 | 有纪律的 AI 协作更接近「智能体工程」 | Simon Willison 2026 | 术语仍在演化 |
| 第 2 课 | 新手从指导式教学和范例中受益更多 | Kirschner/Sweller/Clark 2006；Rosenshine 2012 | 一般教育研究，不是 AI 专属 |
| 第 2 课 | 小批量、强版本控制能放大 AI 收益 | DORA 2025 | 行业调查，相关而非因果 |
| 第 3 课 | AI 的生产力效果因任务、经验和代码库而异 | Copilot RCT 2023；METR 2025 | 两项研究的场景不同，不能互相否定 |
| 第 3 课 | 主观感受到的速度提升可能高于实际 | METR 2025 | 16 名资深开发者、熟悉的大型代码库 |
| 第 3 课 | AI 输出经常「几乎对但不完全对」 | Stack Overflow 2025 | 自我报告调查 |
| 第 4 课 | 模型输出必须当作不可信输入 | OWASP LLM05 | 应用安全框架，不是完整保证 |
| 第 4 课 | 提示注入是 LLM 应用的头号风险 | OWASP LLM01 | 主要针对接入外部内容的系统 |
| 第 4 课 | 安全需要最小权限、输出校验和沙箱 | OWASP；Anthropic Docs | 工具相关，需按实际环境调整 |

## 两个研究为什么不矛盾

Copilot RCT 和 METR 的结论看起来相反，但它们研究的是不同条件下的不同问题。

| 维度 | GitHub Copilot RCT（2023） | METR RCT（2025） |
| --- | --- | --- |
| 任务 | 用 JavaScript 实现一个 HTTP server | 开发者自己项目中的真实 bug、功能和重构 |
| 参与者 | 95 名开发者，经验水平不一 | 16 名资深开源开发者 |
| 代码库 | 一个短任务，从零开始 | 熟悉的大型成熟代码库 |
| 测量 | 完成时间，基础功能测试 | 完整任务耗时，包含审查、提示和等待 |
| 结果 | 使用 Copilot 的组平均快 55.8% | 允许使用 AI 时平均慢 19% |
| 能说明什么 | 在特定短任务上，AI 可以显著提速 | 在资深开发者熟悉的大型项目中，AI 可能增加总耗时 |
| 不能说明什么 | 不能说明所有任务都更快 | 不能说明 AI 对所有人、所有任务都更慢 |

**教学含义**：不要问「AI 到底提不提高效率」，而要问「在什么任务、什么经验、什么代码库、用什么测量方式下，它提高还是降低效率」。

## 学习设计依据

阶段一的写法不是随便定的，背后有几条稳定的教育学原则。

| 设计选择 | 依据 | 对本站的含义 |
| --- | --- | --- |
| 每课只讲 3–5 个核心概念 | Sweller 的认知负荷理论 | 零基础读者的工作记忆有限，一次不要塞太多 |
| 先给范例，再给练习 | Kirschner/Sweller/Clark；Rosenshine | 新手需要指导式教学，而不是纯靠自己摸索 |
| 每课有验收清单和小练习 | Roediger & Karpicke 的提取练习；Black & Wiliam 的形成性评价 | 用「能不能做出来」检验，而不是用「读完了」 |
| 实验和项目反复练同一套动作 | Ericsson 的刻意练习 | 有目标、有反馈的重复，才会形成能力 |
| 「常见误解」单独成段 | 概念转变研究；Felienne Hermans《The Programmer's Brain》 | 先指出错误前概念，再建立正确概念 |
| 术语在不同课程重复出现 | 间隔与交叉练习 | 同一概念多次出现，比一次背十个更有效 |
| 先给生活化比方，再给准确定义 | Mayer 的多媒体学习原则 | 降低入门门槛，同时保留准确性 |

这些依据支持的是**教学方式**，不是具体某个工具的做法。工具会变，学习规律相对稳定。

## 来源清单

### A 级：研究论文与随机对照试验

| 来源 | 支持什么 | 局限 |
| --- | --- | --- |
| [The Impact of AI on Developer Productivity: Evidence from GitHub Copilot](https://arxiv.org/abs/2302.06590)（Peng et al., 2023） | 特定任务上 55.8% 的速度提升；经验较少者受益更多 | 短任务、基础测试；作者与 Microsoft/GitHub 有关联 |
| [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)（METR, 2025） | 资深开发者平均慢 19%；主观感觉快约 20%；不到 44% 的 AI 代码未经修改被接受 | 16 人样本、熟悉的大型代码库、2025 年初的工具 |
| [METR 论文（arXiv:2507.09089）](https://arxiv.org/abs/2507.09089) | 完整方法、数据与回归结果 | 同上 |

### B 级：官方文档与行业标准

| 来源 | 支持什么 | 局限 |
| --- | --- | --- |
| [Claude Code 官方文档](https://code.claude.com/docs) | 计划模式、CLAUDE.md、上下文管理、权限与沙箱 | 厂商文档，工具相关 |
| [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/) | 提示注入、敏感信息泄露、输出处理不当、过度代理 | 应用安全框架，不是完整保证 |
| [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) | 风险管理是持续流程：治理、映射、测量、管理 | 面向组织，个人使用需简化 |

### C 级：行业调查与报告

| 来源 | 支持什么 | 局限 |
| --- | --- | --- |
| [DORA 2025 Report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) | AI 采用与吞吐量正相关、与稳定性负相关；小批量和版本控制很重要 | 问卷为主，相关而非因果 |
| [Stack Overflow 2025 Developer Survey: AI](https://survey.stackoverflow.co/2025/ai) | 采用率高、信任度下降、「几乎对」和调试成本 | 自我报告，样本以受访者为主 |

### D 级：专家观点与学习资源

| 来源 | 支持什么 | 局限 |
| --- | --- | --- |
| [Karpathy 的原始表述（由 Simon Willison 引用）](https://simonwillison.net/2025/Mar/19/vibe-coding/) | Vibe Coding 的原始定义 | 个人观点，带实验和玩票色彩 |
| [Simon Willison: Not all AI-assisted programming is vibe coding](https://simonwillison.net/2025/Mar/19/vibe-coding/) | 审查、测试、能解释，才是软件开发的底线 | 专家观点 |
| [Simon Willison: Vibe coding and agentic engineering are getting closer](https://simonwillison.net/2026/May/6/vibe-coding-and-agentic-engineering/) | 「智能体工程」这一术语的演化 | 专家观点，术语仍在变化 |
| [freeCodeCamp](https://www.freecodecamp.org/) | 结构化课程 + 项目驱动 + 小步反馈 | 课程体量大，不是 AI 协作专项 |
| [The Odin Project](https://www.theodinproject.com/) | 项目驱动、逐步减少手把手 | 对绝对零基础可能偏难 |
| [Harvard CS50x](https://cs50.harvard.edu/x/) | 问题集、最终项目、强调验证 | 偏计算机科学基础，不是 AI 工具课 |
| [MDN Web Docs](https://developer.mozilla.org/zh-CN/) | HTML、CSS、JavaScript 的权威参考 | 参考手册，不是课程 |
| [Peter Norvig: Teach Yourself Programming in Ten Years](https://norvig.com/21-days.html) | 通过做项目学习，不追求速成 | 个人观点 |

### 学习科学参考

- Sweller, J. (1988). Cognitive Load During Problem Solving: Effects on Learning. *Cognitive Science*.
- Kirschner, P. A., Sweller, J., & Clark, R. E. (2006). Why Minimal Guidance During Instruction Does Not Work. *Educational Psychologist*.
- Rosenshine, B. (2012). Principles of Instruction: Research-Based Strategies That All Teachers Should Know. *American Educator*.
- Roediger, H. L., & Karpicke, J. D. (2006). Test-Enhanced Learning. *Psychological Science*.
- Black, P., & Wiliam, D. (1998). Assessment and Classroom Learning. *Assessment in Education*.
- Ericsson, K. A., Krampe, R. T., & Tesch-Römer, C. (1993). The Role of Deliberate Practice in the Acquisition of Expert Performance. *Psychological Review*.
- Hermans, F. (2021). *The Programmer's Brain*. Manning.
- Mayer, R. E. (2009). *Multimedia Learning*. Cambridge University Press.

## 本站不做什么

- 不做系统性文献综述。这里只保留支撑课程结论的最小证据集。
- 不把单一研究当成最终结论。研究结论会随样本、工具和时间变化。
- 不把厂商文档当成中立事实。官方文档是实践依据，但厂商有自身立场。
- 不提供法律、医疗、金融等专业领域的合规建议。涉及这些领域时，请咨询相应专业人士。

## 更新与纠错

- 工具类信息会标注时间；原则类信息可以长期保留。
- 如果你发现来源错误、链接失效或结论被误用，欢迎在[仓库](https://github.com/yiduoyun907/vibe_codinglearning)提交 issue 或 PR。
- 每次更新本页时，在提交信息中写明「更新了哪条证据、为什么」。
