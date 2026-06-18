'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, FileText, Building2, DollarSign, Shield, Download } from 'lucide-react';
import { toast } from 'sonner';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const reports = [
  {
    id: 'reviews',
    label: 'Reviews Report',
    icon: FileText,
    desc: 'Export all review data with ratings, builder, user, and timestamps.',
  },
  {
    id: 'builders',
    label: 'Builders Report',
    icon: Building2,
    desc: 'Builder profiles with RERA status and aggregate ratings.',
  },
  {
    id: 'rewards',
    label: 'Rewards Report',
    icon: DollarSign,
    desc: 'All reward transactions with UPI details and payout history.',
  },
  {
    id: 'moderation',
    label: 'Moderation Report',
    icon: Shield,
    desc: 'Moderation actions with reviewer and decision history.',
  },
];

export default function ReportsPage() {
  const [dateFrom, setDateFrom] = useState('2026-01-01');
  const [dateTo, setDateTo] = useState('2026-01-18');

  const handleDownload = (label: string) => {
    toast.success(`${label} download started`);
  };

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center gap-3">
          <BarChart2 size={22} className="text-amber-700" />
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Reports</h1>
            <p className="text-stone-500 text-sm mt-0.5">Export platform data for analysis and compliance</p>
          </div>
        </motion.div>

        {/* Date Range */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-8 shadow-sm">
            <h3 className="text-stone-900 font-semibold mb-4 text-sm">Date Range</h3>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-xs text-stone-500 font-medium mb-1.5">From</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none bg-white border border-stone-300 text-stone-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-stone-500 font-medium mb-1.5">To</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none bg-white border border-stone-300 text-stone-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
              <div className="text-sm text-stone-400 pb-1.5">
                {new Date(dateFrom).toLocaleDateString('en-IN')} to {new Date(dateTo).toLocaleDateString('en-IN')}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Report Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={stagger} initial="hidden" animate="visible">
          {reports.map((report) => {
            const Icon = report.icon;
            return (
              <motion.div key={report.id} variants={fadeUp}>
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:border-stone-300 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-amber-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-stone-900 font-semibold text-sm mb-1">{report.label}</h4>
                      <p className="text-stone-500 text-xs leading-relaxed mb-4">{report.desc}</p>
                      <button
                        onClick={() => handleDownload(report.label)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-amber-700 text-white hover:bg-amber-800 transition-colors"
                      >
                        <Download size={12} />
                        Download CSV
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}
