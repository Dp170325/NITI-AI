"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  align?: "left" | "right";
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  id?: string;
}

export function Select({
  value,
  onChange,
  options,
  label,
  placeholder = "Select an option...",
  error,
  hint,
  disabled = false,
  align = "left",
  className,
  triggerClassName,
  menuClassName,
  id,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  const selectedOption = options.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = useCallback(
    (optionValue: string) => {
      onChange(optionValue);
      setIsOpen(false);
      triggerRef.current?.focus();
    },
    [onChange]
  );

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const handleMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const nextIndex = (currentIndex + 1) % options.length;
      if (options[nextIndex]) {
        onChange(options[nextIndex].value);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const prevIndex = (currentIndex - 1 + options.length) % options.length;
      if (options[prevIndex]) {
        onChange(options[prevIndex].value);
      }
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div className={cn("relative flex flex-col gap-1.5", isOpen ? "z-50" : "z-10", className)} ref={containerRef}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-slate-200 select-none"
        >
          {label}
        </label>
      )}

      <button
        ref={triggerRef}
        id={selectId}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          "w-full rounded-xl px-3.5 py-2.5 text-xs text-left",
          "bg-slate-900/90 border border-white/10 hover:border-white/20 hover:bg-slate-900",
          "text-slate-100 flex items-center justify-between gap-2",
          "focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/60",
          "transition-all duration-200 select-none shadow-sm",
          disabled && "opacity-50 cursor-not-allowed",
          isOpen && "ring-2 ring-brand-500/50 border-brand-500/60 bg-slate-900",
          error && "border-red-500/60 focus:ring-red-500/40",
          triggerClassName
        )}
      >
        <span className={cn("truncate", !selectedOption && "text-slate-500")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180 text-brand-400"
          )}
        />
      </button>

      {/* Floating Rounded-Rectangle Popover Menu (Brought to Front with Elevated Stacking Context) */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={0}
          onKeyDown={handleMenuKeyDown}
          className={cn(
            "absolute top-full mt-2 z-50",
            align === "right" ? "right-0" : "left-0",
            "w-full min-w-full sm:min-w-[280px] max-w-[90vw]",
            "rounded-2xl p-2 max-h-72 overflow-y-auto",
            "bg-slate-900/98 backdrop-blur-2xl border border-white/20",
            "shadow-[0_20px_50px_rgba(0,0,0,0.95)] ring-1 ring-white/10 space-y-1 animate-in fade-in zoom-in-95 duration-150",
            menuClassName
          )}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "w-full rounded-xl px-3 py-2 text-xs text-left flex items-center justify-between gap-2",
                  "transition-all duration-150 select-none cursor-pointer",
                  isSelected
                    ? "bg-brand-500/20 text-brand-200 border border-brand-500/30 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/10 border border-transparent"
                )}
              >
                <div className="flex flex-col gap-0.5 truncate">
                  <span className="truncate">{option.label}</span>
                  {option.description && (
                    <span className="text-[11px] text-slate-400 font-normal truncate">
                      {option.description}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {option.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 font-medium">
                      {option.badge}
                    </span>
                  )}
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400 mt-0.5" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-slate-500 mt-0.5">
          {hint}
        </p>
      )}
    </div>
  );
}
