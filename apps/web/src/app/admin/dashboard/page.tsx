'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/shared/GlassCard';
import Link from 'next/link';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const stats = [
  { emoji: '👥', label: 'Total Users', value: '52,341', trend: '+8%', up: true, color: '#8B5CF6' },
  { emoji: '📝', label: 'Total Reviews', value: '1,24,567', trend: '+12%', up: true, color: '#F59E0B' },
  { emoji: '⏳', label: 'Pending Moderation', value: '234', trend: '+34', up: false, color: '#EF4444' },
  { emoji: '🏢', label: 'Builders', value: '2,134', trend: '+45', up: true, color: '#22C55E' },
  { emoji: '🏪', label: 'Vendors', value: '891', trend: '+12', up: true, color: '#06B6D4' },
  { emoji: '💰', label: 'Rewards Issued', value: '₹4.2Cr', trend: '+₹45L', up: true, color: '#F59E0B' },
  { emoji: '📤', label: 'Pending Payouts', value: '₹1.2L', trend: '23 users', up: false, color: '#FB923C' },
  { emoji: '🚨', label: 'Flagged Content', value: '17', trend: '-5', up: true, color: '#EF4444' },
];

const activity = [
  { time: '2m ago', user: 'Rahul M.', action: 'Submitted review', resource: 'Prestige Group', type: 'review' },
  { time: '5m ago', user: 'Admin', action: 'Approved review', resource: 'DLF Limited', type: 'approve' },
  { time: '12m ago', user: 'Priya S.', action: 'Registered', resource: 'New User', type: 'user' },
  { time: '1h ago', user: 'Admin', action: 'Rejected review', resource: 'Omaxe Ltd', type: 'reject' },
  { time: '2h ago', user: 'System', action: 'Payout processed', resource: '₹1,500 to UPI', type: 'payout' },
  { time: '3h ago', user: 'Vikram T.', action: 'Flagged content', resource: 'Review #4521', type: 'flag' },
];

const typeColors: Record<string, string> = {
  review: '#F59E0B',
  approve: '#22C55E',
  user: '#8B5CF6',
  reject: '#EF4444',
  payout: '#06B6D4',
  flag: '#FB923C',
};

const quickActions = [
  { href: '/admin/moderation', label: '⚖️ Review Queue', count: 234 },
  { href: '/admin/users', label: '👥 Manage Users', count: null },
  { href: '/admin/reports', label: '📈 Export Reports', count: null },
  { href: '/admin/roles', label: '🔐 Manage Roles', count: null },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-black text-white mb-2">
              📊 Admin Dashboard
            </h1>
            <p className="text-white/50">Platform overview and quick actions</p>
          </div>
          <div className="text-xs text-white/30 text-right">
            <div>Last updated</div>
            <div className="text-white/50">{new Date().toLocaleTimeString()}</div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <GlassCard key={stat.label} className="p-5 hover:border-amber-500/15 transition-all">
              <div className="text-2xl mb-2">{stat.emoji}</div>
              <div className="text-2xl font-black mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs text-white/50 mb-2">{stat.label}</div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                {stat.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {stat.trend}
              </div>
            </GlassCard>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Feed */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">⚡ Recent Activity</h2>
            </div>
            <GlassCard className="p-6">
              <div className="space-y-4">
                {activity.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: typeColors[item.type] }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80">
                        <span className="font-semibold">{item.user}</span>
                        {' '}{item.action}{' '}
                        <span className="text-amber-400/70">{item.resource}</span>
                      </p>
                    </div>
                    <span className="text-xs text-white/30 flex-shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={fadeUp}>
            <h2 className="text-lg font-bold text-white mb-4">⚡ Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <GlassCard className="p-4 hover:border-amber-500/25 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                        {action.label}
                      </span>
                      <div className="flex items-center gap-2">
                        {action.count && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/20">
                            {action.count}
                          </span>
                        )}
                        <ArrowRight size={14} className="text-amber-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>

            {/* System Status */}
            <GlassCard className="p-5 mt-4">
              <h3 className="text-sm font-bold text-white mb-4">🟢 System Status</h3>
              {[
                { label: 'API Server', status: 'Operational', color: '#22C55E' },
                { label: 'Database', status: 'Operational', color: '#22C55E' },
                { label: 'Payment Gateway', status: 'Operational', color: '#22C55E' },
                { label: 'Email Service', status: 'Degraded', color: '#FB923C' },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-xs text-white/60">{s.label}</span>
                  <span className="text-xs font-medium" style={{ color: s.color }}>
                    ● {s.status}
                  </span>
                </div>
              ))}
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
