# 搜索下跌调查与修复记录（2026-10-28）

Google 曝光确实在 **2026-10-11** 出现断崖。站主已在本次对话确认 Search Console 的 **Manual Actions、Security Issues 均无问题**，并确认两份独立 CSV 来自 **Bing**。现有证据不能把原因确定为“AI 内容处罚”；应同时核查内容可信度、Google 的自动排名变化及 Googlebot 实际访问情况。

## 数据证据

来源为 `legendarymatch.com-Performance-on-Search-2026-10-28.zip`、`legendarymatch.com-Coverage-2026-10-28.zip`、`legendarymatch.com_SearchPerformanceOverview_All_10_27_2026.csv`、`legendarymatch.com_KeywordReport_10_27_2026.csv`。Google 效果数据截止 10/25，索引数据截止 10/23，Bing 日数据截止 10/24。可复算汇总见 [审计 JSON](audits/search-report-data-2026-10-28.json)，不含原始查询词。

| 平台与指标 | 下跌前 | 下跌后 | 变化 |
| --- | --- | --- | --- |
| Google 展示，9/26–10/10 对比 10/11–10/25，各 15 天 | 1,216 | 30 | −97.53% |
| Google 点击，同上 | 26 | 1 | −96.15% |
| Google 日均展示，同上 | 81.1 | 2.0 | −97.53% |
| Google 已索引页面，9/22–10/4 高点对比 10/23 | 155 | 129 | −16.77% |
| Bing 展示，9/27–10/10 对比 10/11–10/24，各 14 天 | 143 | 398 | +178.32% |
| Bing 点击，同上 | 3 | 6 | +100% |

Google 在 10/10 仍有 91 次展示，10/11 降至 2 次；10/12–10/25 没有点击。Bing 同期增长支持“Google 特有变化”的判断，但不能排除只影响 Googlebot 的技术问题。

Coverage 排除原因与 9/26 导出相比：`noindex` 36→59，canonical 替代页面 25→31，已抓取但未索引 11→22，已发现但未索引 102→88，重定向与 404 仍为 3、1。部分属于主动排除，不能把所有未索引页面都当作错误。10/05 的旧 Coverage 导出实际只到 9/21，不能用导出日期代替数据日期。

## 可以判断与尚不能判断的事

