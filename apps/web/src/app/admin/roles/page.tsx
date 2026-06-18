'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, Shield, ChevronRight, Save, Plus, Check } from 'lucide-react';
import { toast } from 'sonner';

const permissionGroups: Record<string, string[]> = {
  Review: ['review.create', 'review.edit', 'review.delete', 'review.approve', 'review.reject', 'review.view_all'],
  Builder: ['builder.view', 'builder.create', 'builder.edit', 'builder.delete', 'builder.verify'],
  Vendor: ['vendor.view', 'vendor.create', 'vendor.edit', 'vendor.delete', 'vendor.verify'],
  Feed: ['feed.post', 'feed.moderate', 'feed.delete'],
  Reward: ['reward.view', 'reward.issue', 'reward.process_payout', 'reward.revoke'],
  Admin: ['admin.dashboard', 'admin.users', 'admin.roles', 'admin.audit_log', 'admin.reports'],
};

const roles = [
  { id: '1', name: 'Super Admin', desc: 'Full platform access', permissions: Object.values(permissionGroups).flat() },
  { id: '2', name: 'Moderator', desc: 'Reviews and content moderation', permissions: ['review.view_all', 'review.approve', 'review.reject', 'feed.moderate', 'feed.delete'] },
  { id: '3', name: 'Builder', desc: 'Builder account access', permissions: ['review.view_all', 'builder.view', 'builder.edit'] },
  { id: '4', name: 'Vendor', desc: 'Vendor account access', permissions: ['review.view_all', 'vendor.view', 'vendor.edit'] },
  { id: '5', name: 'Buyer', desc: 'Standard user access', permissions: ['review.create', 'review.edit', 'feed.post', 'reward.view'] },
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
    toast.success(`Permissions saved for ${selectedRole.name}`);
  };

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <KeyRound size={22} className="text-amber-700" />
            <div>
              <h1 className="text-2xl font-bold text-stone-900">Role Management</h1>
              <p className="text-stone-500 text-sm mt-0.5">Define roles and their permissions</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-amber-700 text-amber-700 hover:bg-amber-50 transition-colors"
          >
            <Plus size={16} />
            Create Role
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Roles List */}
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-4 space-y-1 h-fit">
            <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider mb-3 px-2">Roles</p>
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => { setSelectedRole(role); setPermissions(new Set(role.permissions)); }}
                className={`w-full text-left px-3 py-3 rounded-xl transition-all flex items-center justify-between group ${
                  selectedRole.id === role.id
                    ? 'bg-amber-50 border-l-4 border-amber-700'
                    : 'hover:bg-stone-50 border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Shield size={14} className="text-stone-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-stone-900 truncate">{role.name}</p>
                    <p className="text-xs text-stone-400 truncate">{role.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
                    {role.permissions.length}
                  </span>
                  <ChevronRight size={14} className="text-amber-700" />
                </div>
              </button>
            ))}
          </div>

          {/* Permission Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-stone-900 font-bold text-lg">{selectedRole.name}</h3>
                  <p className="text-xs text-stone-400 mt-0.5">{permissions.size} permissions enabled</p>
                </div>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-700 text-white hover:bg-amber-800 transition-colors"
                >
                  <Save size={14} />
                  Save Changes
                </button>
              </div>

              <div className="space-y-6">
                {Object.entries(permissionGroups).map(([group, perms]) => (
                  <div key={group}>
                    <h4 className="text-sm font-semibold text-stone-700 mb-3">{group}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {perms.map((perm) => {
                        const enabled = permissions.has(perm);
                        return (
                          <label
                            key={perm}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors"
                          >
                            <div
                              onClick={() => togglePermission(perm)}
                              className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors ${
                                enabled ? 'bg-amber-700' : 'border border-stone-300 bg-white'
                              }`}
                            >
                              {enabled && <Check size={10} className="text-white" />}
                            </div>
                            <span
                              onClick={() => togglePermission(perm)}
                              className={`text-xs cursor-pointer ${enabled ? 'text-stone-800 font-medium' : 'text-stone-500'}`}
                            >
                              {perm}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Create Role Modal */}
        {showCreate && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-stone-900/40 backdrop-blur-sm"
            onClick={() => setShowCreate(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-stone-200 rounded-2xl p-8 w-full max-w-md mx-4 shadow-xl"
            >
              <h3 className="text-stone-900 font-bold text-lg mb-5">Create New Role</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Role Name</label>
                  <input
                    type="text"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    placeholder="e.g. Content Manager"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none border border-stone-300 bg-white text-stone-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      toast.success(`Role "${newRoleName}" created`);
                      setShowCreate(false);
                      setNewRoleName('');
                    }}
                    className="flex-1 py-3 rounded-xl text-sm font-bold bg-amber-700 text-white hover:bg-amber-800 transition-colors"
                  >
                    Create Role
                  </button>
                  <button
                    onClick={() => setShowCreate(false)}
                    className="flex-1 py-3 rounded-xl text-sm font-medium border border-stone-300 text-stone-600 hover:bg-stone-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
