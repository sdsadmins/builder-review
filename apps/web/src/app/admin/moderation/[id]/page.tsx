'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import StarRating from '@/components/shared/StarRating';
import { ChevronLeft, CheckCircle, XCircle, PauseCircle, Clock, Building2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

type RatingDetail = { label: string; value: number | null | string };

const ratingDetails: RatingDetail[] = [
  { label: 'Construction Quality', value: 4.5 },
  { label: 'Finishing', value: 4.0 },
  { label: 'Amenities', value: 4.5 },
  { label: 'Responsiveness', value: 3.5 },
  { label: 'Grievance Redressal', value: 3.0 },
  { label: 'Documentation', value: 4.0 },
  { label: 'RERA Compliance', value: null },
  { label: 'Possession Delay', value: '6 months' },
  { label: 'Maintenance Quality', value: 4.0 },
];

const actionHistory = [
  { time: 'Jan 18, 2026 10:30 AM', actor: 'System', action: 'Review submitted by Rahul Mehta' },
  { time: 'Jan 18, 2026 11:00 AM', actor: 'Admin A', action: 'Review claimed for moderation' },
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
    const labels = { approve: 'Approved', reject: 'Rejected', hold: 'Put on hold' };
    toast.success(`${labels[type]} review #4521`);
    router.push('/admin/moderation');
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link
          href="/admin/moderation"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-amber-700 transition-colors mb-6"
        >
          <ChevronLeft size={16} className="text-amber-700" />
          Back to Queue
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-stone-900 mb-1">Review #4521</h1>
            <p className="text-stone-500 text-sm flex items-center gap-1.5">
              <Building2 size={14} className="text-stone-400" />
              Submitted Jan 18, 2026 by Rahul Mehta
            </p>
          </div>
          <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
            Pending
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: Review Details */}
          <div className="lg:col-span-2 space-y-5">

            {/* Reviewer Info */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-stone-900 font-semibold mb-4 flex items-center gap-2">
                <Building2 size={16} className="text-amber-700" />
                Reviewer Details
              </h3>
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
                    <p className="text-stone-400 text-xs mb-1">{label}</p>
                    <p className="text-stone-700">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-stone-900 font-semibold mb-4">Rating Breakdown</h3>
              <div className="space-y-3">
                {ratingDetails.map((r) => (
                  <div key={r.label} className="flex items-center justify-between">
                    <span className="text-sm text-stone-600">{r.label}</span>
                    {r.value === null ? (
                      <span className="text-xs text-green-600 font-medium">Compliant</span>
                    ) : typeof r.value === 'number' ? (
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-600 rounded-full"
                            style={{ width: `${(r.value / 5) * 100}%` }}
                          />
                        </div>
                        <StarRating value={r.value} size="sm" showValue />
                      </div>
                    ) : (
                      <span className="text-sm text-amber-700 font-semibold">{r.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Written Review */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-stone-900 font-semibold mb-4">Written Review</h3>
              <div className="bg-stone-50 rounded-xl p-4">
                <p className="text-stone-600 leading-relaxed text-sm">
                  The construction quality exceeded my expectations. Marble flooring and premium fittings throughout the
                  apartment. The builder delivered the unit only 2 months late, which is quite impressive for Bangalore.
                  Amenities like the swimming pool and gym are world-class. However, the communication team could be more
                  responsive — had to wait 3 days for a reply sometimes. The RERA documentation was transparent and all
                  demand letters were issued correctly. Overall, I&apos;m very happy with my purchase and would definitely
                  recommend Prestige Group to other homebuyers.
                </p>
              </div>
            </div>

          </div>

          {/* Right: Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm sticky top-6">
              <h3 className="text-stone-900 font-semibold mb-5">Review Actions</h3>

              <div className="space-y-3 mb-5">
                <button
                  onClick={() => setAction('approve')}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
                    action === 'approve'
                      ? 'bg-green-600 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  <CheckCircle size={16} />
                  Approve
                </button>
                <button
                  onClick={() => setAction('hold')}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
                    action === 'hold'
                      ? 'bg-stone-300 text-stone-800'
                      : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
                  }`}
                >
                  <PauseCircle size={16} />
                  Put on Hold
                </button>
                <button
                  onClick={() => setAction('reject')}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
                    action === 'reject'
                      ? 'bg-red-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  <XCircle size={16} />
                  Reject
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Note <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Add a note for this action..."
                  className="w-full rounded-xl p-3 text-sm outline-none resize-none border border-stone-300 bg-white text-stone-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              {action && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => handleAction(action)}
                  disabled={submitting}
                  className="w-full py-3 rounded-xl text-sm font-bold transition-all bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-50"
                >
                  {submitting ? 'Processing...' : `Confirm ${action === 'approve' ? 'Approval' : action === 'reject' ? 'Rejection' : 'Hold'}`}
                </motion.button>
              )}

              {/* Action History */}
              <div className="mt-6 pt-5 border-t border-stone-100">
                <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">Action History</h4>
                <div className="space-y-3">
                  {actionHistory.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Clock size={12} className="text-stone-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-stone-600">{item.action}</p>
                        <p className="text-xs text-stone-400">{item.actor} — {item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
