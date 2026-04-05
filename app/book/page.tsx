"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { useSearchParams, useRouter } from "next/navigation"

// ─── Offer Data ───────────────────────────────────────────────────────────────

interface Offer {
  id: string
  name: string
  problem: string
  price: number
  priceDisplay: string
  timeline: string
  badge?: string
}

const OFFERS: Offer[] = [
  {
    id: "quick-win-audit",
    name: "The Quick Win Audit",
    problem: "Don't know where to start?",
    price: 8000,
    priceDisplay: "Book a call — I'll discuss pricing",
    timeline: "Delivered in 48 hours",
    badge: "Best Starting Point",
  },
  {
    id: "visibility-fix",
    name: "The Visibility Fix",
    problem: "People can't find you online",
    price: 25000,
    priceDisplay: "Book a call — I'll discuss pricing",
    timeline: "Live in 2 weeks",
  },
  {
    id: "lead-capture",
    name: "The Lead Capture System",
    problem: "Losing leads you already have",
    price: 40000,
    priceDisplay: "Book a call — I'll discuss pricing",
    timeline: "Live in 3 weeks",
    badge: "Most Popular",
  },
  {
    id: "repeat-revenue",
    name: "The Repeat Revenue Engine",
    problem: "Clients come once and disappear",
    price: 30000,
    priceDisplay: "Book a call — I'll discuss pricing",
    timeline: "Live in 2 weeks",
  },
  {
    id: "full-growth-system",
    name: "The Full Growth System",
    problem: "Fix everything at once",
    price: 75000,
    priceDisplay: "Book a call — I'll discuss pricing",
    timeline: "Live in 4 weeks",
    badge: "Best Value",
  },
  {
    id: "no-website",
    name: "I Don't Have a Website",
    problem: "Starting completely from scratch",
    price: 25000,
    priceDisplay: "Book a call — I'll discuss pricing",
    timeline: "First presence live in 2 weeks",
    badge: "Start Here",
  },
  {
    id: "custom-build",
    name: "Custom Build",
    problem: "My business needs something specific",
    price: 0,
    priceDisplay: "Scoped per project",
    timeline: "Free discovery call first",
    badge: "Tailored",
  },
]

// ─── Form State ───────────────────────────────────────────────────────────────

interface FormData {
  clientName: string
  businessName: string
  clientEmail: string
  clientPhone: string
  websiteUrl: string
  country: string
  state: string
  challenge: string
}

interface FormErrors {
  clientName?: string
  businessName?: string
  clientEmail?: string
  clientPhone?: string
  country?: string
}

const EMPTY_FORM: FormData = {
  clientName: "",
  businessName: "",
  clientEmail: "",
  clientPhone: "",
  websiteUrl: "",
  country: "",
  state: "",
  challenge: "",
}

// ─── Input class ─────────────────────────────────────────────────────────────

const inputBase =
  "w-full px-4 py-3.5 rounded-xl border bg-[#E5E1D9] text-[#0F0E0C] text-[16px] focus:outline-none transition-colors duration-200 min-h-[50px]"
const inputNormal = inputBase + " border-black/[0.12] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/20"
const inputError = inputBase + " border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-200"

// ─── Component ────────────────────────────────────────────────────────────────

function BookPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [step, setStep] = useState<1 | 2>(1)
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Pre-select offer from ?offer= query param
  useEffect(() => {
    const offerParam = searchParams.get("offer")
    if (offerParam) {
      const match = OFFERS.find((o) => o.id === offerParam)
      if (match) setSelectedOffer(match)
    }
  }, [searchParams])

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = useCallback((): boolean => {
    const errs: FormErrors = {}
    if (!formData.clientName.trim()) errs.clientName = "Full name is required"
    if (!formData.businessName.trim()) errs.businessName = "Business name is required"
    if (!formData.clientEmail.trim()) errs.clientEmail = "Email address is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) errs.clientEmail = "Enter a valid email address"
    if (!formData.clientPhone.trim()) errs.clientPhone = "Phone number is required"
    if (!formData.country.trim()) errs.country = "Country is required"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }, [formData])

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOffer) return
    if (!validate()) return

    setSubmitting(true)
    setSubmitError("")

    try {
      const res = await fetch("/api/send-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionType: "booking",
          clientName: formData.clientName,
          businessName: formData.businessName,
          clientEmail: formData.clientEmail,
          clientPhone: formData.clientPhone,
          city: formData.country + (formData.state ? `, ${formData.state}` : ""),
          offerName: selectedOffer.name,
          websiteUrl: formData.websiteUrl,
          challenge: formData.challenge,
        }),
      })

      const data = await res.json()

      if (data.success) {
        router.push(
          `/booking-confirmed?offer=${selectedOffer.id}&name=${encodeURIComponent(formData.clientName)}`
        )
      } else {
        setSubmitError(
          `Something went wrong sending your confirmation email. Please email us directly at hello@buildwithkinetic.org`
        )
        setSubmitting(false)
      }
    } catch {
      setSubmitError(
        `Something went wrong sending your confirmation email. Please email us directly at hello@buildwithkinetic.org`
      )
      setSubmitting(false)
    }
  }

  // ── Field change ─────────────────────────────────────────────────────────────
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <main style={{ background: "var(--bg)" }} className="min-h-screen text-[#0F0E0C]">

      <Navbar />

      {/* ── Progress Bar ── */}
      <div style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }} className="fixed top-16 left-0 right-0 z-40 h-12">
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center gap-6">
          <button
            onClick={() => step === 2 && setStep(1)}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              step === 1 ? "text-[#3B82F6]" : "text-[#0F0E0C] cursor-pointer hover:text-[#3B82F6]"
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 1 ? "bg-[#0F0E0C] text-white" : "bg-black/10 text-[#6B6560]"
            }`}>
              {step > 1 ? "✓" : "1"}
            </span>
            Choose Offer
          </button>
          <div className="flex-1 h-px bg-black/10 max-w-[60px]" />
          <div className={`flex items-center gap-2 text-sm font-medium ${
            step === 2 ? "text-[#3B82F6]" : "text-[#6B6560]"
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 2 ? "bg-[#0F0E0C] text-white" : "bg-black/10 text-[#6B6560]"
            }`}>
              2
            </span>
            Your Details
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* ══ STEP 1 — Choose Offer ══ */}
          {step === 1 && (
            <div>
              <div className="mb-10 text-center">
                <p className="text-xs font-mono text-[#3B82F6] tracking-widest uppercase mb-3">Step 1 of 2</p>
                <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 400, letterSpacing: "-1.5px", color: "var(--t1)", marginBottom: "12px", lineHeight: 1.05 }}>
                  What Would You Like To Book?
                </h1>
                <p className="text-[#6B6560] text-lg max-w-xl mx-auto">
                  Select the offer that fits your situation. Not sure?{" "}
                  <Link href="/work-with-us/quick-win-audit#quiz" className="text-[#3B82F6] underline underline-offset-2 hover:no-underline">
                    Start with the Quick Win Audit.
                  </Link>
                </p>
              </div>

              {/* Offer Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {OFFERS.map((offer) => {
                  const isSelected = selectedOffer?.id === offer.id
                  return (
                    <button
                      key={offer.id}
                      onClick={() => setSelectedOffer(offer)}
                      style={{ background: isSelected ? "rgba(232,93,4,0.04)" : "var(--bg-card)" }} className={`relative text-left w-full p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-md ${
                        isSelected
                          ? "border-[#3B82F6] shadow-none"
                          : "border-black/[0.12] hover:border-[#3B82F6]"
                      }`}
                    >
                      {/* Badge */}
                      {offer.badge && (
                        <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-mono font-bold tracking-widest uppercase rounded-full ${
                          offer.badge === "Most Popular"
                            ? "bg-[#0F0E0C] text-white"
                            : offer.badge === "Best Value"
                            ? "bg-[#0F0E0C] text-white"
                            : "bg-[#3B82F6]/10 text-[#3B82F6]"
                        }`}>
                          {offer.badge}
                        </span>
                      )}

                      {/* Selected checkmark */}
                      {isSelected && (
                        <span className="absolute top-4 left-4 w-5 h-5 bg-[#3B82F6] rounded-full flex items-center justify-center">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      )}

                      <div className={`mb-3 ${isSelected ? "pl-7" : ""}`}>
                        <h3 style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 700, color: "var(--t1)", lineHeight: 1.3, marginBottom: "4px" }}>{offer.name}</h3>
                        <p className="text-[#6B6560] text-sm">{offer.problem}</p>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-[#9E9890]">{offer.timeline}</span>
                      </div>
                      {["visibility-fix","lead-capture","repeat-revenue","full-growth-system","no-website"].includes(offer.id) && (
                        <p className="text-[10px] text-green-700 font-semibold flex items-center gap-1">
                          <span>✓</span> Website included free
                        </p>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* No Website recommendation banner */}
              {selectedOffer?.id === "no-website" && (
                <div className="mb-6 bg-[#0F0E0C] rounded-2xl p-6 border-2 border-[#3B82F6]">
                  <p className="text-xs font-mono text-[#3B82F6] tracking-widest uppercase mb-2">Recommended path for you</p>
                  <h4 className="text-white font-black text-base mb-2">Start with The Visibility Fix</h4>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    No website? That&apos;s where Kinetic starts. You&apos;ll get a fast, conversion-focused website + Google Business Profile + local SEO — everything needed to show up and get found. Live in 2 weeks.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-3 py-1.5 bg-white/10 text-white/70 rounded-full">Website built for you</span>
                    <span className="text-xs px-3 py-1.5 bg-white/10 text-white/70 rounded-full">Google Maps ready</span>
                    <span className="text-xs px-3 py-1.5 bg-white/10 text-white/70 rounded-full">Mobile-first</span>
                    <span className="text-xs px-3 py-1.5 bg-white/10 text-white/70 rounded-full">SEO foundation</span>
                  </div>
                  <p className="text-white/40 text-xs">
                    Want the full setup (website + leads + automation)?{" "}
                    <button onClick={() => setSelectedOffer(OFFERS.find(o => o.id === "full-growth-system") ?? null)}
                      className="text-[#3B82F6] underline hover:no-underline">
                      Select the Full Growth System instead →
                    </button>
                  </p>
                </div>
              )}

              {/* Custom Build banner */}
              {selectedOffer?.id === "custom-build" && (
                <div className="mb-6 bg-[#0F0E0C] rounded-2xl p-6 border-2 border-[#3B82F6]">
                  <p className="text-xs font-mono text-[#3B82F6] tracking-widest uppercase mb-2">Tailored for your business</p>
                  <h4 className="text-white font-black text-base mb-2">Custom Build — Free Discovery Call First</h4>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    Custom builds are scoped in a free 30-minute call before any payment is made. Click below to go to the Custom Build page and fill in your project details.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-3 py-1.5 bg-white/10 text-white/70 rounded-full">Free discovery call</span>
                    <span className="text-xs px-3 py-1.5 bg-white/10 text-white/70 rounded-full">Fixed price upfront</span>
                    <span className="text-xs px-3 py-1.5 bg-white/10 text-white/70 rounded-full">Written brief in 48 hrs</span>
                  </div>
                  <Link
                    href="/work-with-us/custom-build#discovery-form"
                    className="inline-block px-5 py-2.5 bg-[#3B82F6] text-white font-bold rounded-xl text-sm hover:bg-[#F0E8D8] transition-colors"
                  >
                    Go to Custom Build page →
                  </Link>
                </div>
              )}

              {/* Continue Button */}
              <div className="text-center">
                {selectedOffer?.id === "custom-build" ? (
                  <Link
                    href="/work-with-us/custom-build#discovery-form"
                    className="inline-flex items-center gap-2 px-10 py-4 border-2 border-[#0F0F0E] text-[#0F0F0E] font-bold rounded-full text-lg hover:bg-[#0F0F0E] hover:text-white transition-colors duration-200 shadow-lg shadow-[#3B82F6]/20"
                  >
                    <img src="/icons/meet.svg" alt="" width={17} height={17} style={{ borderRadius: '3px', flexShrink: 0 }} />
                    Book Free Discovery Call
                  </Link>
                ) : (
                <button
                  onClick={() => selectedOffer && setStep(2)}
                  disabled={!selectedOffer}
                  className="px-10 py-4 border-2 border-[#0F0F0E] text-[#0F0F0E] font-bold rounded-full text-lg hover:bg-[#0F0F0E] hover:text-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#3B82F6]/20"
                >
                  Continue →
                </button>
                )}
                <p className="text-sm text-[#9E9890] mt-4">
                  Not sure which offer fits?{" "}
                  <Link href="/work-with-us/quick-win-audit#quiz" className="text-[#3B82F6] hover:underline">
                    Take the 3-minute quiz →
                  </Link>
                </p>
              </div>
            </div>
          )}

          {/* ══ STEP 2 — Details Form ══ */}
          {step === 2 && selectedOffer && (
            <div className="max-w-2xl mx-auto">

              {/* Selected Offer Summary Bar */}
              <div className="mb-8 p-4 bg-[#0F0E0C] rounded-2xl flex items-center justify-between gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="text-white/40 hover:text-white text-sm transition-colors flex-shrink-0"
                >
                  ← Change
                </button>
                <div className="text-center flex-1">
                  <p className="text-white/60 text-xs font-mono uppercase tracking-widest mb-1">You selected</p>
                  <p className="text-white font-bold text-base">{selectedOffer.name}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[#3B82F6] font-black text-xl">{selectedOffer.priceDisplay}</p>
                  <p className="text-white/40 text-xs">{selectedOffer.timeline}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xs font-mono text-[#3B82F6] tracking-widest uppercase mb-3">Step 2 of 2</p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 400, letterSpacing: "-1px", color: "var(--t1)", marginBottom: "8px" }}>Your Details</h2>
                <p className="text-[#6B6560]">Fill this in once. Payment details go to your email immediately after.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-mono text-[#6B6560] tracking-widest uppercase mb-2">
                    Full Name <span className="text-[#3B82F6]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => handleChange("clientName", e.target.value)}
                    placeholder="Your full name"
                    className={errors.clientName ? inputError : inputNormal}
                  />
                  {errors.clientName && <p className="text-red-500 text-xs mt-1.5">{errors.clientName}</p>}
                </div>

                {/* Business Name */}
                <div>
                  <label className="block text-xs font-mono text-[#6B6560] tracking-widest uppercase mb-2">
                    Business Name <span className="text-[#3B82F6]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleChange("businessName", e.target.value)}
                    placeholder="Your business or clinic name"
                    className={errors.businessName ? inputError : inputNormal}
                  />
                  {errors.businessName && <p className="text-red-500 text-xs mt-1.5">{errors.businessName}</p>}
                </div>

                {/* Email + Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-[#6B6560] tracking-widest uppercase mb-2">
                      Email Address <span className="text-[#3B82F6]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => handleChange("clientEmail", e.target.value)}
                      placeholder="you@company.com"
                      className={errors.clientEmail ? inputError : inputNormal}
                    />
                    {errors.clientEmail && <p className="text-red-500 text-xs mt-1.5">{errors.clientEmail}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#6B6560] tracking-widest uppercase mb-2">
                      Phone Number <span className="text-[#3B82F6]">*</span>
                      <span className="text-[#9E9890] normal-case tracking-normal font-sans ml-1">(WhatsApp preferred)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.clientPhone}
                      onChange={(e) => handleChange("clientPhone", e.target.value)}
                      placeholder="+91 98765 43210"
                      className={errors.clientPhone ? inputError : inputNormal}
                    />
                    {errors.clientPhone && <p className="text-red-500 text-xs mt-1.5">{errors.clientPhone}</p>}
                  </div>
                </div>

                {/* Website URL */}
                <div>
                  <label className="block text-xs font-mono text-[#6B6560] tracking-widest uppercase mb-2">
                    Your Current Website
                    <span className="text-[#9E9890] normal-case tracking-normal font-sans ml-1">(if any — optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.websiteUrl}
                    onChange={(e) => handleChange("websiteUrl", e.target.value)}
                    placeholder="https://yourbusiness.com"
                    className={inputNormal}
                  />
                </div>

                {/* Country + State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#6B6560] tracking-widest uppercase mb-2">
                      Country <span className="text-[#3B82F6]">*</span>
                    </label>
                    <input
                      type="text"
                      list="country-list"
                      value={formData.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      placeholder="Search or select country"
                      autoComplete="off"
                      className={errors.country ? inputError : inputNormal}
                    />
                    <datalist id="country-list">
                      <option value="India" />
                      <option value="United States" />
                      <option value="United Kingdom" />
                      <option value="Canada" />
                      <option value="Australia" />
                      <option value="UAE" />
                      <option value="Singapore" />
                      <option value="Germany" />
                      <option value="France" />
                      <option value="Netherlands" />
                      <option value="Sweden" />
                      <option value="New Zealand" />
                      <option value="South Africa" />
                      <option value="Bangladesh" />
                      <option value="Sri Lanka" />
                      <option value="Nepal" />
                      <option value="Pakistan" />
                      <option value="Malaysia" />
                    </datalist>
                    {errors.country && <p className="text-red-500 text-xs mt-1.5">{errors.country}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#6B6560] tracking-widest uppercase mb-2">
                      State / Province
                      <span className="text-[#9E9890] normal-case tracking-normal font-sans ml-1">(optional)</span>
                    </label>
                    {formData.country === "India" ? (
                      <>
                        <input
                          type="text"
                          list="india-states"
                          value={formData.state}
                          onChange={(e) => handleChange("state", e.target.value)}
                          placeholder="Search or select state"
                          autoComplete="off"
                          className={inputNormal}
                        />
                        <datalist id="india-states">
                          <option value="West Bengal" />
                          <option value="Maharashtra" />
                          <option value="Delhi" />
                          <option value="Karnataka" />
                          <option value="Tamil Nadu" />
                          <option value="Gujarat" />
                          <option value="Rajasthan" />
                          <option value="Uttar Pradesh" />
                          <option value="Andhra Pradesh" />
                          <option value="Telangana" />
                          <option value="Punjab" />
                          <option value="Haryana" />
                          <option value="Bihar" />
                          <option value="Odisha" />
                          <option value="Kerala" />
                          <option value="Assam" />
                          <option value="Jharkhand" />
                          <option value="Chhattisgarh" />
                          <option value="Madhya Pradesh" />
                          <option value="Himachal Pradesh" />
                          <option value="Uttarakhand" />
                          <option value="Goa" />
                          <option value="Tripura" />
                          <option value="Manipur" />
                          <option value="Meghalaya" />
                          <option value="Nagaland" />
                          <option value="Arunachal Pradesh" />
                          <option value="Mizoram" />
                          <option value="Sikkim" />
                        </datalist>
                      </>
                    ) : (
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleChange("state", e.target.value)}
                        placeholder="State or province"
                        className={inputNormal}
                      />
                    )}
                  </div>
                </div>

                {/* Challenge */}
                <div>
                  <label className="block text-xs font-mono text-[#6B6560] tracking-widest uppercase mb-2">
                    Your Biggest Challenge Right Now
                    <span className="text-[#9E9890] normal-case tracking-normal font-sans ml-1">(optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.challenge}
                    onChange={(e) => handleChange("challenge", e.target.value)}
                    placeholder="Tell me what's not working digitally — the more specific, the better"
                    className={`${inputNormal} resize-none`}
                    style={{ minHeight: "110px" }}
                  />
                </div>

                {/* Order Summary */}
                <div className="bg-[#0F0E0C] rounded-2xl p-6 mt-6">
                  <p className="text-white/50 text-xs font-mono uppercase tracking-widest mb-4">Order Summary</p>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white/70 text-sm mb-0.5">You&apos;re booking:</p>
                      <p className="text-white font-bold">{selectedOffer.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/50 text-xs mb-0.5">Amount</p>
                      <p className="text-[#3B82F6] font-black text-2xl">{selectedOffer.priceDisplay}</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs font-mono mb-4">{selectedOffer.timeline}</p>
                  <div className="border-t border-white/10 pt-4 space-y-2">
                    {[
                      "Payment instructions will be emailed to you immediately",
                      "Kinetic confirms within 2 hours of payment",
                      "Work begins within 24 hours of confirmation",
                    ].map((point, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[#3B82F6] font-black text-sm flex-shrink-0 mt-0.5">✓</span>
                        <p className="text-white/60 text-sm">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Error */}
                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm">{submitError}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#3B82F6] text-white font-bold rounded-2xl text-lg hover:bg-[#F0E8D8] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#3B82F6]/20 min-h-[56px]"
                >
                  {submitting ? "Sending…" : "Confirm Booking →"}
                </button>

                <div className="text-center space-y-1">
                  <p className="text-xs text-[#9E9890]">
                    Kinetic will contact you within 24 hours to confirm next steps.
                  </p>
                  <p className="text-xs text-[#9E9890]">
                    No card details required. No automatic charges.
                  </p>
                </div>

              </form>
            </div>
          )}

        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{ background: "var(--bg)" }} className="py-8 px-6 border-t border-black/[0.06]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-lg font-black tracking-tight text-[#0F0E0C]">
            KINETIC<span className="text-[#3B82F6]">.</span>
          </Link>
          <nav className="flex flex-wrap gap-6 text-sm text-[#6B6560]">
            <Link href="/work-with-us" className="hover:text-[#3B82F6] transition-colors">Growth Offers</Link>
            <Link href="/work/sheknowmics" className="hover:text-[#3B82F6] transition-colors">Work</Link>
            <Link href="/contact" className="hover:text-[#3B82F6] transition-colors">Contact</Link>
          </nav>
          <p className="text-xs font-mono text-[#6B6560]">© 2026 KINETIC</p>
        </div>
      </footer>

    </main>
  )
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <main style={{ background: "var(--bg)" }} className="min-h-screen flex items-center justify-center">
        <div className="text-[#6B6560] font-mono text-sm">Loading...</div>
      </main>
    }>
      <BookPageContent />
    </Suspense>
  )
}
