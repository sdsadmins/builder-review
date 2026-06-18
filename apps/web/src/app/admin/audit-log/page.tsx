'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/shared/GlassCard';
import { Search, Lock } from 'lucide-react';

const logs = [
  { id: 1, time: '2026-01-18 10:30:42', actor: 'admin@builderreview.in', action: 'REVIEW_APPROVED', resource: 'Review #4520', ip: '103.21.45.67', type: 'approve' },
  { id: 2, time: '2026-01-18 10:15:23', actor: 'rahul@example.com', action: 'REVIEW_SUBMITTED', resource: 'Review #4521', ip: '117.96.120.45', type: 'create' },
  { id: 3, time: '2026-01-18 09:45:11', actor: 'admin@builderreview.in', action: 'USER_SUSPENDED', resource: 'User vikram@example.com', ip: '103.21.45.67', type: 'suspend' },
  { id: 4, time: '2026-01-18 09:30:55', actor: 'priya@example.com', action: 'ACCOUNT_CREATED', resource: 'User Profile', ip: '49.36.78.12', type: 'create' },
  { id: 5, time: '2026-01-18 08:55:22', actor: 'admin@builderreview.in', action: 'REWARD_ISSUED', resource: '₹250 to rahul@example.com', ip: '103.21.45.67', type: 'reward' },
  { id: 6, time: '2026-01-17 22:15:08', actor: 'System', action: 'PAYOUT_PROCESSED', resource: '₹1500 via UPI', ip: 'internal', type: 'payout' },
  { id: 7, time: '2026-01-17 21:45:33', actor: 'admin@builderreview.in', action: 'ROLE_UPDATED', resource: 'Role: Moderator', ip: '103.21.45.67', type: 'config' },
  { id: 8, time: '2026-01-17 20:12:19', actor: 'kavitha@example.com', action: 'REVIEW_SUBMITTED', resource: 'Review #4519', ip: '106.215.34.78', type: 'create' },
];

const actionTypes = ['All Actions', 'create', 'approve', 'reject', 'suspend', 'reward', 'payout', 'config'];

const typeColors: Record<string, string> = {
  create: '#22C55E',
  approve: '#22C55E',
  reject: '#EF4444',
  suspend: '#EF4444',
  reward: '#F59E0B',
  payout: '#06B6D4',
  config: '#8B5CF6',
};

export default function AuditLogPage() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All Actions');

  const filtered = logs.filter((log) => {
    const matchSearch = log.actor.includes(search) || log.action.includes(search) || log.resource.includes(search);
    const matchType = selectedType === 'All Actions' || log.type === selectedType;
    return matchSearch && matchType;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-black text-white">📋 Audit Log</h1>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/20 text-red-400 text-xs">
            <Lock size={10} />
            Immutable
          </div>
        </div>
        <p className="text-white/50">Complete history of all platform actions — read only, cannot be modified</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search by actor, action, or resource..."
            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#F8F8FF' }}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {actionTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className="px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all"
              style={{
                background: selectedType === type ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
                border: selectedType === type ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(255,255,255,0.08)',
                color: selectedType === type ? '#F59E0B' : '#ffffff60',
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['⏰ Time', '🧑 Actor', '⚡ Action', '📦 Resource', '🌐 IP'].map((h) => (
                  <th key={h} className="px-5 py-4 text-left text-xs text-white/40 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr
                  key={log.id}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  className="hover:bg-white/2 transition-colors"
                >
                  <td className="px-5 py-4 font-mono text-xs text-white/50 whitespace-nowrap">{log.time}</td>
                  <td className="px-5 py-4 text-sm text-white/70">{log.actor}</td>
                  <td className="px-5 py-4">
                    <span
                      className="text-xs px-2 py-1 rounded-md font-mono font-semibold"
                      style={{
                        background: `${typeColors[log.type]}20`,
                        color: typeColors[log.type],
                        border: `1px solid ${typeColors[log.type]}30`,
                      }}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-white/60">{log.resource}</td>
                  <td className="px-5 py-4 font-mono text-xs text-white/40">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
