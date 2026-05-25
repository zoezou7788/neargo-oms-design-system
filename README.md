# NearGo OMS Design System

**NearGo OMS 后台管理系统 UI 设计规范** — Claude Code 技能包

基于 [shadcn-admin](https://github.com/satnaing/shadcn-admin) 研究 + NearGo OMS Design System v2.2 构建。

## 包含内容

```
neargo-oms-design/
├── SKILL.md                          # 技能主文件（设计 token + 组件规范 + 检查清单）
└── references/
    ├── full-spec.md                  # 完整 NearGo OMS v2.2 设计规范
    ├── shadcn-admin-patterns.md      # shadcn-admin 代码结构参考
    └── templates/
        ├── list-page.md              # 数据列表页完整模板
        ├── dashboard-page.md         # 仪表板首页完整模板
        └── detail-page.md            # 详情/审批页完整模板

neargo-oms-design.skill               # 打包好的技能文件（可直接安装）
```

## 技术栈

- React 19 + TypeScript
- shadcn/ui + Tailwind CSS v4
- Radix UI 色阶方法论
- Inter + JetBrains Mono + Noto Sans SC

## 核心设计原则

1. **Gray-12 (#1F1D1C) 为主色** — 所有主操作按钮
2. **品牌琥珀 (#FFA902) 稀缺原则** — 仅促销，每屏 ≤1 个实心 CTA
3. **状态 = 6px 色点 + 文字标签** — 永不仅靠颜色传达状态
4. **卡片两级圆角** — 数据卡 `radius-4(8px)`，仪表板主角卡 `radius-5(12px)`

## 安装技能

将 `neargo-oms-design.skill` 文件安装到 Claude Code，之后对话中提到构建 NearGo OMS 页面时会自动应用本规范。

## 评测结果

| 指标 | 带技能 | 无技能 |
|------|--------|--------|
| 规范符合率 | **100%** (15/15) | 33% (5/15) |
| 典型执行时间 | ~129s | ~89s |

---

*NearGo OMS Design System v2.2 · 2026-05*
