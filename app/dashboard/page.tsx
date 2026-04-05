'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard, Users, TrendingUp, BarChart3, Plus, Search,
  Settings, LogOut, ChevronRight, Zap, DollarSign, ArrowUpRight,
  ArrowDownRight, Target, MoreVertical, Bell, X, Loader2,
  CheckCircle, Pencil, Trash2, Save, User, Mail, Phone, Building,
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Lead {
  id: string
  first_name: string
  last_name: string | null
  email: string | null
  phone: string | null
  company: string | null
  source: string | null
  status: string
  lead_score: number
  estimated_value: number | null
  notes: string | null
  created_at: string
}

interface Profile {
  id: string
  full_name: string | null
  email: string
  avatar_url: string | null
}

interface DashboardStats {
  totalLeads: number
  pipelineValue: number
  leadsThisMonth: number
  conversionRate: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    new: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    contacted: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    qualified: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    proposal_sent: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    negotiation: 'bg-pink-500/20 text-pink-300 border border-pink-500/30',
    won: 'bg-green-500/20 text-green-300 border border-green-500/30',
    lost: 'bg-red-500/20 text-red-300 border border-red-500/30',
  }
  return colors[status] || colors.new
}

const formatCurrency = (value: number) => {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`
  return `₹${value}`
}

const PIPELINE_STAGES = [
  { key: 'new', label: 'New Inquiry', tag: 'STAGE::01' },
  { key: 'contacted', label: 'Discovery Call', tag: 'STAGE::02' },
  { key: 'proposal_sent', label: 'Proposal Sent', tag: 'STAGE::03' },
  { key: 'negotiation', label: 'Negotiation', tag: 'STAGE::04' },
  { key: 'won', label: 'Closed Won', tag: 'STAGE::05' },
]

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, loading }: {
  icon: React.ElementType, label: string, value: string | number, loading?: boolean
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#111318] rounded-2xl p-6 border border-[#1E293B]/50 hover:border-[#F97316]/30 transition-colors"
  >
    <div className="flex items-center justify-between mb-4">
      <span className="text-[#94A3B8] text-sm font-mono tracking-wider">{label}</span>
      <Icon className="w-5 h-5 text-[#F97316]" />
    </div>
    {loading ? (
      <div className="h-8 w-24 bg-[#1E293B] rounded animate-pulse" />
    ) : (
      <div className="text-3xl font-bold text-[#F8FAFC]">{value}</div>
    )}
  </motion.div>
)

// ─── Add Lead Modal ───────────────────────────────────────────────────────────
const AddLeadModal = ({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) => {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    company: '', source: 'website', status: 'new', estimated_value: '', notes: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('leads').insert({
      profile_id: user.id,
      first_name: form.first_name,
      last_name: form.last_name || null,
      email: form.email || null,
      phone: form.phone || null,
      company: form.company || null,
      source: form.source,
      status: form.status,
      estimated_value: form.estimated_value ? parseFloat(form.estimated_value) : null,
      notes: form.notes || null,
    })

    if (!error) {
      setSuccess(true)
      setTimeout(() => { onSuccess(); onClose() }, 1200)
    }
    setLoading(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#111318] border border-[#F97316]/20 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {success ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-[#F97316] mx-auto mb-3" />
            <p className="text-white font-semibold">Lead added!</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Add New Lead</h2>
                <p className="text-[#64748B] text-sm font-mono mt-1">LEAD::CREATE</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-[#1E293B] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[#64748B]" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">First Name *</label>
                  <input required value={form.first_name} onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                    className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors"
                    placeholder="John" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">Last Name</label>
                  <input value={form.last_name} onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
                    className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors"
                    placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors"
                  placeholder="john@company.com" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">Phone</label>
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors"
                    placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">Company</label>
                  <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors"
                    placeholder="Acme Corp" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">Source</label>
                  <select value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))}
                    className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors">
                    <option value="website">Website</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="referral">Referral</option>
                    <option value="social_media">Social Media</option>
                    <option value="google_ads">Google Ads</option>
                    <option value="cold_outreach">Cold Outreach</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors">
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">Est. Deal Value (₹)</label>
                <input type="number" value={form.estimated_value} onChange={e => setForm(f => ({ ...f, estimated_value: e.target.value }))}
                  className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors"
                  placeholder="50000" />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">Notes</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={3}
                  className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors resize-none"
                  placeholder="Initial notes..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose}
                  className="flex-1 px-4 py-3 bg-[#1E293B] hover:bg-[#1E293B]/70 text-[#94A3B8] rounded-xl transition-colors text-sm font-semibold">
                  Cancel
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 px-4 py-3 bg-[#F97316] hover:bg-[#F97316]/90 text-black rounded-xl transition-colors text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" /> Add Lead</>}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

// ─── Edit Lead Modal ──────────────────────────────────────────────────────────
const EditLeadModal = ({ lead, onClose, onSuccess }: { lead: Lead, onClose: () => void, onSuccess: () => void }) => {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [form, setForm] = useState({
    first_name: lead.first_name,
    last_name: lead.last_name || '',
    email: lead.email || '',
    phone: lead.phone || '',
    company: lead.company || '',
    source: lead.source || 'website',
    status: lead.status,
    estimated_value: lead.estimated_value?.toString() || '',
    notes: lead.notes || '',
  })

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('leads').update({
      first_name: form.first_name,
      last_name: form.last_name || null,
      email: form.email || null,
      phone: form.phone || null,
      company: form.company || null,
      source: form.source,
      status: form.status,
      estimated_value: form.estimated_value ? parseFloat(form.estimated_value) : null,
      notes: form.notes || null,
    }).eq('id', lead.id)

    if (!error) { onSuccess(); onClose() }
    setLoading(false)
  }

  const handleDelete = async () => {
    setDeleting(true)
    await supabase.from('leads').delete().eq('id', lead.id)
    onSuccess()
    onClose()
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#111318] border border-[#F97316]/20 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {confirmDelete ? (
          <div className="text-center py-6">
            <Trash2 className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Delete Lead?</h3>
            <p className="text-[#64748B] text-sm mb-6">
              This will permanently delete <span className="text-white">{lead.first_name} {lead.last_name}</span>. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(false)}
                className="flex-1 px-4 py-3 bg-[#1E293B] text-[#94A3B8] rounded-xl text-sm font-semibold">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Trash2 className="w-4 h-4" /> Delete</>}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Edit Lead</h2>
                <p className="text-[#64748B] text-sm font-mono mt-1">LEAD::EDIT</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setConfirmDelete(true)}
                  className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <button onClick={onClose} className="p-2 hover:bg-[#1E293B] rounded-lg transition-colors">
                  <X className="w-5 h-5 text-[#64748B]" />
                </button>
              </div>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">First Name *</label>
                  <input required value={form.first_name} onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                    className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">Last Name</label>
                  <input value={form.last_name} onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
                    className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">Phone</label>
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">Company</label>
                  <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">Source</label>
                  <select value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))}
                    className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors">
                    <option value="website">Website</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="referral">Referral</option>
                    <option value="social_media">Social Media</option>
                    <option value="google_ads">Google Ads</option>
                    <option value="cold_outreach">Cold Outreach</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors">
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">Est. Deal Value (₹)</label>
                <input type="number" value={form.estimated_value} onChange={e => setForm(f => ({ ...f, estimated_value: e.target.value }))}
                  className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-1">Notes</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={3}
                  className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose}
                  className="flex-1 px-4 py-3 bg-[#1E293B] text-[#94A3B8] rounded-xl text-sm font-semibold">Cancel</button>
                <button type="submit" disabled={loading}
                  className="flex-1 px-4 py-3 bg-[#F97316] text-black rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save Changes</>}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

// ─── Dashboard View ───────────────────────────────────────────────────────────
const DashboardView = ({ stats, recentLeads, loading, onAddLead, onEditLead }: {
  stats: DashboardStats, recentLeads: Lead[], loading: boolean,
  onAddLead: () => void, onEditLead: (l: Lead) => void
}) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-[#F8FAFC]">Dashboard</h1>
        <p className="text-[#94A3B8] mt-2">Welcome back! Here&apos;s your CRM overview.</p>
      </div>
      <button onClick={onAddLead}
        className="px-4 py-2 bg-[#F97316] hover:bg-[#F97316]/90 text-black font-semibold rounded-full transition-colors flex items-center gap-2">
        <Plus className="w-4 h-4" /> Add Lead
      </button>
    </div>

    <div className="grid grid-cols-4 gap-4">
      <StatCard icon={Users} label="TOTAL LEADS" value={stats.totalLeads} loading={loading} />
      <StatCard icon={Target} label="PIPELINE VALUE" value={formatCurrency(stats.pipelineValue)} loading={loading} />
      <StatCard icon={TrendingUp} label="CONVERSION RATE" value={stats.conversionRate} loading={loading} />
      <StatCard icon={Zap} label="THIS MONTH" value={stats.leadsThisMonth} loading={loading} />
    </div>

    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 bg-[#111318] rounded-2xl p-6 border border-[#1E293B]/50">
        <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Recent Leads</h3>
        {loading ? (
          <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-14 bg-[#080A0F]/50 rounded-lg animate-pulse" />)}</div>
        ) : recentLeads.length === 0 ? (
          <div className="text-center py-10">
            <Users className="w-10 h-10 text-[#1E293B] mx-auto mb-3" />
            <p className="text-[#64748B] text-sm">No leads yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentLeads.slice(0, 5).map((lead, idx) => (
              <motion.div key={lead.id}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.07 }}
                className="flex items-center justify-between p-3 bg-[#080A0F]/50 rounded-lg hover:bg-[#080A0F] transition-colors border border-[#1E293B]/30 cursor-pointer"
                onClick={() => onEditLead(lead)}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F97316]/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#F97316]">{lead.first_name[0]}{lead.last_name?.[0] || ''}</span>
                  </div>
                  <div>
                    <p className="text-[#F8FAFC] text-sm font-semibold">{lead.first_name} {lead.last_name || ''}</p>
                    <p className="text-[#64748B] text-xs">{lead.company || lead.email || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(lead.status)}`}>{lead.status.replace('_', ' ')}</span>
                  {lead.estimated_value && <span className="text-[#F97316] text-xs font-mono">{formatCurrency(lead.estimated_value)}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="bg-[#111318] rounded-2xl p-6 border border-[#1E293B]/50">
          <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button onClick={onAddLead}
              className="w-full px-4 py-3 bg-[#F97316] hover:bg-[#F97316]/90 text-black font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Add Lead
            </button>
          </div>
        </div>
        <div className="bg-[#111318] rounded-2xl p-4 border border-[#1E293B]/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-mono text-[#64748B]">SYS::STATUS</span>
          </div>
          <p className="text-[#F8FAFC] text-sm font-semibold">All Systems Operational</p>
          <p className="text-[#64748B] text-xs mt-1">DB connected · Auth active</p>
        </div>
      </div>
    </div>
  </motion.div>
)