- **无已报告的人工措施。** 这是站主对后台的确认，不是本次通过登录会话独立读取的结果；无人工措施仍可能有自动排名或内容质量变化。
- **不是全站索引清空。** 约 17% 的索引下降与约 98% 的曝光下降差距很大，单靠索引总量不能解释原因。
- **时间接近算法更新，但没有因果证据。** [Google 官方状态页](https://status.search.google.com/incidents/XhUDXP7A67iHCD2kmbVu)记录 September 2026 spam update 于 9/24–10/8 推出（官方日期为 US/Pacific）；本站断点为 GSC 日数据的 10/11。时间接近仅作为调查线索。
- **当前未见全站可索引性代码故障。** 修复前生产版本为 `fe855ce`（10/6）；232 个 sitemap URL 均通过 HTTP 200、canonical、无 `noindex` 检查，孤立 URL 为 0。这是当前普通请求的检查，不能替代 Google 抓取和渲染结果。
- **历史日志不足以排除故障。** 服务当前显示自 10/6 起运行、`NRestarts=0`；10/10–10/12 journal 仅见两次无效 server action 扫描请求，不能据此认定停机或完全正常。保留的 access log 最早为 10/13，已晚于断点；继承的共享默认日志无法按 hostname 隔离，因此未读取共享请求内容。Googlebot 特有失败仍未被彻底排除。
- **尚缺页面级前后对比。** 当前 GSC 页面、查询明细覆盖整个导出周期，不能准确指认 10/11 后损失最大的 URL。站点总量采用 Chart，不能把页面聚合总数直接相加；下跌后的平均排名仅基于 30 次展示，也不宜作为稳定排名指标。

## 本轮初始修复及理由

[Google 的垃圾内容政策](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content)关注为操纵排名而批量生成、缺少用户价值的内容，判断不取决于是否用了 AI。[实用可靠内容指南](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)强调原创价值、准确性、清楚的来源以及内容由谁、如何、为何制作。给模板换词、堆长文或只补链接都不能代替事实核查。

本轮针对已经确认的页面缺陷做以下修复；最终发布状态另行记录：

1. 球队页优先展示可玩的选定球员和阵型，再呈现假想比赛；明确选定阵容不等于完整注册名单，模型阵型不等于每场实际首发，评分属于本站估计。
2. 删除反复枚举搜索词的模板段落和同义 FAQ，保留有实际澄清作用的年代、球队与模型范围说明；可见 FAQ 与结构化数据保持一致。
3. About 页如实说明 AI 辅助和历史来源范围，区分历史事实、编辑判断与模拟结果，避免未被证据支持的“全部人工撰写或核实”表述。
4. 为已有档案补充与具体事实相符的官方来源，修正尤文 2017、波尔图 2004、拜仁 2020、曼城 2018、阿森纳 1998、维拉 1982、克罗地亚 2018 的具体史实。修复前 70 篇档案中仅 21 篇有链接来源，现为 28 篇，余下 42 篇仍需审校；有链接不表示整篇已完成事实审校。另修正法国 1998–塞内加尔 2002 对阵页，把假想对阵与真实的法国 2002 首战分开，并添加 FIFA 来源。
5. 内部搜索页统一 `noindex` 并移出 sitemap；比赛回放继续 `noindex`，同时允许抓取，让 Google 能读取该指令。[Google 的 noindex 文档](https://developers.google.com/search/docs/crawling-indexing/block-indexing)明确说明 robots.txt 阻止抓取时，Google 无法看到页面的 noindex。

这些是减少误导和改善已有页面的措施，不构成对下跌原因或恢复结果的确认。保留现有有价值 URL，先完成事实与抓取证据，再决定是否需要合并或退出索引。

## 下一批：审校 10 个已有高价值 URL

以下展示量来自整段 GSC 导出，用来选取审校对象，**不是已确认的下跌损失量**。每页交付具体的“原断言 → 官方证据 → 修正文案/保留理由”，并将历史名单、代表阵容、编辑意见和模拟数据分开标注。

| 已有路径 | 周期内展示 | 下一步事实与来源核查 |
| --- | ---: | --- |
| `/teams/chelsea/2004-05` | 354 | 联赛与杯赛成绩、球队和门将个人零封数、轮换球员及代表 XI；核对 Premier League 与俱乐部记录 |
| `/compare/ac-milan-vs-inter-milan` | 190 | 荣誉统计的截至日期、所选赛季和比较维度；核对 UEFA、俱乐部档案，区分事实与巅峰偏好 |
| `/national-teams/france/2018` | 144 | 完整赛事名单、号码、决赛首发和替补；核对 FIFA 与 FFF，检查模拟名单的独立标识 |
| `/national-teams/netherlands/1988` | 143 | 决赛 XI、比分、教练和赛事范围；核对 UEFA，避免代表阵容冒充完整赛事名单 |
| `/compare/manchester-united-vs-liverpool` | 96 | 联赛、欧战荣誉及截至日期，所选赛季成绩；核对联赛、UEFA、俱乐部资料 |
| `/compare/barcelona-vs-real-madrid` | 93 | 欧冠荣誉和所选赛季，分开解释历史成绩、编辑排名及模拟胜率 |
| `/compare/real-madrid-vs-atletico-madrid` | 82 | 所选赛季交锋、欧冠与联赛成绩、战术概括；核对赛事记录并限定主观判断 |
| `/teams/barcelona/2008-09` | 74 | 三冠赛事成绩、决赛阵容和半决赛过程；核对 UEFA、LaLiga 与俱乐部赛季档案 |
| `/prime/real-madrid` | 66 | 候选赛季证据、选择准则和历史数据；说明“prime”是编辑选择及模型用途 |
| `/national-teams/italy/2006` | 54 | 完整世界杯名单、号码、决赛 XI 与比分；核对 FIFA、FIGC，标清模拟选人范围 |

同步完成 GSC 证据补齐：按同一批 URL 导出 9/26–10/10 与 10/11–10/25 的页面及查询分段，保持国家、设备和搜索类型口径一致；对首页、一个球队页、一个比较页、一个明确 noindex 的回放页做 URL Inspection，保存 Google 选择的 canonical、最近抓取时间、索引状态、抓取 HTML 和实时渲染结果；读取 Crawl Stats 中 10/11 附近的主机状态、响应码与请求变化。对确有实质更新的少量 URL 请求重新抓取，持续比较相同页面集合，不能承诺某个期限内恢复。

## 本地验收与生产检查

`npm run check` 通过：104 项测试，lint 无错误（两条原有未使用变量警告），类型检查通过。生产构建成功，生成 365 个静态输出。渲染 HTML 抽查六个球队页，确认阵容在模拟前、两个区块各出现一次、选人范围说明与修改日期正确；About 的 AI 说明和法国–塞内加尔的 FIFA 链接、史实更正也通过。

生产发布后运行 `npm run indexability:check`：检查全部 231 个 sitemap URL 的 HTTP 状态、canonical 和索引指令，并检查五种工具/模型页面可用且保留 noindex；另对同一组内容做线上 HTML 验证。公开页面实际变更日期与 sitemap 同步，仅更新球队详情、About 及这一个 VS 页面，未刷新无关页面日期。技术检查通过只代表可抓取与索引指令符合设计，不代表 Google 已重新抓取、收录或恢复排名。

## 发布安全门与框架补丁

首次生产发布在 `security:check` 阶段被拦下，发生在停止现有应用服务之前。原 Next.js 16.3.8 命中官方披露的图像优化远程代码执行问题 [GHSA-2464-fhr4-w9xw](https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw)、Cache Components 远程代码执行问题 [GHSA-673q-mjm6-r5xr](https://github.com/vercel/next.js/security/advisories/GHSA-673q-mjm6-r5xr)，以及 Server Actions 拒绝服务问题 [GHSA-p3m5-59mp-jv5r](https://github.com/vercel/next.js/security/advisories/GHSA-p3m5-59mp-jv5r)。本轮因此增加配套的 `next`、`eslint-config-next` 16.4.3 安全升级，重新执行依赖审计、类型检查、测试和生产构建后再发布。此项是解除发布阻断的安全修复；未发现证据证明这些漏洞已被利用或导致 10/11 搜索下跌。

升级后再次通过 104 项测试、lint、类型检查和生产构建；`npm run security:check` 的生产依赖审计报告为 0 个漏洞。随包升级文档未发现本站需要额外 API 迁移。首次发布被拦截后，VPS 服务和源站 HTTP 200 均已确认保持正常。
