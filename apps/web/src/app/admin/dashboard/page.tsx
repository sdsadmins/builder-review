'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  LayoutDashboard, Users, FileText, Clock, Building2, Store,
  DollarSign, CreditCard, AlertCircle, Activity, ArrowRight, CheckCircle, Flag,
} from 'lucide-react';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const stats = [
  { icon: Users, label: 'Total Users', value: '48,291', cardClass: 'bg-white border-stone-200' },
  { icon: FileText, label: 'Total Reviews', value: '50,847', cardClass: 'bg-white border-stone-200' },
  { icon: Clock, label: 'Pending Moderation', value: '134', cardClass: 'bg-amber-50 border-amber-200', valueClass: 'text-amber-700' },
  { icon: Building2, label: 'Builders', value: '2,041', cardClass: 'bg-white border-stone-200' },
  { icon: Store, label: 'Vendors', value: '389', cardClass: 'bg-white border-stone-200' },
  { icon: DollarSign, label: 'Rewards Issued', value: '₹9.8Cr', cardClass: 'bg-white border-stone-200' },
  { icon: CreditCard, label: 'Pending Payouts', value: '47', cardClass: 'bg-white border-stone-200' },
  { icon: AlertCircle, label: 'Flagged Content', value: '12', cardClass: 'bg-white border-stone-200', iconClass: 'text-red-500', valueClass: 'text-red-500' },
];

const activity = [
  { time: '2m ago', user: 'Rahul M.', action: 'Submitted review for', resource: 'Prestige Group', type: 'pending' },
  { time: '5m ago', user: 'Admin', action: 'Approved review from', resource: 'DLF Limited', type: 'approve' },
  { time: '12m ago', user: 'Priya S.', action: 'Registered as new user', resource: '', type: 'pending' },
  { time: '1h ago', user: 'Admin', action: 'Rejected review for', resource: 'Omaxe Ltd', type: 'reject' },
  { time: '2h ago', user: 'System', action: 'Payout processed', resource: '₹1,500 via UPI', type: 'approve' },
  { time: '3h ago', user: 'Vikram T.', action: 'Flagged content on', resource: 'Review #4521', type: 'flag' },
];

const dotColors: Record<string, string> = {
  approve: 'bg-green-500',
  pending: 'bg-amber-500',
  reject: 'bg-red-500',
  flag: 'bg-red-500',
};

const quickActions = [
  { href: '/admin/moderation', label: 'Review Moderation Queue' },
  { href: '/admin/users', label: 'Manage Users' },
  { href: '/admin/reports', label: 'Export Reports' },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>

          {/* Header */}
          <motion.div variants={fadeUp} className="mb-8 flex items-center gap-3">
            <LayoutDashboard size={22} className="text-amber-700" />
            <div>
              <h1 className="text-2xl font-bold text-stone-900">Admin Dashboard</h1>
              <p className="text-stone-500 text-sm mt-0.5">Platform overview and moderation status</p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`${stat.cardClass} border rounded-2xl p-5 shadow-sm`}
                >
                  <Icon
                    size={18}
                    className={stat.iconClass ?? 'text-amber-700'}
                  />
                  <div className={`text-3xl font-black mt-3 mb-1 ${stat.valueClass ?? 'text-stone-900'}`}>
                    {stat.value}
                  </div>
                  <div className="text-stone-500 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <Activity size={18} className="text-amber-700" />
                  <h2 className="text-base font-semibold text-stone-900">Recent Activity</h2>
                </div>
                <div className="space-y-4">
                  {activity.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColors[item.type]}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-stone-700">
                          <span className="font-semibold">{item.user}</span>
                          {' '}{item.action}{' '}
                          {item.resource && <span className="text-stone-500">{item.resource}</span>}
                        </p>
                      </div>
                      <span className="text-xs text-stone-400 flex-shrink-0">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={fadeUp}>
              <h2 className="text-base font-semibold text-stone-900 mb-3">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <Link key={action.href} href={action.href}>
                    <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm hover:border-amber-200 transition-all cursor-pointer group">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-700 text-sm font-medium group-hover:text-stone-900 transition-colors">
                          {action.label}
                        </span>
                        <ArrowRight size={16} className="text-amber-700 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
