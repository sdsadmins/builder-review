'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/shared/GlassCard';
import StarRating from '@/components/shared/StarRating';
import { Camera, Save, Lock, Bell, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const inputStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#F8F8FF',
  borderRadius: '12px',
  padding: '10px 14px',
  fontSize: '14px',
  width: '100%',
  outline: 'none',
};

export default function ProfilePage() {
  const [form, setForm] = useState({ name: 'Rahul Mehta', phone: '+91 98765 43210', bio: 'Homebuyer and reviewer at BuilderReview. Purchased in Bangalore.' });
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, sms: false, rewards: true, reviews: true });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('✅ Profile updated successfully!');
    setSaving(false);
  };

  const reviews = [
    { builder: 'Prestige Group', rating: 4.5, date: 'Jan 2026', status: '✅ Approved' },
    { builder: 'Sobha Limited', rating: 4.0, date: 'Dec 2025', status: '✅ Approved' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        <motion.h1 variants={fadeUp} className="text-3xl font-black text-white mb-8">
          👤 Your Profile
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar + Summary */}
          <motion.div variants={fadeUp}>
            <GlassCard className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-amber-500 flex items-center justify-center text-4xl font-black text-black mx-auto">
                  R
                </div>
                <button
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}
                >
                  <Camera size={14} style={{ color: '#0A0A0F' }} />
                </button>
              </div>
              <h2 className="text-white font-bold text-lg">{form.name}</h2>
              <p className="text-white/50 text-sm">rahul@example.com</p>
              <div className="mt-4 pt-4 border-t border-white/8 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl font-black text-amber-400">2</p>
                  <p className="text-xs text-white/40">Reviews</p>
                </div>
                <div>
                  <p className="text-xl font-black text-amber-400">₹500</p>
                  <p className="text-xs text-white/40">Earned</p>
                </div>
                <div>
                  <p className="text-xl font-black text-amber-400">4.8</p>
                  <p className="text-xs text-white/40">Impact</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Edit Profile */}
          <motion.div variants={fadeUp} className="lg:col-span-2 space-y-4">
            <GlassCard className="p-6">
              <h3 className="text-white font-bold mb-5">✏️ Edit Profile</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">👤 Full Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">📱 Phone Number</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">📝 Bio</label>
                  <textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="resize-none" style={inputStyle} />
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#0A0A0F' }}
                >
                  <Save size={14} />
                  {saving ? 'Saving...' : '💾 Save Changes'}
                </button>
              </div>
            </GlassCard>

            {/* Change Password */}
            <GlassCard className="p-6">
              <h3 className="text-white font-bold mb-5 flex items-center gap-2">
                <Lock size={16} className="text-amber-500" />
                🔒 Change Password
              </h3>
              <div className="space-y-3">
                {['Current Password', 'New Password', 'Confirm New Password'].map((label) => (
                  <div key={label}>
                    <label className="block text-sm text-white/60 mb-2">{label}</label>
                    <div className="relative">
                      <input
                        type={showPw ? 'text' : 'password'}
                        placeholder="••••••••"
                        style={inputStyle}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30"
                      >
                        {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="px-5 py-2.5 rounded-xl text-sm font-medium border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-all"
                >
                  Update Password
                </button>
              </div>
            </GlassCard>

            {/* Notifications */}
            <GlassCard className="p-6">
              <h3 className="text-white font-bold mb-5 flex items-center gap-2">
                <Bell size={16} className="text-amber-500" />
                🔔 Notifications
              </h3>
              <div className="space-y-3">
                {Object.entries(notifications).map(([key, value]) => {
                  const labels: Record<string, string> = { email: '📧 Email Notifications', sms: '📱 SMS Notifications', rewards: '🎁 Reward Alerts', reviews: '📝 Review Updates' };
                  return (
                    <div key={key} className="flex items-center justify-between py-2">
                      <span className="text-sm text-white/70">{labels[key]}</span>
                      <button
                        onClick={() => setNotifications({ ...notifications, [key]: !value })}
                        className="w-12 h-6 rounded-full relative transition-all"
                        style={{ background: value ? '#F59E0B' : 'rgba(255,255,255,0.1)' }}
                      >
                        <div
                          className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all"
                          style={{ left: value ? '28px' : '4px' }}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Review History */}
        <motion.div variants={fadeUp} className="mt-6">
          <h3 className="text-white font-bold mb-4">📝 My Reviews</h3>
          <GlassCard className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {['Builder', 'Rating', 'Date', 'Status'].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs text-white/40 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reviews.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td className="px-6 py-4 text-sm text-white/80">{r.builder}</td>
                    <td className="px-6 py-4"><StarRating value={r.rating} size="sm" showValue /></td>
                    <td className="px-6 py-4 text-sm text-white/50">{r.date}</td>
                    <td className="px-6 py-4 text-sm text-green-400">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
