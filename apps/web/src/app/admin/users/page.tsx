'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/shared/GlassCard';
import { Search, Filter, UserCheck, UserX } from 'lucide-react';

const users = [
  { id: '1', name: 'Rahul Mehta', email: 'rahul@example.com', phone: '+91 98765 43210', roles: ['Buyer'], status: 'active', joined: 'Dec 2024', reviews: 2 },
  { id: '2', name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 87654 32109', roles: ['Buyer'], status: 'active', joined: 'Nov 2024', reviews: 5 },
  { id: '3', name: 'DLF Limited', email: 'contact@dlf.in', phone: '+91 11 4444 1234', roles: ['Builder'], status: 'active', joined: 'Oct 2024', reviews: 0 },
  { id: '4', name: 'Vikram Tiwari', email: 'vikram@example.com', phone: '+91 76543 21098', roles: ['Buyer', 'Vendor'], status: 'suspended', joined: 'Sep 2024', reviews: 8 },
  { id: '5', name: 'Kavitha Nair', email: 'kavitha@example.com', phone: '+91 65432 10987', roles: ['Buyer'], status: 'active', joined: 'Jan 2025', reviews: 3 },
  { id: '6', name: 'Arch Visions', email: 'info@archvisions.com', phone: '+91 22 3456 7890', roles: ['Vendor'], status: 'active', joined: 'Feb 2025', reviews: 0 },
];

const roleColors: Record<string, string> = {
  Buyer: 'rgba(245,158,11,0.2)',
  Builder: 'rgba(139,92,246,0.2)',
  Vendor: 'rgba(6,182,212,0.2)',
  Admin: 'rgba(239,68,68,0.2)',
};

const allRoles = ['Buyer', 'Builder', 'Vendor', 'Admin'];

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">👥 User Management</h1>
        <p className="text-white/50">Manage all users, roles, and access control</p>
      </motion.div>

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search users..."
            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#F8F8FF' }}
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:border-amber-500/30 hover:text-amber-400 transition-all">
          <Filter size={14} />
          Filter
        </button>
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['👤 Name', '📧 Email', '📱 Phone', '🎭 Roles', '📅 Joined', '📝 Reviews', '🔄 Status', '⚙️ Actions'].map((h) => (
                  <th key={h} className="px-4 py-4 text-left text-xs text-white/40 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  className="hover:bg-white/2 transition-colors"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                        {user.name[0]}
                      </div>
                      <span className="text-sm text-white font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-white/60">{user.email}</td>
                  <td className="px-4 py-4 text-sm text-white/60">{user.phone}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => (
                        <span
                          key={role}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: roleColors[role],
                            color: role === 'Buyer' ? '#F59E0B' : role === 'Builder' ? '#8B5CF6' : role === 'Vendor' ? '#06B6D4' : '#EF4444',
                          }}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-white/50">{user.joined}</td>
                  <td className="px-4 py-4 text-sm text-white/60">{user.reviews}</td>
                  <td className="px-4 py-4">
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: user.status === 'active' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                        color: user.status === 'active' ? '#22C55E' : '#EF4444',
                      }}
                    >
                      {user.status === 'active' ? '✅ Active' : '🚫 Suspended'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {/* Assign Role */}
                      <select
                        className="text-xs rounded-lg px-2 py-1.5 outline-none"
                        style={{
                          background: 'rgba(245,158,11,0.15)',
                          border: '1px solid rgba(245,158,11,0.2)',
                          color: '#F59E0B',
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>+ Role</option>
                        {allRoles.map((r) => (
                          <option key={r} value={r} style={{ background: '#12121A' }}>{r}</option>
                        ))}
                      </select>
                      {/* Toggle Status */}
                      <button
                        className="p-1.5 rounded-lg transition-all"
                        style={{
                          background: user.status === 'active' ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)',
                          color: user.status === 'active' ? '#EF4444' : '#22C55E',
                        }}
                        title={user.status === 'active' ? 'Suspend user' : 'Activate user'}
                      >
                        {user.status === 'active' ? <UserX size={14} /> : <UserCheck size={14} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
