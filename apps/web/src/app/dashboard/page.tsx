"use client";

import { useMemo, useEffect } from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useAuthStore } from "@/lib/authStore";
import { useProfileStore } from "@/lib/profileStore";
import { getRecommendedSchemes } from "@/lib/eligibilityEngine";
import { UserMenu } from "@/components/auth/UserMenu";
import { BorderBeamCard, LiveThinkingOrb } from "@/components/effects/InteractiveEffects";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import Link from "next/link";
import { 
  Sparkles, 
  Search, 
  MapPin, 
  CheckCircle, 
  TrendingUp, 
  Compass, 
  ArrowRight,
  MessageSquare,
  IndianRupee,
  AlertTriangle,
  Building2,
  ExternalLink
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { profile, loadProfile } = useProfileStore();

  // Load the specific authenticated user's profile on mount/change
  useEffect(() => {
    if (user?.uid) {
      loadProfile(user.uid);
    }
  }, [user?.uid, loadProfile]);

  const recommendedSchemes = useMemo(() => {
    return getRecommendedSchemes(profile);
  }, [profile]);

  const eligibleCount = useMemo(() => {
    return recommendedSchemes.filter((m) => m.isEligible).length;
  }, [recommendedSchemes]);

  const topMatch = recommendedSchemes[0];

  return (
    <AuthGuard requireOnboarded>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        {/* Navigation Bar with Circular User Profile Menu */}
        <header className="glass-nav sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-teal-500 flex items-center justify-center shadow-glow-sm">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-lg tracking-tight gradient-text">
                  NITI AI
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/schemes">
                <Button variant="ghost" size="sm" leftIcon={<Search className="w-4 h-4" />}>
                  Schemes
                </Button>
              </Link>
              <Link href="/chat">
                <Button variant="ghost" size="sm" leftIcon={<MessageSquare className="w-4 h-4" />}>
                  AI Chat
                </Button>
              </Link>
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              
              {/* Circular User Profile Dropdown on Hover/Click */}
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Welcome Banner with BorderBeam Glow & ThinkingOrb */}
          <BorderBeamCard size="md" colorVariant="ocean" strength={0.7} className="rounded-3xl">
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden border-brand-500/20">
              <div className="max-w-3xl relative z-10">
                <div className="inline-flex items-center gap-2.5 glass-card rounded-full px-3.5 py-1 text-xs text-brand-300 font-medium mb-3 border-brand-500/20">
                  <LiveThinkingOrb state="breathing" size={20} theme="dark" />
                  <span>Live Entrepreneur Intelligence Engine</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-2">
                  Namaste, {profile.fullName || user?.displayName || "Entrepreneur"}!
                </h1>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Welcome to your centralized government incentive engine. We matched your business profile with verified central and state schemes using deterministic evaluation and our self-hosted RAG advisory stack.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/onboarding">
                    <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Update Profile & Location
                    </Button>
                  </Link>

                  <Link href="/chat">
                    <Button
                      variant="secondary"
                      leftIcon={<Sparkles className="w-4 h-4 text-teal-400" />}
                    >
                      Consult AI Advisor
                    </Button>
                  </Link>

                  <Link href="/schemes">
                    <Button variant="ghost" leftIcon={<Search className="w-4 h-4" />}>
                      Browse All Schemes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </BorderBeamCard>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card glass className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center text-teal-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-100">{eligibleCount} Eligible</div>
                  <div className="text-xs text-slate-400">Schemes Directly Matching</div>
                </div>
              </div>
            </Card>

            <Card glass className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center text-brand-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-100">{topMatch?.matchScore ?? 95}%</div>
                  <div className="text-xs text-slate-400">Top Scheme Fit</div>
                </div>
              </div>
            </Card>

            <Card glass className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-100 truncate max-w-[150px]">
                    {profile.location?.state || "National"}
                  </div>
                  <div className="text-xs text-slate-400">Active Jurisdiction</div>
                </div>
              </div>
            </Card>

            <Card glass className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-100">Deterministic</div>
                  <div className="text-xs text-slate-400">Rule-Based Matching</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Scheme Matches Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-400" />
                  Your Top Matched Government Schemes
                </h2>
                <p className="text-xs text-slate-400">
                  Ranked deterministically based on your age, social category, enterprise stage, funding requirements, and geographical jurisdiction.
                </p>
              </div>
              <Link href="/schemes" className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1">
                View all database schemes
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedSchemes.map((result, index) => {
                const { scheme, matchScore, isEligible, matchReasons, disqualificationReasons } = result;
                
                const cardContent = (
                  <Card glass hover className="flex flex-col justify-between h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                          matchScore >= 80 
                            ? "bg-teal-500/15 text-teal-300 border-teal-500/30" 
                            : matchScore >= 60 
                            ? "bg-brand-500/15 text-brand-300 border-brand-500/30" 
                            : "bg-slate-800 text-slate-400 border-white/10"
                        }`}>
                          {matchScore}% Match
                        </span>

                        <div className="flex items-center gap-1.5">
                          {index === 0 && (
                            <span className="text-2xs font-semibold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-brand-500/20 to-teal-500/20 text-brand-300 border border-brand-500/40 shadow-glow-sm">
                              Top Recommendation
                            </span>
                          )}
                          <span className="text-2xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/10">
                            {scheme.governmentLevel}
                          </span>
                          {scheme.subsidyPercentage && (
                            <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/30">
                              {scheme.subsidyPercentage}% Subsidy
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="font-bold text-slate-100 text-lg leading-tight">
                        {scheme.schemeName}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {scheme.ministry}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                        {scheme.summary}
                      </p>

                      {scheme.fundingRange && (
                        <div className="bg-slate-900/60 rounded-xl p-3 flex items-center gap-2 border border-white/5">
                          <IndianRupee className="w-4 h-4 text-brand-400 shrink-0" />
                          <div className="text-xs">
                            <span className="text-slate-400">Support: </span>
                            <span className="font-semibold text-slate-200">
                              ₹{scheme.fundingRange.min.toLocaleString("en-IN")} - ₹{scheme.fundingRange.max.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Matching Breakdown */}
                      <div className="space-y-2 text-xs">
                        <span className="text-slate-400 font-medium block">Key Match Highlights:</span>
                        {matchReasons.slice(0, 2).map((reason, i) => (
                          <div key={i} className="flex items-start gap-2 text-teal-300">
                            <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>{reason}</span>
                          </div>
                        ))}
                        {!isEligible && disqualificationReasons.slice(0, 1).map((dis, i) => (
                          <div key={i} className="flex items-start gap-2 text-amber-400">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>{dis}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                      <Link href={`/chat?q=Tell me everything about ${encodeURIComponent(scheme.shortName)}`}>
                        <Button variant="ghost" size="sm" leftIcon={<MessageSquare className="w-3.5 h-3.5" />}>
                          Ask AI
                        </Button>
                      </Link>
                      <a href={scheme.applicationUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                          Apply
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                );

                if (index === 0) {
                  return (
                    <BorderBeamCard key={scheme.id} size="md" colorVariant="colorful" strength={0.85} className="h-full rounded-2xl">
                      {cardContent}
                    </BorderBeamCard>
                  );
                }

                return <div key={scheme.id}>{cardContent}</div>;
              })}
            </div>
          </div>

          {/* Bottom Grid: Enterprise Profile Snapshot + AI Action Plan (Security tab completely hidden) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card glass>
              <CardHeader>
                <h3 className="font-semibold text-slate-100 text-lg flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-brand-400" />
                  Your Enterprise Profile Snapshot
                </h3>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Sector & Industry</span>
                  <span className="text-slate-200 font-medium">{profile.sector || "Manufacturing"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Enterprise Stage</span>
                  <span className="text-slate-200 capitalize font-medium">{profile.businessStage || "Starting"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Social Category</span>
                  <span className="text-slate-200 uppercase font-medium">{profile.socialCategory || "General"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Location Pinpoint</span>
                  <span className="text-slate-200 font-medium">
                    {profile.location?.district ? `${profile.location.district}, ${profile.location.state}` : "Madhya Pradesh, India"}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">Funding Requirement</span>
                  <span className="text-teal-400 font-medium">
                    ₹{(profile.fundingRequired || 500000).toLocaleString("en-IN")}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* AI Action Plan & Instant Next Steps (Replacing Security Status tab per user request) */}
            <Card glass className="flex flex-col justify-between border-brand-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-100 text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-400" />
                    AI Action Plan & Instant Next Steps
                  </h3>
                  <span className="text-2xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/30">
                    NITI Saathi Roadmap
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3.5 text-sm">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h5 className="font-semibold text-slate-200 text-xs">Formulate Detailed Project Report (DPR)</h5>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                      Compile vendor machinery quotations with GSTIN and projected 3-year cash flow.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h5 className="font-semibold text-slate-200 text-xs">Submit Online via Official Portal</h5>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                      Direct application to {topMatch?.scheme.shortName || "PMEGP"} via verified National single-window portal.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h5 className="font-semibold text-slate-200 text-xs">Margin Money Subsidy Lock-in</h5>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                      Receive up to 35% non-refundable capital subsidy credited as Margin Money TDR in your bank account.
                    </p>
                  </div>
                </div>

                <div className="pt-1">
                  <Link href={`/chat?q=Give me the step by step application guide for ${encodeURIComponent(topMatch?.scheme.shortName || "PMEGP")}`}>
                    <Button variant="primary" fullWidth size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Generate DPR Guide with NITI Saathi
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
