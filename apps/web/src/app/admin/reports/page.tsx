'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/shared/GlassCard';
import { Download, Calendar, FileText, CheckCircle, Clock, ArrowDownToLine } from 'lucide-react';
import { toast } from 'sonner';

type ReportStatus = 'idle' | 'generating' | 'ready' | 'downloaded';

interface Report {
  id: string;
  label: string;
  emoji: string;
  desc: string;
  size: string;
}

const reports: Report[] = [
  { id: 'reviews', label: 'Reviews CSV', emoji: '📝', desc: 'All reviews with ratings, builder, user, and timestamps', size: '~2.4MB' },
  { id: 'builders', label: 'Builders CSV', emoji: '🏢', desc: 'Builder profiles with RERA status and aggregate ratings', size: '~340KB' },
  { id: 'rewards', label: 'Rewards CSV', emoji: '🎁', desc: 'All reward transactions with UPI details', size: '~780KB' },
  { id: 'moderation', label: 'Moderation CSV', emoji: '⚖️', desc: 'Moderation actions with reviewer and decision history', size: '~1.1MB' },
];

const statusIcons: Record<ReportStatus, string> = {
  idle: '📥',
  generating: '⏳',
  ready: '✅',
  downloaded: '💾',
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function ReportsPage() {
  const [statuses, setStatuses] = useState<Record<string, ReportStatus>>({});
  const [dateFrom, setDateFrom] = useState('2026-01-01');
  const [dateTo, setDateTo] = useState('2026-01-18');

  const generateReport = async (id: string) => {
    setStatuses((s) => ({ ...s, [id]: 'generating' }));
    await new Promise((r) => setTimeout(r, 2000));
    setStatuses((s) => ({ ...s, [id]: 'ready' }));
    toast.success('📊 Report ready for download!');
  };

  const downloadReport = (id: string, label: string) => {
    setStatuses((s) => ({ ...s, [id]: 'downloaded' }));
    toast.success(`💾 ${label} downloaded!`);
  };

  const status = (id: string): ReportStatus => statuses[id] || 'idle';

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#F8F8FF',
    borderRadius: '12px',
    padding: '10px 14px',
    fontSize: '14px',
    outline: 'none',
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">📈 Reports</h1>
        <p className="text-white/50">Export platform data for analysis and compliance</p>
      </motion.div>

      {/* Date Range */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <GlassCard className="p-6 mb-8">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-amber-500" />
            📅 Date Range Filter
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm text-white/60 mb-2">From</label>
              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} style={inputStyle} className="w-full" />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-white/60 mb-2">To</label>
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} style={inputStyle} className="w-full" />
            </div>
            <div className="text-sm text-white/40 pb-2.5">
              Period: {new Date(dateFrom).toLocaleDateString('en-IN')} → {new Date(dateTo).toLocaleDateString('en-IN')}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Report Cards */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={stagger} initial="hidden" animate="visible">
        {reports.map((report) => {
          const s = status(report.id);
          return (
            <motion.div key={report.id} variants={fadeUp}>
              <GlassCard className="p-6 hover:border-amber-500/20 transition-all">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.15)' }}
                  >
                    {report.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-bold text-sm">{report.label}</h4>
                      <span className="text-xs text-white/30">{report.size}</span>
                    </div>
                    <p className="text-xs text-white/50 mb-4 leading-relaxed">{report.desc}</p>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm">{statusIcons[s]}</span>
                      <span className="text-xs text-white/50">
                        {s === 'idle' && 'Ready to generate'}
                        {s === 'generating' && <span className="animate-pulse text-amber-400">Generating report...</span>}
                        {s === 'ready' && <span className="text-green-400">Report ready!</span>}
                        {s === 'downloaded' && <span className="text-white/40">Downloaded</span>}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {s === 'idle' && (
                        <button
                          onClick={() => generateReport(report.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#0A0A0F' }}
                        >
                          <FileText size={12} />
                          Generate
                        </button>
                      )}
                      {s === 'generating' && (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-amber-400" style={{ background: 'rgba(245,158,11,0.1)' }}>
                          <Clock size={12} className="animate-spin" />
                          Generating...
                        </div>
                      )}
                      {s === 'ready' && (
                        <button
                          onClick={() => downloadReport(report.id, report.label)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                          style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.3)', color: '#22C55E' }}
                        >
                          <ArrowDownToLine size={12} />
                          ⬇️ Download
                        </button>
                      )}
                      {s === 'downloaded' && (
                        <button
                          onClick={() => generateReport(report.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-white/40 border border-white/10 hover:border-amber-500/20 hover:text-amber-400 transition-all"
                        >
                          🔄 Regenerate
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
