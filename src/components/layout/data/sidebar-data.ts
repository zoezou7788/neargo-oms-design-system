import {
  LayoutDashboard,
  ShoppingCart,
  Store,
  Users,
  CreditCard,
  BarChart3,
  FileText,
  Shield,
  Settings,
  HelpCircle,
  Bell,
  Package,
  Truck,
  UserCheck,
  DollarSign,
  ClipboardList,
} from "lucide-react";
import type { SidebarData } from "../types";

export const sidebarData: SidebarData = {
  user: {
    name: "张三",
    email: "zhangsan@neargo.ai",
    role:  "超级管理员",
  },
  org: {
    name: "NearGo 运营中心",
    tier: "企业版",
  },
  navGroups: [
    {
      title: "",  // 无标签 — 顶层常驻项
      items: [
        {
          title: "仪表盘",
          url:   "/dashboard",
          icon:  LayoutDashboard,
        },
      ],
    },
    {
      title: "核心业务",
      items: [
        {
          title: "订单管理",
          icon:  ShoppingCart,
          items: [
            { title: "全部订单",   url: "/orders",            icon: ClipboardList },
            { title: "待审批",     url: "/orders/pending",    icon: UserCheck, badge: 12 },
            { title: "配送中",     url: "/orders/delivering", icon: Truck },
            { title: "已完成",     url: "/orders/completed",  icon: Package },
          ],
        },
        {
          title: "门店管理",
          icon:  Store,
          items: [
            { title: "门店列表", url: "/stores"        },
            { title: "门店申请", url: "/stores/apply", badge: 3 },
            { title: "商品管理", url: "/stores/items"  },
          ],
        },
        {
          title: "用户管理",
          icon:  Users,
          items: [
            { title: "消费者",  url: "/users/consumers" },
            { title: "商家",    url: "/users/merchants" },
            { title: "骑手",    url: "/users/riders"    },
            { title: "KYC 认证", url: "/users/kyc", badge: 5 },
          ],
        },
      ],
    },
    {
      title: "财务",
      items: [
        {
          title: "财务中心",
          icon:  DollarSign,
          items: [
            { title: "收支概览",  url: "/finance/overview"     },
            { title: "结算管理",  url: "/finance/settlements"  },
            { title: "退款管理",  url: "/finance/refunds"      },
            { title: "优惠券",    url: "/finance/coupons"      },
          ],
        },
        {
          title: "数据报表",
          icon:  BarChart3,
          items: [
            { title: "销售报表",  url: "/reports/sales"    },
            { title: "用户报表",  url: "/reports/users"    },
            { title: "门店报表",  url: "/reports/stores"   },
          ],
        },
      ],
    },
    {
      title: "系统",
      items: [
        {
          title: "操作日志",
          url:   "/audit",
          icon:  Shield,
        },
        {
          title: "通知中心",
          url:   "/notifications",
          icon:  Bell,
        },
        {
          title: "系统设置",
          icon:  Settings,
          items: [
            { title: "基础设置",  url: "/settings/general"       },
            { title: "权限管理",  url: "/settings/permissions"   },
            { title: "角色管理",  url: "/settings/roles"         },
            { title: "API 密钥",  url: "/settings/api-keys"      },
          ],
        },
        {
          title: "帮助中心",
          url:   "/help",
          icon:  HelpCircle,
        },
      ],
    },
  ],
};