// ─── Leads View ───────────────────────────────────────────────────────────────
const LeadsView = ({ leads, loading, onAddLead, onEditLead }: {
  leads: Lead[], loading: boolean, onAddLead: () => void, onEditLead: (l: Lead) => void
}) => {
  const [search, setSearch] = useState('')
  const filtered = leads.filter(l =>
    `${l.first_name} ${l.last_name} ${l.email} ${l.company}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#F8FAFC]">Leads</h1>
          <p className="text-[#94A3B8] mt-2">{leads.length} total leads</p>
        </div>
        <button onClick={onAddLead}
          className="px-4 py-2 bg-[#F97316] hover:bg-[#F97316]/90 text-black font-semibold rounded-full transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      <div className="flex items-center gap-3 bg-[#111318] rounded-xl p-4 border border-[#1E293B]/50">
        <Search className="w-5 h-5 text-[#64748B]" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search leads..." className="flex-1 bg-transparent text-[#F8FAFC] placeholder-[#64748B] outline-none" />
        {search && <button onClick={() => setSearch('')} className="text-[#64748B] hover:text-white"><X className="w-4 h-4" /></button>}
      </div>

      <div className="bg-[#111318] rounded-2xl border border-[#1E293B]/50 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-[#080A0F] rounded-lg animate-pulse" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-[#1E293B] mx-auto mb-4" />
            <p className="text-[#64748B]">{search ? 'No leads match your search' : 'No leads yet'}</p>
            {!search && <button onClick={onAddLead} className="mt-4 px-4 py-2 bg-[#F97316] text-black rounded-full text-sm font-semibold">Add your first lead</button>}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-[#080A0F]/50 border-b border-[#1E293B]/50">
                {['Name', 'Email', 'Phone', 'Source', 'Status', 'Value', ''].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-[#94A3B8] text-sm font-semibold font-mono">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, idx) => (
                <motion.tr key={lead.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.04 }}
                  className="border-b border-[#1E293B]/50 hover:bg-[#111318]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F97316]/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-[#F97316]">{lead.first_name[0]}{lead.last_name?.[0] || ''}</span>
                      </div>
                      <span className="text-[#F8FAFC]">{lead.first_name} {lead.last_name || ''}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#94A3B8] text-sm">{lead.email || '—'}</td>
                  <td className="px-6 py-4 text-[#94A3B8] text-sm">{lead.phone || '—'}</td>
                  <td className="px-6 py-4"><span className="text-[#F97316] text-xs font-mono">{lead.source || '—'}</span></td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(lead.status)}`}>{lead.status.replace('_', ' ')}</span>
                  </td>
                  <td className="px-6 py-4 text-[#F97316] text-sm font-mono">
                    {lead.estimated_value ? formatCurrency(lead.estimated_value) : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => onEditLead(lead)}
                      className="p-1.5 hover:bg-[#F97316]/10 rounded-lg transition-colors group">
                      <Pencil className="w-4 h-4 text-[#64748B] group-hover:text-[#F97316]" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  )
}

