"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useProfileStore } from "@/lib/profileStore";
import { useAuthStore } from "@/lib/authStore";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { LocationPicker } from "@/components/onboarding/LocationPicker";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  GENDER_OPTIONS,
  SOCIAL_CATEGORY_OPTIONS,
  AREA_TYPE_OPTIONS,
  LANGUAGE_OPTIONS,
  BUSINESS_STAGE_OPTIONS,
  ENTERPRISE_TYPE_OPTIONS,
  FUNDING_PURPOSE_OPTIONS
} from "@/lib/profileConstants";
import { 
  User, 
  Building2, 
  IndianRupee, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { EntrepreneurProfile, SocialCategory, BusinessStage, EnterpriseType, AreaType, SupportedLanguage } from "@niti-ai/types";

const STEPS = [
  { id: 1, title: "Personal", icon: User },
  { id: 2, title: "Enterprise", icon: Building2 },
  { id: 3, title: "Capital", icon: IndianRupee },
  { id: 4, title: "Location", icon: MapPin },
  { id: 5, title: "Review", icon: CheckCircle2 }
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, setOnboarded } = useAuthStore();
  const { 
    step, 
    totalSteps, 
    nextStep, 
    prevStep, 
    profile, 
    updatePersonal, 
    updateBusiness, 
    updateFunding, 
    updateLocation,
    calculateCompletion,
    saveProfile 
  } = useProfileStore();

  const handleFinish = () => {
    if (!user) {
      toast.error("Please log in to save your profile");
      return;
    }

    saveProfile(user.uid);
    setOnboarded(true);
    toast.success("Entrepreneur profile established successfully!");
    router.push("/dashboard");
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-500/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-500/10 blur-[120px]" />
        </div>

        <div className="w-full max-w-3xl glass-card rounded-3xl p-6 sm:p-10 relative z-10 border border-white/10 shadow-glass-lg">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Entrepreneur Intelligence Setup
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
                Setup Your Business Profile
              </h1>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Step {step} of {totalSteps}</span>
              <div className="text-lg font-bold text-teal-400">{calculateCompletion()}% Complete</div>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-5 gap-2 mb-8">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isActive = s.id === step;
              const isPast = s.id < step;
              return (
                <div key={s.id} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-brand-500 text-white shadow-glow-sm"
                        : isPast
                        ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                        : "bg-white/5 text-slate-500 border border-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-2xs sm:text-xs font-medium ${
                      isActive ? "text-slate-100" : isPast ? "text-teal-300" : "text-slate-500"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Form Step Content */}
          <div className="min-h-[380px]">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Profile */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-slate-200">
                    Personal & Demographic Profile
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Legal Name"
                      placeholder="e.g. Ramesh Patel"
                      value={profile.fullName || ""}
                      onChange={(e) => updatePersonal({ fullName: e.target.value })}
                      required
                    />
                    <Input
                      label="Age"
                      type="number"
                      value={profile.age || 28}
                      onChange={(e) => updatePersonal({ age: Number(e.target.value) })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Gender (Relevant for specific women entrepreneur schemes)"
                      value={profile.gender || "prefer_not_to_say"}
                      onChange={(val) => updatePersonal({ gender: val as EntrepreneurProfile["gender"] })}
                      options={GENDER_OPTIONS}
                    />

                    <Select
                      label="Area Type"
                      value={profile.areaType || "urban"}
                      onChange={(val) => updatePersonal({ areaType: val as AreaType })}
                      options={AREA_TYPE_OPTIONS}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Highest Education"
                      placeholder="e.g. Graduate / Diploma / 10th"
                      value={profile.education || ""}
                      onChange={(e) => updatePersonal({ education: e.target.value })}
                    />
                    <Input
                      label="Annual Household Income (₹)"
                      type="number"
                      value={profile.annualIncome || 450000}
                      onChange={(e) => updatePersonal({ annualIncome: Number(e.target.value) })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Social Category (Optional – used for affirmative schemes)"
                      value={profile.socialCategory || "general"}
                      onChange={(val) => updatePersonal({ socialCategory: val as SocialCategory })}
                      options={SOCIAL_CATEGORY_OPTIONS}
                    />

                    <Select
                      label="Preferred Language for AI Assistant"
                      value={profile.preferredLanguage || "en"}
                      onChange={(val) => updatePersonal({ preferredLanguage: val as SupportedLanguage })}
                      options={LANGUAGE_OPTIONS}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Enterprise Metadata */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-slate-200">
                    Business Profile & Classification
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Business / Enterprise Name"
                      placeholder="e.g. Apex Textiles Pvt Ltd"
                      value={profile.businessName || ""}
                      onChange={(e) => updateBusiness({ businessName: e.target.value })}
                      required
                    />
                    <Select
                      label="Business Stage"
                      value={profile.businessStage || "starting"}
                      onChange={(val) => updateBusiness({ businessStage: val as BusinessStage })}
                      options={BUSINESS_STAGE_OPTIONS}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Industry Category"
                      placeholder="e.g. Manufacturing, Agriculture, IT, Handloom"
                      value={profile.industry || ""}
                      onChange={(e) => updateBusiness({ industry: e.target.value })}
                      required
                    />
                    <Input
                      label="Sector Specialization"
                      placeholder="e.g. Food Processing, Solar, Handicrafts"
                      value={profile.sector || ""}
                      onChange={(e) => updateBusiness({ sector: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Select
                      label="Enterprise Type"
                      value={profile.enterpriseType || "micro"}
                      onChange={(val) => updateBusiness({ enterpriseType: val as EnterpriseType })}
                      options={ENTERPRISE_TYPE_OPTIONS}
                    />
                    <Input
                      label="Number of Employees"
                      type="number"
                      value={profile.employeeCount || 4}
                      onChange={(e) => updateBusiness({ employeeCount: Number(e.target.value) })}
                    />
                    <Input
                      label="Annual Turnover (₹)"
                      type="number"
                      value={profile.annualTurnover || 800000}
                      onChange={(e) => updateBusiness({ annualTurnover: Number(e.target.value) })}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Capital & Funding Requirement */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-slate-200">
                    Capital, Loan & Subsidy Requirements
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Funding Amount Required (₹)"
                      type="number"
                      placeholder="e.g. 500000"
                      value={profile.fundingRequired || 500000}
                      onChange={(e) => updateFunding({ fundingRequired: Number(e.target.value) })}
                      required
                    />
                    <Select
                      label="Primary Purpose of Funds"
                      value={profile.fundingPurpose || "machinery"}
                      onChange={(val) => updateFunding({ fundingPurpose: val as EntrepreneurProfile["fundingPurpose"] })}
                      options={FUNDING_PURPOSE_OPTIONS}
                    />
                  </div>

                  <div className="pt-2">
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">
                      Registrations & Compliances (Helps qualify for formal credit guarantee)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Udyam Registration Number (Optional)"
                        placeholder="UDYAM-XX-00-0000000"
                        value={profile.udyamNumber || ""}
                        onChange={(e) => updateFunding({ udyamNumber: e.target.value })}
                      />
                      <Input
                        label="GSTIN Number (Optional)"
                        placeholder="22AAAAA0000A1Z5"
                        value={profile.gstin || ""}
                        onChange={(e) => updateFunding({ gstin: e.target.value })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Business Location */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-slate-200">
                    Business Location Pinpoint (State & District Matching)
                  </h3>
                  <LocationPicker
                    value={profile.location || {
                      latitude: 23.2599,
                      longitude: 77.4126,
                      state: "Madhya Pradesh",
                      district: "Bhopal",
                      city: "Bhopal",
                      pincode: "462001",
                      formattedAddress: "Bhopal, Madhya Pradesh - 462001"
                    }}
                    onChange={(loc) => updateLocation(loc)}
                  />
                </motion.div>
              )}

              {/* Step 5: Review */}
              {step === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-5 flex items-center gap-4">
                    <CheckCircle2 className="w-8 h-8 text-teal-400 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-100">
                        Profile Readiness: {calculateCompletion()}%
                      </h4>
                      <p className="text-xs text-slate-300">
                        Your profile contains sufficient parameters to perform deterministic eligibility evaluations against all central and state government schemes.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                      <span className="text-xs font-semibold text-brand-400 uppercase">Enterprise</span>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Name:</span>
                        <span className="text-slate-200 font-medium">{profile.businessName || "Not specified"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Stage:</span>
                        <span className="text-slate-200 capitalize">{profile.businessStage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Sector:</span>
                        <span className="text-slate-200">{profile.sector}</span>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                      <span className="text-xs font-semibold text-teal-400 uppercase">Funding & Location</span>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Required:</span>
                        <span className="text-slate-200 font-medium">₹{(profile.fundingRequired || 0).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Purpose:</span>
                        <span className="text-slate-200 capitalize">{profile.fundingPurpose}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Location:</span>
                        <span className="text-slate-200">{profile.location?.district}, {profile.location?.state}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 mt-8 border-t border-white/10">
            <Button
              type="button"
              variant="ghost"
              onClick={prevStep}
              disabled={step === 1}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Previous
            </Button>

            {step < totalSteps ? (
              <Button
                type="button"
                variant="primary"
                onClick={nextStep}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Next Step
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                onClick={handleFinish}
                rightIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Activate Entrepreneur Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
