# 仪表板/运营总览页模板

适用于：首页、运营总览、我的工作台、任意「一屏看全局」的页面。

## 完整示例代码

```tsx
import { TrendingUp, ShoppingBag, Users, AlertTriangle, ArrowUpRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function DashboardPage() {
  return (
    <div className="space-y-0">
      {/* 面包屑（可选）*/}
      <nav className="text-[12px] text-[#8c8a87] mb-4">
        首页 / 运营总览
      </nav>

      {/* 问候区 — 每页至多一处 */}
      <div className="mb-6">
        <h1 className="text-[28px] font-bold text-[#1F1D1C] tracking-[-0.03em] leading-[1.15]">
          早上好，xuewan 👋
        </h1>
        <p className="text-[14px] text-[#4a4846] mt-1">
          今日有 12 笔待处理订单，3 个门店需要关注
        </p>
      </div>

      {/* KPI 横向指标条 */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        <KpiCard
          icon={<ShoppingBag className="w-4 h-4 text-[#0090ff]" />}
          iconBg="bg-[#f0f8ff]"
          value="¥128,450"
          label="今日 GMV"
          trend="+12.3%"
          trendUp={true}
        />
        <KpiCard
          icon={<TrendingUp className="w-4 h-4 text-[#29a383]" />}
          iconBg="bg-[#edfbf4]"
          value="2,847"
          label="订单总数"
          trend="+8.1%"
          trendUp={true}
        />
        <KpiCard
          icon={<Users className="w-4 h-4 text-[#8e4ec6]" />}
          iconBg="bg-[#faf5ff]"
          value="341"
          label="活跃门店"
          trend="-2"
          trendUp={false}
        />
        <KpiCard
          icon={<AlertTriangle className="w-4 h-4 text-[#f76b15]" />}
          iconBg="bg-[#fff6f0]"
          value="12"
          label="待处理异常"
          trend="需关注"
          trendUp={false}
        />
      </div>

      {/* 全宽重点卡 — 单张，radius-5 */}
      <Card className="
        rounded-[12px] border border-[#dddbd8] bg-white p-6 mb-7
        shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)]
      ">
        {/* 区块眉 */}
        <p className="text-[12px] font-medium text-[#b0adaa] uppercase tracking-[0.04em] mb-3">
          TODAY'S PRIORITY
        </p>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[16px] font-semibold text-[#1F1D1C]">
              SLA 即将到期的订单
            </h2>
            <p className="text-[14px] text-[#4a4846] mt-1">
              3 笔订单将在 2 小时内超时，需立即处理
            </p>
          </div>
          {/* Primary 按钮 — 此处全页唯一 */}
          <Button className="bg-[#1F1D1C] text-white rounded-[6px] h-9 px-4 gap-1.5 flex-shrink-0">
            立即处理
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
        {/* 简要数据行 */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#f2f1ef]">
          {[
            { label: 'SLA 超时', value: '3', color: '#e5484d' },
            { label: '即将超时（2h）', value: '8', color: '#f76b15' },
            { label: '正常处理中', value: '156', color: '#29a383' },
          ].map(item => (
            <div key={item.label}>
              <div className="text-[20px] font-bold" style={{ color: item.color }}>
                {item.value}
              </div>
              <div className="text-[12px] text-[#8c8a87] mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* 次级卡片行 — 2~4 列 */}
      <div className="grid grid-cols-3 gap-5 mb-7">
        {/* 示例：可替换为业务相关小卡 */}
        <Card className="rounded-[8px] border border-[#dddbd8] bg-white p-5
                         shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <h3 className="text-[16px] font-semibold text-[#1F1D1C] mb-3">待我审批</h3>
          {/* 卡片内容 */}
          <div className="flex items-center gap-1.5">
            <div className="w-[6px] h-[6px] rounded-full bg-[#f76b15]" />
            <span className="text-[13px] text-[#4a4846]">5 笔退款申请</span>
          </div>
        </Card>
        <Card className="rounded-[8px] border border-[#dddbd8] bg-white p-5
                         shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <h3 className="text-[16px] font-semibold text-[#1F1D1C] mb-3">异常门店</h3>
          <div className="flex items-center gap-1.5">
            <div className="w-[6px] h-[6px] rounded-full bg-[#e5484d]" />
            <span className="text-[13px] text-[#4a4846]">3 家门店离线</span>
          </div>
        </Card>
        <Card className="rounded-[8px] border border-[#dddbd8] bg-white p-5
                         shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <h3 className="text-[16px] font-semibold text-[#1F1D1C] mb-3">今日新增</h3>
          <div className="flex items-center gap-1.5">
            <div className="w-[6px] h-[6px] rounded-full bg-[#29a383]" />
            <span className="text-[13px] text-[#4a4846]">12 个新用户注册</span>
          </div>
        </Card>
      </div>

      {/* 双栏底区 — 主列 ~60% : 侧列 ~40%（min 280px）*/}
      <div className="grid gap-5" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        {/* 主列：日程/大表/图表 */}
        <Card className="rounded-[8px] border border-[#dddbd8] bg-white p-5
                         shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <h3 className="text-[16px] font-semibold text-[#1F1D1C] mb-4">
            今日订单趋势
          </h3>
          {/* 图表/列表区域 */}
          <div className="h-48 bg-[#f9f9f8] rounded-[6px] flex items-center justify-center
                          text-[13px] text-[#8c8a87]">
            [图表区域]
          </div>
        </Card>

        {/* 侧列：最近动态（min-width 由 grid 保证）*/}
        <Card className="rounded-[8px] border border-[#dddbd8] bg-white p-5
                         shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <h3 className="text-[16px] font-semibold text-[#1F1D1C] mb-4">
            最近动态
          </h3>
          <div className="space-y-4">
            {[
              { user: '张三', action: '创建了退款申请', time: '5分钟前', dot: '#f76b15' },
              { user: '系统', action: '门店 #0312 离线', time: '18分钟前', dot: '#e5484d' },
              { user: '李四', action: '完成审批（订单 #8841）', time: '32分钟前', dot: '#29a383' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                {/* 32px 圆形头像 */}
                <div className="w-8 h-8 rounded-full bg-[#eceae7] flex-shrink-0 flex items-center
                                justify-center text-[12px] font-medium text-[#4a4846]">
                  {item.user[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-[#1F1D1C]">
                    <span className="font-medium">{item.user}</span> {item.action}
                  </p>
                  <span className="font-mono text-[12px] text-[#8c8a87]">{item.time}</span>
                </div>
                <div
                  className="w-[6px] h-[6px] rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: item.dot }}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

// KPI 卡片组件
function KpiCard({
  icon, iconBg, value, label, trend, trendUp
}: {
  icon: React.ReactNode
  iconBg: string
  value: string
  label: string
  trend: string
  trendUp: boolean
}) {
  return (
    <Card className="rounded-[8px] border border-[#dddbd8] bg-white p-5
                     shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-[6px] ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <span className="text-[13px] text-[#4a4846]">{label}</span>
      </div>
      <div className="text-[26px] font-bold text-[#1F1D1C] tracking-[-0.04em] leading-[1.1]">
        {value}
      </div>
      <p className={`text-[12px] mt-1 ${trendUp ? 'text-[#29a383]' : 'text-[#8c8a87]'}`}>
        {trend}
      </p>
    </Card>
  )
}
```

## 关键规则

- **问候标题**：28px/700，每页至多一处，不与其他大字号争对比
- **KPI 数值**：size-8（26px/700），配 size-3 标签
- **全宽主角卡**：`rounded-[12px]`（radius-5），其余卡片 `rounded-[8px]`（radius-4）
- **双栏比例**：`1.5fr : 1fr`，侧列必须有 `min-width: 280px`（通过 grid 保证）
- **动态流头像**：32px 圆形（radius-6）
- **不要**在仪表板放两个 btn-p，主角卡的主操作是全页唯一 Primary 按钮
