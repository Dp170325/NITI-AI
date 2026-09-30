"use client";

import React, { useState, useEffect, useRef } from "react";
import { BorderBeam } from "border-beam";
import { ThinkingOrb } from "thinking-orbs";
import { Liquid } from "liquid-gooey";
import { VoiceBeam, useMicrophone } from "voice-glow";
import { MetalFx, MetalBadge } from "metal-fx";
import { Mic, MicOff, Sparkles, Send } from "lucide-react";

// ─── A. Border Beam Card Wrapper ───────────────────────────────────────────
interface BorderBeamCardProps {
  children: React.ReactNode;
  size?: "md" | "sm" | "line" | "pulse-inner" | "pulse-outside";
  colorVariant?: "colorful" | "mono" | "ocean" | "sunset";
  strength?: number;
  className?: string;
}

export function BorderBeamCard({
  children,
  size = "md",
  colorVariant = "colorful",
  strength = 0.8,
  className = ""
}: BorderBeamCardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <BorderBeam size={size} colorVariant={colorVariant} strength={strength} className={className}>
      {children}
    </BorderBeam>
  );
}

// ─── B. Thinking Orb AI Indicator ──────────────────────────────────────────
interface LiveThinkingOrbProps {
  state?: "working" | "searching" | "solving" | "listening" | "connecting" | "weaving" | "composing" | "breathing" | "shaping";
  size?: 64 | 32 | 20;
  speed?: number;
  theme?: "auto" | "dark" | "light";
  color?: string;
}

export function LiveThinkingOrb({
  state = "solving",
  size = 64,
  speed = 1,
  theme = "dark",
  color
}: LiveThinkingOrbProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div 
        style={{ width: size, height: size }} 
        className="rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center animate-pulse"
      >
        <Sparkles className="w-5 h-5 text-brand-300" />
      </div>
    );
  }

  return (
    <ThinkingOrb 
      state={state} 
      size={size} 
      speed={speed} 
      theme={theme} 
      {...(color ? { color } : {})} 
    />
  );
}

// ─── C. Liquid Gooey Quick Actions ─────────────────────────────────────────
interface LiquidActionsProps {
  onActionSelect?: (action: string) => void;
}

export function LiquidActions({ onActionSelect }: LiquidActionsProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative inline-flex items-center">
      <Liquid blur={6} contrast={18} fill="#0f766e">
        <Liquid.Item x={0} y={0} transition="bouncy">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-glow-sm flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Dock</span>
          </button>
        </Liquid.Item>

        {isOpen && (
          <>
            <Liquid.Item x={isOpen ? 135 : 0} y={0} transition="bouncy">
              <button
                type="button"
                onClick={() => {
                  onActionSelect?.("chat");
                  setIsOpen(false);
                }}
                className="px-3.5 py-2 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium shadow-sm transition-all"
              >
                AI Mentor
              </button>
            </Liquid.Item>

            <Liquid.Item x={isOpen ? 230 : 0} y={0} transition="bouncy">
              <button
                type="button"
                onClick={() => {
                  onActionSelect?.("profile");
                  setIsOpen(false);
                }}
                className="px-3.5 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-sm transition-all"
              >
                Profile
              </button>
            </Liquid.Item>
          </>
        )}
      </Liquid>
    </div>
  );
}

// ─── D. Sound-Reactive Voice Beam Chat Input ────────────────────────────────
interface VoiceChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  isProcessing?: boolean;
}

export function VoiceChatInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Ask anything in English, हिंदी, or Hinglish...",
  isProcessing = false
}: VoiceChatInputProps) {
  const [mounted, setMounted] = useState(false);
  const mic = useMicrophone();
  const meterRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulate audio level pulse when microphone is live or user is typing
  useEffect(() => {
    let animId: number;
    if (mic.state === "live" || value.length > 0) {
      const updateLevel = () => {
        meterRef.current = 0.3 + Math.sin(Date.now() / 150) * 0.25;
        animId = requestAnimationFrame(updateLevel);
      };
      animId = requestAnimationFrame(updateLevel);
    } else {
      meterRef.current = 0;
    }
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [mic.state, value]);

  if (!mounted) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex gap-2.5 w-full"
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 text-sm sm:text-base py-3.5 px-4 rounded-2xl bg-slate-900 border border-white/10 text-slate-100"
        />
        <button type="submit" className="px-6 py-3.5 rounded-2xl bg-brand-500 text-white font-semibold">
          Ask
        </button>
      </form>
    );
  }

  const toggleMic = async () => {
    try {
      if (mic.state === "live") {
        mic.stop();
      } else {
        await mic.start();
      }
    } catch (err) {
      console.warn("Microphone access permission note:", err);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="w-full relative"
    >
      <VoiceBeam
        type="default"
        stream={mic.state === "live" && mic.stream ? mic.stream : null}
        level={mic.state === "live" ? 0 : () => meterRef.current}
        processing={isProcessing}
        colorVariant="colorful"
        strength={0.85}
        theme="dark"
      >
        <div className="relative flex items-center w-full bg-slate-900/90 rounded-2xl border border-white/15 focus-within:border-brand-500/60 shadow-inner overflow-hidden">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent py-4 pl-5 pr-28 text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />

          <div className="absolute right-2 flex items-center gap-1.5">
            {/* Microphone Button with Voice Glow Reaction */}
            <button
              type="button"
              onClick={toggleMic}
              title={mic.state === "live" ? "Stop Listening" : "Speak with NITI Saathi"}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                mic.state === "live"
                  ? "bg-red-500 text-white shadow-glow-sm animate-pulse"
                  : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {mic.state === "live" ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Submit Send Button */}
            <button
              type="submit"
              disabled={!value.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-teal-500 hover:from-brand-400 hover:to-teal-400 text-white shadow-glow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </VoiceBeam>
    </form>
  );
}

// ─── E. Metal FX Liquid Shimmer Button & Badge ───────────────────────────────
interface MetalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  preset?: "chromatic" | "silver" | "gold";
  strength?: number;
  className?: string;
  type?: "button" | "submit";
}

export function MetalButton({
  children,
  onClick,
  preset = "chromatic",
  strength = 1,
  className = "",
  type = "button"
}: MetalButtonProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button type={type} onClick={onClick} className={className}>
        {children}
      </button>
    );
  }

  return (
    <MetalFx preset={preset} strength={strength} theme="dark">
      <button type={type} onClick={onClick} className={className}>
        {children}
      </button>
    </MetalFx>
  );
}

interface MetalStatusBadgeProps {
  label: string;
}

export function MetalStatusBadge({ label }: MetalStatusBadgeProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
        {label}
      </span>
    );
  }

  return (
    <div className="inline-flex items-center">
      <MetalBadge>{label}</MetalBadge>
    </div>
  );
}
