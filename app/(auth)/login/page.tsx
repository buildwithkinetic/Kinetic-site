"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <main className="min-h-screen bg-[#080A0F] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(249,115,22,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(circle, #F97316, transparent)" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="font-bold text-2xl text-white tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            KINETIC<span className="text-[#F97316]">.</span>
          </a>
          <p className="text-white/30 text-sm mt-2 font-mono tracking-widest">SYSTEM::ACCESS</p>
        </div>

        {/* Card */}
        <div className="bg-[#111318] border border-[#F97316]/10 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            Welcome back
          </h1>
          <p className="text-white/40 text-sm mb-8">Sign in to your Kinetic dashboard</p>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono">
              ERROR:: {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-white/30 tracking-widest uppercase mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full bg-white/[0.03] border border-[#F97316]/12 rounded-xl pl-11 pr-4 py-3
                    text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#F97316]/40 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-white/30 tracking-widest uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/[0.03] border border-[#F97316]/12 rounded-xl pl-11 pr-4 py-3
                    text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#F97316]/40 transition-all"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#F97316] text-black font-semibold py-3 rounded-xl
                hover:bg-[#F97316]/90 transition-colors flex items-center justify-center gap-2
                disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </motion.button>
          </form>


        </div>

        <p className="text-center font-mono text-xs text-white/10 mt-6">
          © 2026 Kinetic // All Systems Operational
        </p>
      </motion.div>
    </main>
  )
}