'use client'
import { useState } from 'react'
import { User, Phone, FileText, Bell, Lock, Camera, Save, CheckCircle, Star, Mail } from 'lucide-react'
import { toast } from 'sonner'
import StarRating from '@/components/shared/StarRating'

const REVIEWS = [
  { builder: 'Prestige Group', rating: 4.5, date: 'Jan 2026', status: 'Approved' },
  { builder: 'Sobha Limited', rating: 4.0, date: 'Dec 2025', status: 'Approved' },
]

const NOTIF_LABELS: Record<string, string> = {
  email: 'Email Notifications',
  sms: 'SMS Notifications',
  rewards: 'Reward Alerts',
  reviews: 'Review Updates',
}

export default function ProfilePage() {
  const [name, setName] = useState('Alex Sharma')
  const [phone, setPhone] = useState('+91 98765 43210')
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)
  const [notifs, setNotifs] = useState({ email: true, sms: false, rewards: true, reviews: true })

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    setSaving(false)
    toast.success('Profile updated successfully!')
  }

  return (
    <div className="bg-stone-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <User size={22} className="text-amber-700" />
          <h1 className="text-2xl font-bold text-stone-900">Your Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar */}
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-4xl font-black">A</div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center shadow-md hover:bg-amber-800 transition-colors">
                <Camera size={14} className="text-white" />
              </button>
            </div>
            <p className="font-bold text-stone-900 text-lg">{name}</p>
            <p className="text-stone-500 text-sm mt-1">Verified Member</p>
            <div className="mt-4 flex items-center justify-center gap-1.5">
              <CheckCircle size={14} className="text-green-600" />
              <span className="text-green-600 text-xs font-medium">Identity Verified</span>
            </div>
          </div>

          {/* Edit form */}
          <div className="lg:col-span-2 bg-white border border-stone-200 rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-stone-900 mb-5 flex items-center gap-2">
              <FileText size={16} className="text-amber-700" /> Edit Profile
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <User size={13} className="text-stone-400" /> Full Name
                </label>
                <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <Phone size={13} className="text-stone-400" /> Phone Number
                </label>
                <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <FileText size={13} className="text-stone-400" /> Bio
                </label>
                <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} placeholder="A bit about yourself..." className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
              </div>
              <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-60">
                <Save size={15} className="text-white" /> {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Security */}
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Lock size={16} className="text-amber-700" /> Change Password
            </h3>
            <div className="space-y-3">
              {['Current Password', 'New Password', 'Confirm Password'].map(label => (
                <div key={label}>
                  <label className="block text-xs font-medium text-stone-600 mb-1">{label}</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                </div>
              ))}
              <button className="w-full py-2 bg-amber-700 text-white rounded-lg text-sm font-semibold hover:bg-amber-800 transition-colors mt-2">
                Update Password
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Bell size={16} className="text-amber-700" /> Notifications
            </h3>
            <div className="space-y-3">
              {Object.entries(notifs).map(([key, val]) => (
                <label key={key} className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-stone-700">{NOTIF_LABELS[key]}</span>
                  <div
                    onClick={() => setNotifs(n => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                    className={`w-10 h-5 rounded-full relative transition-colors ${val ? 'bg-amber-700' : 'bg-stone-300'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${val ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* My Reviews */}
          <div className="lg:col-span-3 bg-white border border-stone-200 rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Star size={16} className="text-amber-700" /> My Reviews
            </h3>
            <div className="divide-y divide-stone-100">
              {REVIEWS.map(r => (
                <div key={r.builder} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-stone-900">{r.builder}</p>
                    <p className="text-xs text-stone-400">{r.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StarRating rating={r.rating} size="sm" />
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      <CheckCircle size={11} className="text-green-600" /> {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
