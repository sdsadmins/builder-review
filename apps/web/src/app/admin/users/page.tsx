'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Plus, Edit } from 'lucide-react';

const users = [
  { id: '1', name: 'Rahul Mehta', email: 'rahul@example.com', roles: ['Buyer'], status: 'active', joined: 'Dec 2024' },
  { id: '2', name: 'Priya Sharma', email: 'priya@example.com', roles: ['Buyer'], status: 'active', joined: 'Nov 2024' },
  { id: '3', name: 'DLF Limited', email: 'contact@dlf.in', roles: ['Builder'], status: 'active', joined: 'Oct 2024' },
  { id: '4', name: 'Vikram Tiwari', email: 'vikram@example.com', roles: ['Buyer', 'Vendor'], status: 'inactive', joined: 'Sep 2024' },
  { id: '5', name: 'Kavitha Nair', email: 'kavitha@example.com', roles: ['Buyer'], status: 'active', joined: 'Jan 2025' },
  { id: '6', name: 'Arch Visions', email: 'info@archvisions.com', roles: ['Vendor'], status: 'active', joined: 'Feb 2025' },
];

export default function UsersPage() {
  const [search, setSearch] = useState('');

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center gap-3">
          <Users size={22} className="text-amber-700" />
          <div>
            <h1 className="text-2xl font-bold text-stone-900">User Management</h1>
            <p className="text-stone-500 text-sm mt-0.5">Manage all users, roles, and access control</p>
          </div>
        </motion.div>

        {/* Search + Add */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none bg-white border border-stone-300 text-stone-800 placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-700 text-white hover:bg-amber-800 transition-colors">
            <Plus size={16} />
            Add User
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100">
                  {['Name', 'Email', 'Roles', 'Status', 'Joined', 'Actions'].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left text-xs text-stone-500 font-semibold uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-stone-50 hover:bg-stone-50 transition-colors last:border-0"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm flex-shrink-0">
                          {user.name[0]}
                        </div>
                        <span className="text-sm text-stone-900 font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-stone-500">{user.email}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map((role) => (
                          <span
                            key={role}
                            className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}
                        />
                        <span className={`text-sm ${user.status === 'active' ? 'text-green-700' : 'text-red-700'}`}>
                          {user.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-stone-400">{user.joined}</td>
                    <td className="px-5 py-4">
                      <button className="p-1.5 rounded-lg hover:bg-stone-100 transition-colors">
                        <Edit size={15} className="text-amber-700" />
                      </button>
                    </td>
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
