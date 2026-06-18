'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import ScratchCard from '@/components/rewards/ScratchCard'
import { ArrowDownToLine, CheckCircle, Clock, Gift, DollarSign } from 'lucide-react'
import { toast } from 'sonner'

const scratchCards = [
  { id: 1, amount: 250, status: 'pending' as const },
  { id: 2, amount: 100, status: 'pending' as const },
  { id: 3, amount: 50, status: 'revealed' as const },
  { id: 4, amount: 250, status: 'claimed' as const },
  { id: 5, amount: 100, status: 'claimed' as const },
  { id: 6, amount: 150, status: 'claimed' as const },
]

const history = [
  { date: 'Jan 15, 2026', type: 'Review Approved', amount: '+₹250', status: 'credited' },
  { date: 'Dec 28, 2025', type: 'Review Approved', amount: '+₹250', status: 'credited' },
  { date: 'Dec 28, 2025', type: 'UPI Payout', amount: '-₹500', status: 'paid' },
  { date: 'Dec 01, 2025', type: 'Bonus Reward', amount: '+₹100', status: 'credited' },
]

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function RewardsPage() {
  const [upiId, setUpiId] = useState('')
  const [withdrawing, setWithdrawing] = useState(false)
  const totalBalance = 400

  const handleWithdraw = async () => {
    if (!upiId) { toast.error('Please enter your UPI ID'); return }
    setWithdrawing(true)
    await new Promise(r => setTimeout(r, 1500))
    toast.success('Withdrawal initiated! ₹400 will be credited within 24 hours.')
    setWithdrawing(false)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-stone-50 min-h-screen">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <Gift size={24} className="text-amber-700" />
            <h1 className="text-3xl font-black text-stone-900">Your Rewards</h1>
          </div>
          <p className="text-stone-500">Earn rewards for every verified review you submit</p>
        </motion.div>

        {/* Balance Card */}
        <motion.div variants={fadeUp} className="mb-8">
          <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-1">
              <DollarSign size={20} className="text-amber-700" />
              <p className="text-stone-500 text-sm font-medium">Total Balance</p>
            </div>
            <div className="text-5xl font-black text-amber-700 mb-4">₹{totalBalance}</div>
            <div className="flex items-center justify-center gap-6 text-sm text-stone-500 mb-6">
              <span className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-green-600" /> ₹150 Claimed
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-amber-700" /> ₹400 Available
              </span>
            </div>
            <div className="flex items-center gap-3 max-w-sm mx-auto">
              <input
                type="text"
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
                placeholder="Enter UPI ID (e.g. name@upi)"
                className="flex-1 px-4 py-2.5 rounded-xl text-sm border border-stone-300 bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              <button
                onClick={handleWithdraw}
                disabled={withdrawing}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-700 hover:bg-amber-800 text-white transition-colors disabled:opacity-60 flex-shrink-0"
              >
                {withdrawing ? <Clock size={16} /> : <ArrowDownToLine size={16} />}
                Withdraw
              </button>
            </div>
          </div>
        </motion.div>

        {/* Scratch Cards */}
        <motion.div variants={fadeUp} className="mb-10">
          <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
            <Gift size={18} className="text-amber-700" /> Scratch Cards
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {scratchCards.map(card => (
              <ScratchCard
                key={card.id}
                amount={card.amount}
                status={card.status}
                onReveal={() => toast.success(`You won ₹${card.amount}!`)}
              />
            ))}
          </div>
        </motion.div>

        {/* Payout History */}
        <motion.div variants={fadeUp}>
          <h2 className="text-lg font-bold text-stone-900 mb-4">Reward History</h2>
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50">
                    {['Date', 'Activity', 'Amount', 'Status'].map(h => (
                      <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.map((row, i) => (
                    <tr key={i} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-stone-500">{row.date}</td>
                      <td className="px-6 py-4 text-sm text-stone-700">{row.type}</td>
                      <td className={`px-6 py-4 text-sm font-bold ${row.amount.startsWith('+') ? 'text-green-700' : 'text-red-600'}`}>
                        {row.amount}
                      </td>
                      <td className="px-6 py-4">
                        {row.status === 'credited' ? (
                          <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 font-medium">
                            <CheckCircle size={11} className="text-green-600" /> Credited
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-medium">
                            <ArrowDownToLine size={11} className="text-amber-700" /> Paid Out
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
