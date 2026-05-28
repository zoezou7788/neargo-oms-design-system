/**
 * Form Page — Reference Implementation (新建订单表单页)
 *
 * 展示标准表单页的完整组件组合：
 *   PageHeader → ContentStack（多分区 ContentCard）→ 底部固定 ActionBar
 *
 * 适用于：新建订单、编辑门店、创建活动、任意「多字段表单 + 提交」页面。
 * 复制此文件并替换字段和 Zod schema 即可生成新表单页。
 *
 * ⚠️  设计约束：
 *   - 表单用 react-hook-form + zod，不要手写 state 管理每个字段
 *   - 每个字段必须包裹在 FormField（来自 form.tsx）中，自动处理错误显示
 *   - 分区间用独立 ContentCard，不要用分隔线把所有字段放一张卡片
 *   - 底部操作栏固定（sticky bottom-0），不随表单滚动
 *   - 保存草稿 = secondary，提交审批 = primary，同一行只有一个 primary
 *   - 危险操作（删除）必须在操作栏左侧，与提交按钮分离
 *   - 字段布局：两列为主（Grid cols-2），长文本（备注/说明）占满整行
 */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, Send, AlertTriangle } from "lucide-react";

// Layout
import { Main, ContentCard, ContentStack }      from "@/components/layout/main";
import { PageHeader, SectionHeader }            from "@/components/layout/page-header";