// ─── Pipeline View (Drag & Drop) ──────────────────────────────────────────────
const PipelineView = ({ leads, loading, onUpdate }: { leads: Lead[], loading: boolean, onUpdate: () => void }) => {
  const supabase = createClient()
  const [localLeads, setLocalLeads] = useState<Lead[]>(leads)

  useEffect(() => { setLocalLeads(leads) }, [leads])

  const onDragEnd = async (result: DropResult) => {
    const { draggableId, destination } = result
    if (!destination) return

    const newStatus = destination.droppableId
    setLocalLeads(prev => prev.map(l => l.id === draggableId ? { ...l, status: newStatus } : l))
    await supabase.from('leads').update({ status: newStatus }).eq('id', draggableId)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#F8FAFC]">Pipeline</h1>
        <p className="text-[#94A3B8] mt-2">Drag cards between columns to update status</p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-5 gap-4 pb-4 overflow-x-auto">
          {PIPELINE_STAGES.map((stage, idx) => {
            const stageLeads = localLeads.filter(l => l.status === stage.key)
            const stageValue = stageLeads.reduce((s, l) => s + (l.estimated_value || 0), 0)
            return (
              <motion.div key={stage.key}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
                className="bg-[#080A0F] rounded-xl p-4 min-h-[500px] border border-[#1E293B]/50 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs font-mono text-[#F97316] mb-1">{stage.tag}</p>
                    <h3 className="font-semibold text-[#F8FAFC] text-sm">{stage.label}</h3>
                  </div>
                  <span className="bg-[#F97316]/20 text-[#F97316] text-xs font-bold px-2 py-1 rounded-full">{stageLeads.length}</span>
                </div>
                {stageValue > 0 && <p className="text-xs text-[#64748B] font-mono mb-3">{formatCurrency(stageValue)}</p>}

                <Droppable droppableId={stage.key}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 space-y-3 rounded-lg transition-colors ${snapshot.isDraggingOver ? 'bg-[#F97316]/5' : ''}`}
                    >
                      {loading ? (
                        <div className="h-20 bg-[#111318] rounded-xl animate-pulse" />
                      ) : stageLeads.length === 0 && !snapshot.isDraggingOver ? (
                        <div className="text-center py-8 text-[#1E293B]">
                          <p className="text-xs font-mono">EMPTY</p>
                        </div>
                      ) : stageLeads.map((lead, i) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={i}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-[#111318] rounded-xl p-3 border transition-colors cursor-grab active:cursor-grabbing ${
                                snapshot.isDragging ? 'border-[#F97316]/50 shadow-lg shadow-[#F97316]/10' : 'border-[#1E293B]/50 hover:border-[#F97316]/30'
                              }`}
                            >
                              <p className="text-[#F8FAFC] font-semibold text-sm">{lead.first_name} {lead.last_name || ''}</p>
                              <p className="text-[#94A3B8] text-xs mt-0.5">{lead.company || lead.email || '—'}</p>
                              {lead.estimated_value && (
                                <p className="text-[#F97316] font-bold text-sm mt-2">{formatCurrency(lead.estimated_value)}</p>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </motion.div>
            )
          })}
        </div>
      </DragDropContext>
    </motion.div>
  )
}

// ─── Analytics View ───────────────────────────────────────────────────────────
const AnalyticsView = ({ leads, loading }: { leads: Lead[], loading: boolean }) => {
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date()
    d.setMonth(d.getMonth() - (5 - i))
    const month = d.toLocaleString('default', { month: 'short' })
    const count = leads.filter(l => {
      const ld = new Date(l.created_at)
      return ld.getMonth() === d.getMonth() && ld.getFullYear() === d.getFullYear()
    }).length
    return { month, leads: count }
  })

  const sourceData = Object.entries(
    leads.reduce((acc: Record<string, number>, l) => {
      const s = l.source || 'other'
      acc[s] = (acc[s] || 0) + 1
      return acc
    }, {})
  ).map(([source, count]) => ({ source, count }))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#F8FAFC]">Analytics</h1>
        <p className="text-[#94A3B8] mt-2">Real data from your CRM</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Users} label="TOTAL LEADS" value={leads.length} loading={loading} />
        <StatCard icon={Target} label="WON DEALS" value={leads.filter(l => l.status === 'won').length} loading={loading} />
        <StatCard icon={DollarSign} label="PIPELINE VALUE" value={formatCurrency(leads.reduce((s, l) => s + (l.estimated_value || 0), 0))} loading={loading} />
        <StatCard icon={TrendingUp} label="CONVERSION" value={leads.length ? `${((leads.filter(l => l.status === 'won').length / leads.length) * 100).toFixed(1)}%` : '0%'} loading={loading} />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#111318] rounded-2xl p-6 border border-[#1E293B]/50">
          <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Leads Over Time</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="month" stroke="#64748B" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748B" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#111318', border: '1px solid #1E293B', borderRadius: '8px', color: '#F8FAFC' }} />
              <Line type="monotone" dataKey="leads" stroke="#F97316" dot={{ fill: '#F97316' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-[#111318] rounded-2xl p-6 border border-[#1E293B]/50">
          <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4">Leads by Source</h3>
          {sourceData.length === 0 ? (
            <div className="flex items-center justify-center h-[280px] text-[#64748B] text-sm">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="source" stroke="#64748B" style={{ fontSize: '11px' }} />
                <YAxis stroke="#64748B" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#111318', border: '1px solid #1E293B', borderRadius: '8px', color: '#F8FAFC' }} />
                <Bar dataKey="count" fill="#F97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Settings View ────────────────────────────────────────────────────────────
const SettingsView = ({ profile, onUpdate }: { profile: Profile | null, onUpdate: () => void }) => {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [fullName, setFullName] = useState(profile?.full_name || '')

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('profiles').update({ full_name: fullName }).eq('id', user.id)
    setSuccess(true)
    onUpdate()
    setLoading(false)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-4xl font-bold text-[#F8FAFC]">Settings</h1>
        <p className="text-[#94A3B8] mt-2">Manage your account</p>
      </div>

      <div className="bg-[#111318] rounded-2xl p-6 border border-[#1E293B]/50">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-[#F97316]" />
          <h2 className="text-lg font-semibold text-white">Profile</h2>
        </div>

        {success && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-mono">
            ✓ Profile updated successfully
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-2">Full Name</label>
            <input value={fullName} onChange={e => setFullName(e.target.value)}
              className="w-full bg-[#080A0F] border border-[#1E293B] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors"
              placeholder="Your full name" />
          </div>
          <div>
            <label className="block text-xs font-mono text-[#64748B] uppercase tracking-wider mb-2">Email</label>
            <input value={profile?.email || ''} disabled
              className="w-full bg-[#080A0F]/50 border border-[#1E293B]/50 rounded-xl px-4 py-3 text-[#64748B] text-sm cursor-not-allowed" />
            <p className="text-xs text-[#64748B] mt-1 font-mono">Email cannot be changed here</p>
          </div>
          <button type="submit" disabled={loading}
            className="px-6 py-3 bg-[#F97316] hover:bg-[#F97316]/90 text-black font-semibold rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save Changes</>}
          </button>
        </form>
      </div>

      <div className="bg-[#111318] rounded-2xl p-6 border border-[#1E293B]/50">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5 text-[#F97316]" />
          <h2 className="text-lg font-semibold text-white">Email Notifications</h2>
        </div>
        <p className="text-[#64748B] text-sm">Welcome emails are automatically sent to new leads via Resend when they submit the contact form.</p>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-mono text-green-400">RESEND::ACTIVE</span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ activeView, setActiveView, userEmail, userName }: {
  activeView: string, setActiveView: (v: string) => void, userEmail: string, userName: string
}) => {
  const router = useRouter()
  const supabase = createClient()
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'pipeline', label: 'Pipeline', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ]

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const initials = (userName || userEmail).slice(0, 2).toUpperCase()

  return (
    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 w-60 h-screen bg-[#080A0F] border-r border-[#1E293B]/50 flex flex-col">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center">
          <span className="text-black font-bold text-lg">K</span>
        </div>
        <span className="text-xl font-bold text-[#F8FAFC]">KINETIC</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = activeView === item.id
          return (
            <motion.button key={item.id} onClick={() => setActiveView(item.id)} whileHover={{ x: 4 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive ? 'bg-[#111318] border-l-4 border-[#F97316] text-[#F97316]' : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#111318]/50'
              }`}>
              <Icon className="w-5 h-5" />
              <span className="font-semibold text-sm">{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
            </motion.button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[#1E293B]/50 space-y-2">
        <button onClick={() => setActiveView('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeView === 'settings' ? 'bg-[#111318] text-[#F97316]' : 'bg-[#111318]/50 hover:bg-[#111318] text-[#F8FAFC]'
          }`}>
          <Settings className="w-5 h-5" />
          <span className="text-sm font-semibold">Settings</span>
        </button>
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-[#F97316]/20 flex items-center justify-center">
            <span className="text-xs font-bold text-[#F97316]">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[#F8FAFC] text-sm font-semibold truncate">{userName || userEmail}</p>
            <p className="text-[#64748B] text-xs">Admin</p>
          </div>
        </div>
        <button onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#1E293B]/50 hover:bg-[#1E293B] text-[#94A3B8] rounded-lg transition-colors text-sm">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </motion.div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function DashboardApp() {
  const supabase = createClient()
  const [activeView, setActiveView] = useState('dashboard')
  const [showAddLead, setShowAddLead] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0, pipelineValue: 0, leadsThisMonth: 0, conversionRate: '0%',
  })

  const fetchData = useCallback(async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const [{ data: leadsData }, { data: profileData }] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('profiles').select('*').eq('id', user.id).single(),
    ])

    if (leadsData) {
      setLeads(leadsData)
      const now = new Date()
      const thisMonth = leadsData.filter(l => {
        const d = new Date(l.created_at)
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      })
      const won = leadsData.filter(l => l.status === 'won')
      setStats({
        totalLeads: leadsData.length,
        pipelineValue: leadsData.reduce((s, l) => s + (l.estimated_value || 0), 0),
        leadsThisMonth: thisMonth.length,
        conversionRate: leadsData.length ? `${((won.length / leadsData.length) * 100).toFixed(1)}%` : '0%',
      })
    }
    if (profileData) setProfile(profileData)
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchData() }, [fetchData])

  const views: Record<string, React.ReactNode> = {
    dashboard: <DashboardView stats={stats} recentLeads={leads} loading={loading} onAddLead={() => setShowAddLead(true)} onEditLead={setEditingLead} />,
    leads: <LeadsView leads={leads} loading={loading} onAddLead={() => setShowAddLead(true)} onEditLead={setEditingLead} />,
    pipeline: <PipelineView leads={leads} loading={loading} onUpdate={fetchData} />,
    analytics: <AnalyticsView leads={leads} loading={loading} />,
    settings: <SettingsView profile={profile} onUpdate={fetchData} />,
  }

  return (
    <div className="flex bg-[#080A0F] min-h-screen text-[#F8FAFC]">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        userEmail={profile?.email || ''}
        userName={profile?.full_name || ''}
      />

      <div className="flex-1 ml-60">
        <div className="bg-[#080A0F] border-b border-[#1E293B]/50 px-8 py-5 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#F8FAFC]">CRM Dashboard</h2>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-[#111318] rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-[#94A3B8]" />
              </button>
              <button onClick={() => setActiveView('settings')} className="p-2 hover:bg-[#111318] rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-[#94A3B8]" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeView}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {views[activeView]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showAddLead && <AddLeadModal onClose={() => setShowAddLead(false)} onSuccess={fetchData} />}
        {editingLead && <EditLeadModal lead={editingLead} onClose={() => setEditingLead(null)} onSuccess={fetchData} />}
      </AnimatePresence>
    </div>
  )
}