'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/shared/GlassCard';
import StarRating from '@/components/shared/StarRating';
import { ArrowLeft, CheckCircle, XCircle, PauseCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

type RatingDetail = { label: string; value: number | null | string };

const ratingDetails: RatingDetail[] = [
  { label: 'Construction Quality ⚒️', value: 4.5 },
  { label: 'Finishing 🎨', value: 4.0 },
  { label: 'Amenities 🏊', value: 4.5 },
  { label: 'Responsiveness 📞', value: 3.5 },
  { label: 'Grievance Redressal 🆘', value: 3.0 },
  { label: 'Documentation 📄', value: 4.0 },
  { label: 'RERA Compliance 🛡️', value: null },
  { label: 'Possession Delay ⏰', value: '6 months' },
  { label: 'Maintenance Quality ⚙️', value: 4.0 },
];

const actionHistory = [
  { time: 'Jan 18, 2026 10:30 AM', actor: 'System', action: 'Review submitted by Rahul Mehta', color: '#F59E0B' },
  { time: 'Jan 18, 2026 11:00 AM', actor: 'Admin A', action: 'Review claimed for moderation', color: '#8B5CF6' },
];

export default function ReviewCheckerPage() {
  const router = useRouter();
  const [action, setAction] = useState<'approve' | 'reject' | 'hold' | null>(null);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleAction = async (type: 'approve' | 'reject' | 'hold') => {
    if ((type === 'reject' || type === 'hold') && !reason) {
      toast.error('Please provide a reason');
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    const labels = { approve: '✅ Approved', reject: '❌ Rejected', hold: '⏸️ Put on hold' };
    toast.success(`${labels[type]} review #4521`);
    router.push('/admin/moderation');
    setSubmitting(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Back */}
      <Link href="/admin/moderation" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-amber-400 transition-colors mb-6">
        <ArrowLeft size={14} />
        Back to Queue
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">🔍 Review #4521</h1>
          <p className="text-white/50 text-sm">Submitted Jan 18, 2026 by Rahul Mehta</p>
        </div>
        <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-amber-500/15 border border-amber-500/30 text-amber-400">
          ⏳ Pending
        </span>
      </div>

      {/* Reviewer Info */}
      <GlassCard className="p-6 mb-6">
        <h3 className="text-white font-bold mb-4">👤 Reviewer Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            ['Name', 'Rahul Mehta'],
            ['Email', 'rahul@example.com'],
            ['Phone', '+91 98765 43210'],
            ['Joined', 'Dec 2024'],
            ['Builder', 'Prestige Group'],
            ['Project', 'Prestige Lakeside Habitat'],
            ['Unit', 'A-204'],
            ['City', 'Bangalore'],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-white/40 text-xs mb-1">{label}</p>
              <p className="text-white/80">{value}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Ratings */}
      <GlassCard className="p-6 mb-6">
        <h3 className="text-white font-bold mb-4">📊 Rating Breakdown</h3>
        <div className="space-y-3">
          {ratingDetails.map((r) => (
            <div key={r.label} className="flex items-center justify-between">
              <span className="text-sm text-white/60">{r.label}</span>
              {r.value === null ? (
                <span className="text-xs text-green-400">✅ Compliant</span>
              ) : typeof r.value === 'number' ? (
                <StarRating value={r.value} size="sm" showValue />
              ) : (
                <span className="text-sm text-amber-400 font-semibold">{r.value}</span>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Written Review */}
      <GlassCard className="p-6 mb-6">
        <h3 className="text-white font-bold mb-4">📝 Written Review</h3>
        <p className="text-white/70 leading-relaxed text-sm">
          The construction quality exceeded my expectations. Marble flooring and premium fittings throughout the
          apartment. The builder delivered the unit only 2 months late, which is quite impressive for Bangalore.
          Amenities like the swimming pool and gym are world-class. However, the communication team could be more
          responsive — had to wait 3 days for a reply sometimes. The RERA documentation was transparent and all
          demand letters were issued correctly. Overall, I&apos;m very happy with my purchase and would definitely
          recommend Prestige Group to other homebuyers.
        </p>
      </GlassCard>

      {/* Media */}
      <GlassCard className="p-6 mb-6">
        <h3 className="text-white font-bold mb-4">📸 Uploaded Media</h3>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-xl flex items-center justify-center text-4xl"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              🏠
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-white/50">📄 Documents:</span>
          <span className="text-amber-400">sale_deed.pdf, allotment_letter.pdf</span>
        </div>
      </GlassCard>

      {/* Action */}
      <GlassCard className="p-6 mb-6">
        <h3 className="text-white font-bold mb-5">⚖️ Moderation Action</h3>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-5">
          {([
            { type: 'approve' as const, label: '✅ Approve', color: '#22C55E', bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.3)', icon: CheckCircle },
            { type: 'hold' as const, label: '⏸️ Hold', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)', icon: PauseCircle },
            { type: 'reject' as const, label: '❌ Reject', color: '#EF4444', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)', icon: XCircle },
          ]).map(({ type, label, color, bg, border, icon: Icon }) => (
            <button
              key={type}
              onClick={() => setAction(type)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: action === type ? bg : 'rgba(255,255,255,0.04)',
                border: action === type ? `2px solid ${border}` : '1px solid rgba(255,255,255,0.08)',
                color: action === type ? color : '#ffffff60',
              }}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {action && action !== 'approve' && (
          <div className="mb-4">
            <label className="block text-sm text-white/60 mb-2">
              📝 Reason <span className="text-red-400">*required</span>
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide a clear reason for this action..."
              className="w-full rounded-xl p-3 text-sm outline-none resize-none"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#F8F8FF',
              }}
            />
          </div>
        )}

        {action && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => handleAction(action)}
            disabled={submitting}
            className="w-full py-3 rounded-xl text-sm font-bold transition-all"
            style={{
              background: action === 'approve' ? 'linear-gradient(135deg, #22C55E, #16A34A)' : action === 'reject' ? 'linear-gradient(135deg, #EF4444, #DC2626)' : 'linear-gradient(135deg, #F59E0B, #D97706)',
              color: '#0A0A0F',
            }}
          >
            {submitting ? '⏳ Processing...' : `Confirm ${action === 'approve' ? '✅ Approval' : action === 'reject' ? '❌ Rejection' : '⏸️ Hold'}`}
          </motion.button>
        )}
      </GlassCard>

      {/* Action History */}
      <GlassCard className="p-6">
        <h3 className="text-white font-bold mb-4">📋 Action History</h3>
        <div className="space-y-3">
          {actionHistory.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: item.color }} />
              <div>
                <p className="text-sm text-white/70">{item.action}</p>
                <p className="text-xs text-white/30">{item.actor} • {item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