// UI — Form
import { Form, FormField, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { FormField as SimpleFormField }   from "@/components/ui/form-field";  // 简单分区标题用
import { Input }        from "@/components/ui/input";
import { Textarea }     from "@/components/ui/textarea";
import { Select }       from "@/components/ui/select";
import { Combobox }     from "@/components/ui/combobox";
import { MultiSelect }  from "@/components/ui/multi-select";
import { DatePicker }   from "@/components/ui/date-picker";
import { Switch }       from "@/components/ui/switch";
import { FileUpload }   from "@/components/ui/file-upload";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// UI — 交互
import { Button }         from "@/components/ui/button";
import { Alert }          from "@/components/ui/alert";
import { ConfirmDialog }  from "@/components/ui/dialog";
import { Separator }      from "@/components/ui/separator";

// ─── Zod Schema ───────────────────────────────────────────────
const orderFormSchema = z.object({
  // 基本信息
  storeId:     z.string().min(1, "请选择申请门店"),
  type:        z.enum(["restock", "refund", "expense", "activity"], {
    required_error: "请选择申请类型",
  }),
  priority:    z.enum(["urgent", "normal", "low"]).default("normal"),

  // 金额
  amount:      z.number({ invalid_type_error: "请输入金额" })
                .positive("金额必须大于 0")
                .max(1_000_000, "单笔申请不超过 100 万元"),
  currency:    z.string().default("CNY"),

  // 日期
  effectiveDate: z.date().optional(),
  expiryDate:    z.date().optional(),

  // 说明
  title:       z.string().min(2, "标题至少 2 个字符").max(100, "标题最多 100 个字符"),
  remark:      z.string().max(1000, "备注最多 1000 个字符").optional(),

  // 设置
  notifyApprover:  z.boolean().default(true),
  urgentReason:    z.string().optional(),
  relatedOrderIds: z.array(z.string()).optional(),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

// ─── 静态选项 ─────────────────────────────────────────────────
const STORE_OPTIONS = [
  { value: "S001", label: "朝阳旗舰店",  description: "北京 · 旗舰" },
  { value: "S002", label: "海淀科技店",  description: "北京 · 旗舰" },
  { value: "S003", label: "浦东联营店",  description: "上海 · 加盟" },
  { value: "S004", label: "西湖旗舰店",  description: "杭州 · 旗舰" },
];

const TYPE_OPTIONS = [
  { value: "restock",  label: "进货补货" },
  { value: "refund",   label: "退款申请" },
  { value: "expense",  label: "费用报销" },
  { value: "activity", label: "活动申请" },
];

const CURRENCY_OPTIONS = [
  { value: "CNY", label: "人民币 CNY" },
  { value: "USD", label: "美元 USD" },
  { value: "AED", label: "迪拉姆 AED" },
];

// 关联订单（多选示例）
const RELATED_ORDER_OPTIONS = [
  { value: "ORD-001", label: "ORD-20240115-001 · 朝阳旗舰店" },
  { value: "ORD-002", label: "ORD-20240115-002 · 海淀科技店" },
  { value: "ORD-003", label: "ORD-20240115-003 · 浦东联营店" },
];

// ─── 底部操作栏（固定 sticky） ────────────────────────────────
function ActionBar({
  isSubmitting,
  isDirty,
  onSaveDraft,
  onDiscard,
}: {
  isSubmitting: boolean;
  isDirty:      boolean;
  onSaveDraft:  () => void;
  onDiscard:    () => void;
}) {
  return (
    // sticky bottom-0 — 始终可见，不随表单滚动
    <div className="sticky bottom-0 bg-[var(--surface)] border-t border-[var(--border)] px-6 py-4 flex items-center justify-between z-10">
      {/* 左侧：危险操作（丢弃草稿） */}
      <Button
        variant="ghost"
        size="md"
        icon={<ArrowLeft size={14} />}
        onClick={onDiscard}
        disabled={isSubmitting}
        className="text-[var(--red-text)] hover:bg-[var(--red-bg)]"
      >
        丢弃
      </Button>

      {/* 右侧：主操作 */}
      <div className="flex items-center gap-2">
        {/* 保存草稿 = secondary */}
        <Button
          variant="secondary"
          size="md"
          icon={<Save size={14} />}
          onClick={onSaveDraft}
          disabled={isSubmitting || !isDirty}
        >
          保存草稿
        </Button>
        {/* 提交审批 = primary（每行只有一个 primary） */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          icon={<Send size={14} />}
          loading={isSubmitting}
        >
          提交审批
        </Button>
      </div>
    </div>
  );
}

// ─── 页面组件 ─────────────────────────────────────────────────
export function OrderFormPage() {
  const [discardConfirm, setDiscardConfirm] = useState(false);
  const [submitConfirm,  setSubmitConfirm]  = useState(false);
  const [attachments,    setAttachments]    = useState<File[]>([]);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      priority:       "normal",
      currency:       "CNY",
      notifyApprover: true,
    },
  });

  const { formState: { isSubmitting, isDirty, errors }, watch } = form;
  const priority = watch("priority");
  const type     = watch("type");

  const onSubmit = async (data: OrderFormValues) => {
    console.log("提交审批", data, attachments);
    // TODO: call POST /api/orders
  };

  const handleSaveDraft = async () => {
    const data = form.getValues();
    console.log("保存草稿", data);
    // TODO: call POST /api/orders/draft
  };

  return (
    // fluid=false — 表单页居中窄布局（max-w-3xl）
    <Main fluid={false} padding="px-6 pt-6 pb-0">

      {/* ── PageHeader ──────────────────────────────────── */}
      <PageHeader
        breadcrumb={[
          { label: "首页",     href: "/" },
          { label: "订单管理", href: "/orders" },
          { label: "新建订单" },
        ]}
        title="新建订单申请"
        subtitle="填写完整的申请信息后提交审批"
        bordered
      />

      {/* ── 表单（RHF Provider） ─────────────────────────── */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-5">
            {/* 全局错误提示（如有） */}
            {Object.keys(errors).length > 0 && (
              <Alert
                variant="danger"
                title="请检查表单"
                icon={<AlertTriangle size={15} />}
                className="mb-5"
              >
                表单中有 {Object.keys(errors).length} 个字段需要填写或修正。
              </Alert>
            )}

            <ContentStack>

              {/* ── 分区 1：基本信息 ──────────────────── */}
              <ContentCard>
                <div className="px-5 py-4 border-b border-[var(--border)]">
                  <h2 className="text-[14px] font-semibold text-[var(--gray-12)]">基本信息</h2>
                  <p className="text-[12px] text-[var(--gray-9)] mt-0.5">选择申请门店和类型</p>
                </div>
                <div className="p-5">
                  {/* 两列网格 — 标准表单布局 */}
                  <div className="grid grid-cols-2 gap-x-5 gap-y-5">

                    {/* 申请门店（Combobox — 因为选项多需要搜索） */}
                    <FormField
                      control={form.control}
                      name="storeId"
                      render={({ field }) => (
                        <div className="col-span-2 sm:col-span-1">
                          <FormLabel required>申请门店</FormLabel>
                          <FormControl>
                            <Combobox
                              options={STORE_OPTIONS}
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="搜索并选择门店…"
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      )}
                    />

                    {/* 申请类型（Select — 选项少） */}
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <div>
                          <FormLabel required>申请类型</FormLabel>
                          <FormControl>
                            <Select
                              options={TYPE_OPTIONS}
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="请选择类型"
                              error={!!errors.type}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      )}
                    />

                    {/* 申请标题（占全行） */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <div className="col-span-2">
                          <FormLabel required>申请标题</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="简要描述此次申请，如：海淀科技店 1月补货申请"
                              error={!!errors.title}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      )}
                    />

                    {/* 优先级 — RadioGroup */}
                    <div className="col-span-2">
                      <FormLabel>优先级</FormLabel>
                      <RadioGroup
                        value={priority}
                        onValueChange={(v) => form.setValue("priority", v as "urgent" | "normal" | "low")}
                        className="flex gap-3 mt-1.5"
                      >
                        {[
                          { value: "urgent", label: "紧急", desc: "24h 内处理" },
                          { value: "normal", label: "普通", desc: "3 个工作日" },
                          { value: "low",    label: "低",   desc: "7 个工作日" },
                        ].map(opt => (
                          <label
                            key={opt.value}
                            className={`flex-1 flex items-start gap-2 p-3 rounded-[8px] border cursor-pointer transition-colors ${
                              priority === opt.value
                                ? "border-[var(--gray-12)] bg-[var(--gray-2)]"
                                : "border-[var(--border)] hover:bg-[var(--gray-2)]"
                            }`}
                          >
                            <RadioGroupItem value={opt.value} id={opt.value} className="mt-0.5" />
                            <div>
                              <p className="text-[13px] font-medium text-[var(--gray-12)]">{opt.label}</p>
                              <p className="text-[11px] text-[var(--gray-9)]">{opt.desc}</p>
                            </div>
                          </label>
                        ))}
                      </RadioGroup>
                    </div>

                  </div>
                </div>
              </ContentCard>

              {/* ── 分区 2：金额信息 ──────────────────── */}
              <ContentCard>
                <div className="px-5 py-4 border-b border-[var(--border)]">
                  <h2 className="text-[14px] font-semibold text-[var(--gray-12)]">金额信息</h2>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-x-5 gap-y-5">

                    {/* 申请金额 */}
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <div>
                          <FormLabel required>申请金额</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                              placeholder="0.00"
                              error={!!errors.amount}
                              prefix={<span className="text-[var(--gray-9)] text-[13px]">¥</span>}
                            />
                          </FormControl>
                          <FormDescription>单笔最高 ¥1,000,000</FormDescription>
                          <FormMessage />
                        </div>
                      )}
                    />

                    {/* 币种 */}
                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <div>
                          <FormLabel>币种</FormLabel>
                          <FormControl>
                            <Select
                              options={CURRENCY_OPTIONS}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                        </div>
                      )}
                    />

                    {/* 生效日期 */}
                    <FormField
                      control={form.control}
                      name="effectiveDate"
                      render={({ field }) => (
                        <div>
                          <FormLabel>生效日期</FormLabel>
                          <FormControl>
                            <DatePicker
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="选择生效日期"
                            />
                          </FormControl>
                        </div>
                      )}
                    />

                    {/* 截止日期 */}
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <div>
                          <FormLabel>截止日期</FormLabel>
                          <FormControl>
                            <DatePicker
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="选择截止日期"
                            />
                          </FormControl>
                        </div>
                      )}
                    />

                  </div>
                </div>
              </ContentCard>

              {/* ── 分区 3：详细说明 ──────────────────── */}
              <ContentCard>
                <div className="px-5 py-4 border-b border-[var(--border)]">
                  <h2 className="text-[14px] font-semibold text-[var(--gray-12)]">详细说明</h2>
                </div>
                <div className="p-5 space-y-5">

                  {/* 备注 — 全宽 */}
                  <FormField
                    control={form.control}
                    name="remark"
                    render={({ field }) => (
                      <div>
                        <FormLabel>申请说明</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="请详细描述申请原因、背景和预期效果…"
                            rows={4}
                            maxLength={1000}
                            showCount
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    )}
                  />

                  {/* 关联订单（多选） */}
                  <FormField
                    control={form.control}
                    name="relatedOrderIds"
                    render={({ field }) => (
                      <div>
                        <FormLabel>关联订单 <span className="text-[11px] text-[var(--gray-8)] font-normal">（可选）</span></FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={RELATED_ORDER_OPTIONS}
                            value={field.value ?? []}
                            onChange={field.onChange}
                            placeholder="搜索并选择关联订单…"
                          />
                        </FormControl>
                      </div>
                    )}
                  />

                </div>
              </ContentCard>

              {/* ── 分区 4：附件上传 ──────────────────── */}
              <ContentCard>
                <div className="px-5 py-4 border-b border-[var(--border)]">
                  <h2 className="text-[14px] font-semibold text-[var(--gray-12)]">附件</h2>
                </div>
                <div className="p-5">
                  <FileUpload
                    accept=".pdf,.jpg,.png,.xlsx,.docx"
                    multiple
                    maxFiles={10}
                    maxSize={20 * 1024 * 1024}
                    onFilesChange={setAttachments}
                    hint="支持 PDF / 图片 / Excel / Word，单文件最大 20MB，最多 10 个文件"
                  />
                </div>
              </ContentCard>

              {/* ── 分区 5：通知设置（可折叠类型的补充项） ── */}
              <ContentCard>
                <div className="px-5 py-4 border-b border-[var(--border)]">
                  <h2 className="text-[14px] font-semibold text-[var(--gray-12)]">通知设置</h2>
                </div>
                <div className="p-5 space-y-4">
                  <FormField
                    control={form.control}
                    name="notifyApprover"
                    render={({ field }) => (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[13px] font-medium text-[var(--gray-12)]">提交后通知审批人</p>
                          <p className="text-[12px] text-[var(--gray-9)]">提交成功后向审批人发送消息提醒</p>
                        </div>
                        {/* Switch — 效果即时，无需表单提交 */}
                        <Switch
                          checked={field.value ?? true}
                          onChange={field.onChange}
                          size="md"
                        />
                      </div>
                    )}
                  />
                </div>
              </ContentCard>

            </ContentStack>
          </div>

          {/* ── 底部固定操作栏 ─────────────────────── */}
          <ActionBar
            isSubmitting={isSubmitting}
            isDirty={isDirty}
            onSaveDraft={handleSaveDraft}
            onDiscard={() => setDiscardConfirm(true)}
          />

        </form>
      </Form>

      {/* ── 丢弃确认 ─────────────────────────────────── */}
      <ConfirmDialog
        open={discardConfirm}
        onClose={() => setDiscardConfirm(false)}
        onConfirm={() => { setDiscardConfirm(false); history.back(); }}
        title="确认丢弃此申请？"
        description="未保存的内容将全部丢失，此操作不可撤销。"
        confirmLabel="丢弃"
        variant="danger"
      />

    </Main>
  );
}
