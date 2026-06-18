'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollText, Clock, User, FileText, Download } from 'lucide-react';

const logs = [
  { id: 1, time: '2026-01-18 10:30:42', actor: 'admin@builderreview.in', role: 'Admin', action: 'review.approved', resource: 'Review #4520', ip: '103.21.45.67' },
  { id: 2, time: '2026-01-18 10:15:23', actor: 'rahul@example.com', role: 'Buyer', action: 'user.login', resource: 'User Profile', ip: '117.96.120.45' },
  { id: 3, time: '2026-01-18 09:45:11', actor: 'admin@builderreview.in', role: 'Admin', action: 'review.rejected', resource: 'Review #4519', ip: '103.21.45.67' },
  { id: 4, time: '2026-01-18 09:30:55', actor: 'priya@example.com', role: 'Buyer', action: 'user.login', resource: 'User Profile', ip: '49.36.78.12' },
  { id: 5, time: '2026-01-18 08:55:22', actor: 'admin@builderreview.in', role: 'Admin', action: 'role.assigned', resource: 'User vikram@example.com', ip: '103.21.45.67' },
  { id: 6, time: '2026-01-17 22:15:08', actor: 'System', role: 'System', action: 'review.approved', resource: 'Review #4518', ip: 'internal' },
  { id: 7, time: '2026-01-17 21:45:33', actor: 'admin@builderreview.in', role: 'Admin', action: 'role.assigned', resource: 'Role: Moderator', ip: '103.21.45.67' },
  { id: 8, time: '2026-01-17 20:12:19', actor: 'kavitha@example.com', role: 'Buyer', action: 'user.login', resource: 'User Profile', ip: '106.215.34.78' },
];

const actionTypes = ['All', 'review.approved', 'review.rejected', 'role.assigned', 'user.login'];

const actionStyles: Record<string, string> = {
  'review.approved': 'text-green-700',
  'review.rejected': 'text-red-600',
  'role.assigned': 'text-amber-700',
  'user.login': 'text-stone-500',
};

const roleBadge: Record<string, string> = {
  Admin: 'bg-amber-100 text-amber-800',
  Buyer: 'bg-stone-100 text-stone-600',
  System: 'bg-stone-100 text-stone-500',
  Moderator: 'bg-green-100 text-green-700',
};

export default function AuditLogPage() {
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filtered = logs.filter((log) => {
    const matchSearch =
      log.actor.includes(search) ||
      log.action.includes(search) ||
      log.resource.includes(search);
    const matchType = selectedType === 'All' || log.action === selectedType;
    return matchSearch && matchType;
  });

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ScrollText size={22} className="text-amber-700" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-stone-900">Audit Log</h1>
                <span className="text-xs px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 font-medium">
                  Immutable — read only
                </span>
              </div>
              <p className="text-stone-500 text-sm mt-0.5">Complete history of all platform actions</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-amber-700 text-amber-700 hover:bg-amber-50 transition-colors">
            <Download size={15} />
            Export CSV
          </button>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by actor, action, or resource..."
            className="flex-1 max-w-sm px-4 py-2.5 rounded-xl text-sm outline-none bg-white border border-stone-300 text-stone-800 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          />
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm outline-none bg-white border border-stone-300 text-stone-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm outline-none bg-white border border-stone-300 text-stone-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm outline-none bg-white border border-stone-300 text-stone-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          >
            {actionTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="px-5 py-3.5 text-left text-xs text-stone-500 font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-stone-400" /> Time</span>
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs text-stone-500 font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><User size={12} className="text-stone-400" /> Actor</span>
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs text-stone-500 font-semibold uppercase tracking-wider">Role</th>
                  <th className="px-5 py-3.5 text-left text-xs text-stone-500 font-semibold uppercase tracking-wider">Action</th>
                  <th className="px-5 py-3.5 text-left text-xs text-stone-500 font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><FileText size={12} className="text-stone-400" /> Resource</span>
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs text-stone-500 font-semibold uppercase tracking-wider">IP</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((log) => (
                  <tr key={log.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors last:border-0">
                    <td className="px-5 py-4 font-mono text-xs text-stone-400 whitespace-nowrap">{log.time}</td>
                    <td className="px-5 py-4 text-sm text-stone-600">{log.actor}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleBadge[log.role] ?? 'bg-stone-100 text-stone-600'}`}>
                        {log.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-mono font-semibold ${actionStyles[log.action] ?? 'text-stone-500'}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-stone-500">{log.resource}</td>
                    <td className="px-5 py-4 font-mono text-xs text-stone-400">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
