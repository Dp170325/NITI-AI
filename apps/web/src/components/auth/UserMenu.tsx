"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import { useProfileStore } from "@/lib/profileStore";
import { 
  User, 
  LogOut, 
  LayoutDashboard, 
  Search, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  Server
} from "lucide-react";
import { InfrastructureStatusModal } from "@/components/infrastructure/InfrastructureStatusModal";

interface UserMenuProps {
  showInfrastructureOption?: boolean;
}

export function UserMenu({ showInfrastructureOption = true }: UserMenuProps) {
  const { user, signOut } = useAuthStore();
  const { profile } = useProfileStore();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  if (!user) return null;

  const displayName = profile.fullName || user.displayName || "Entrepreneur";
  const email = user.email || "user@niti-ai.gov.in";
  const initial = displayName.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
    router.replace("/");
  };

  return (
    <div 
      className="relative inline-block text-left" 
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Circular Avatar Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User Profile Menu"
        className="relative group p-0.5 rounded-full transition-transform active:scale-95 focus:outline-none"
      >
        {/* Glow Ring on Hover */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-400 via-teal-400 to-brand-500 opacity-60 group-hover:opacity-100 blur-[3px] transition duration-300" />
        
        {/* Circular Avatar Element */}
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gradient-to-br from-brand-500 via-teal-500 to-indigo-600 flex items-center justify-center border-2 border-slate-900 shadow-md">
          {user.photoURL ? (
            <Image 
              src={user.photoURL} 
              alt={displayName} 
              width={40}
              height={40}
              className="w-full h-full object-cover" 
            />
          ) : (
            <span className="font-bold text-white text-sm sm:text-base tracking-wider select-none">
              {initial}
            </span>
          )}

          {/* Active Live Dot */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
        </div>
      </button>

      {/* Floating Glassmorphic Dropdown */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2.5 w-72 sm:w-80 rounded-3xl glass-card bg-slate-950/95 border border-brand-500/30 p-2 shadow-2xl shadow-black/80 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-2xl"
        >
          {/* Header with Circular Profile & Email */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-brand-400 to-teal-500 flex items-center justify-center shrink-0 border border-brand-400/40 shadow-glow-sm">
                {user.photoURL ? (
                  <Image 
                    src={user.photoURL} 
                    alt={displayName} 
                    width={48}
                    height={48}
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <span className="font-bold text-white text-lg">
                    {initial}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-slate-100 truncate">
                    {displayName}
                  </h4>
                  <span title="Verified Account" className="inline-flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate font-mono mt-0.5" title={email}>
                  {email}
                </p>
                <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-300 bg-brand-500/15 border border-brand-500/25 px-2 py-0.5 rounded-full mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  Verified Entrepreneur
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-0.5 text-xs text-slate-300">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-brand-500/15 text-brand-300 flex items-center justify-center border border-brand-500/20 group-hover:scale-105 transition-transform">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-medium text-slate-100 block">My Profile</span>
                  <span className="text-[11px] text-slate-400">Manage enterprise & capital data</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-300 flex items-center justify-center border border-teal-500/20 group-hover:scale-105 transition-transform">
                  <LayoutDashboard className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-medium text-slate-100 block">Live Dashboard</span>
                  <span className="text-[11px] text-slate-400">Match score & scheme rankings</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
            </Link>

            <Link
              href="/chat"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-300 flex items-center justify-center border border-indigo-500/20 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-medium text-slate-100 block">NITI Saathi AI Chat</span>
                  <span className="text-[11px] text-slate-400">Instant subsidy calculations & DPR</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
            </Link>

            <Link
              href="/schemes"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-300 flex items-center justify-center border border-amber-500/20 group-hover:scale-105 transition-transform">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-medium text-slate-100 block">Schemes Directory</span>
                  <span className="text-[11px] text-slate-400">14 Verified National Portals</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
            </Link>

            {showInfrastructureOption && (
              <div className="p-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center border border-emerald-500/20">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-100 block">System Mesh Telemetry</span>
                    <span className="text-[11px] text-slate-400">Gateway, Breakers, Cache</span>
                  </div>
                </div>
                <InfrastructureStatusModal />
              </div>
            )}
          </div>

          {/* Divider & Sign Out */}
          <div className="mt-2 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/15 transition-colors font-medium text-xs text-left group"
            >
              <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Sign Out of Account</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
