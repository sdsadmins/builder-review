'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/shared/GlassCard';
import { Plus, Save, Check } from 'lucide-react';
import { toast } from 'sonner';

const permissionGroups = {
  '📝 Review': ['review.create', 'review.edit', 'review.delete', 'review.approve', 'review.reject', 'review.view_all'],
  '🏢 Builder': ['builder.view', 'builder.create', 'builder.edit', 'builder.delete', 'builder.verify'],
  '🔧 Vendor': ['vendor.view', 'vendor.create', 'vendor.edit', 'vendor.delete', 'vendor.verify'],
  '🌟 Feed': ['feed.post', 'feed.moderate', 'feed.delete'],
  '🎁 Reward': ['reward.view', 'reward.issue', 'reward.process_payout', 'reward.revoke'],
  '⚙️ Admin': ['admin.dashboard', 'admin.users', 'admin.roles', 'admin.audit_log', 'admin.reports'],
};

const roles = [
  { id: '1', name: 'Super Admin', desc: 'Full platform access', color: '#EF4444', permissions: Object.values(permissionGroups).flat() },
  { id: '2', name: 'Moderator', desc: 'Reviews and content moderation', color: '#F59E0B', permissions: ['review.view_all', 'review.approve', 'review.reject', 'feed.moderate', 'feed.delete'] },
  { id: '3', name: 'Builder', desc: 'Builder account access', color: '#8B5CF6', permissions: ['review.view_all', 'builder.view', 'builder.edit'] },
  { id: '4', name: 'Vendor', desc: 'Vendor account access', color: '#06B6D4', permissions: ['review.view_all', 'vendor.view', 'vendor.edit'] },
  { id: '5', name: 'Buyer', desc: 'Standard user access', color: '#22C55E', permissions: ['review.create', 'review.edit', 'feed.post', 'reward.view'] },
];

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState(roles[1]);
  const [permissions, setPermissions] = useState<Set<string>>(new Set(roles[1].permissions));
  const [showCreate, setShowCreate] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');

  const togglePermission = (perm: string) => {
    setPermissions((prev) => {
      const next = new Set(prev);
      if (next.has(perm)) next.delete(perm);
      else next.add(perm);
      return next;
    });
  };

  const handleSave = async () => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success(`✅ Permissions saved for ${selectedRole.name}`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">🔐 Role Management</h1>
          <p className="text-white/50">Define roles and their permissions</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#0A0A0F' }}
        >
          <Plus size={16} />
          Create Role
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Roles List */}
        <div className="space-y-2">
          <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-3">🎭 Roles</p>
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => { setSelectedRole(role); setPermissions(new Set(role.permissions)); }}
              className="w-full text-left p-4 rounded-xl transition-all"
              style={{
                background: selectedRole.id === role.id ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.04)',
                border: selectedRole.id === role.id ? `1px solid ${role.color}40` : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ background: role.color }} />
                <span className="text-sm font-semibold text-white">{role.name}</span>
              </div>
              <p className="text-xs text-white/40 ml-4">{role.desc}</p>
            </button>
          ))}
        </div>

        {/* Permissions */}
        <div className="lg:col-span-3">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white font-bold text-lg">
                  <span style={{ color: selectedRole.color }}>●</span> {selectedRole.name}
                </h3>
                <p className="text-xs text-white/40 mt-0.5">{permissions.size} permissions enabled</p>
              </div>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#0A0A0F' }}
              >
                <Save size={14} />
                💾 Save Permissions
              </button>
            </div>

            <div className="space-y-6">
              {Object.entries(permissionGroups).map(([group, perms]) => (
                <div key={group}>
                  <h4 className="text-sm font-semibold text-white/70 mb-3">{group}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {perms.map((perm) => {
                      const enabled = permissions.has(perm);
                      return (
                        <button
                          key={perm}
                          onClick={() => togglePermission(perm)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-left transition-all"
                          style={{
                            background: enabled ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.04)',
                            border: enabled ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          <div
                            className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                            style={{
                              background: enabled ? '#F59E0B' : 'transparent',
                              border: enabled ? 'none' : '1px solid rgba(255,255,255,0.2)',
                            }}
                          >
                            {enabled && <Check size={10} style={{ color: '#0A0A0F' }} />}
                          </div>
                          <span style={{ color: enabled ? '#F59E0B' : '#ffffff50' }}>{perm}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Create Role Modal */}
      {showCreate && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowCreate(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="rounded-2xl p-8 w-full max-w-md mx-4"
            style={{ background: '#12121A', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <h3 className="text-white font-bold text-lg mb-5">➕ Create New Role</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Role Name</label>
                <input
                  type="text"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="e.g. Content Manager"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#F8F8FF' }}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { toast.success(`✅ Role "${newRoleName}" created!`); setShowCreate(false); setNewRoleName(''); }}
                  className="flex-1 py-3 rounded-xl text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#0A0A0F' }}
                >
                  Create Role
                </button>
                <button
                  onClick={() => setShowCreate(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-medium border border-white/10 text-white/60"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
