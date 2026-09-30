import { SelectOption } from "@/components/ui/Select";

export const GENDER_OPTIONS: SelectOption[] = [
  { value: "female", label: "Female (Qualifies for Stand-Up India & 35% subsidies)", badge: "Priority" },
  { value: "male", label: "Male" },
  { value: "transgender", label: "Transgender" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

export const SOCIAL_CATEGORY_OPTIONS: SelectOption[] = [
  { value: "general", label: "General" },
  { value: "obc", label: "OBC (Other Backward Classes)" },
  { value: "sc", label: "SC (Scheduled Caste - Special Subsidy)", badge: "Affirmative" },
  { value: "st", label: "ST (Scheduled Tribe - Special Subsidy)", badge: "Affirmative" },
  { value: "minority", label: "Minority Community" },
  { value: "ews", label: "EWS (Economically Weaker Section)" },
];

export const AREA_TYPE_OPTIONS: SelectOption[] = [
  { value: "urban", label: "Urban" },
  { value: "rural", label: "Rural (Eligible for highest 35% PMEGP grant)", badge: "Max Subsidy" },
  { value: "semi-urban", label: "Semi-Urban" },
];

export const LANGUAGE_OPTIONS: SelectOption[] = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिंदी (Hindi)" },
  { value: "hinglish", label: "Hinglish (Hindi in Roman script)" },
];

export const BUSINESS_STAGE_OPTIONS: SelectOption[] = [
  { value: "idea", label: "Idea Stage (Looking for seed grants)" },
  { value: "starting", label: "Starting New Unit (0 - 1 year)" },
  { value: "existing", label: "Existing Established Business" },
  { value: "expansion", label: "Scale-Up / Modernization" },
];

export const ENTERPRISE_TYPE_OPTIONS: SelectOption[] = [
  { value: "micro", label: "Micro (< ₹1 Cr investment)" },
  { value: "small", label: "Small (< ₹10 Cr)" },
  { value: "medium", label: "Medium (< ₹50 Cr)" },
];

export const FUNDING_PURPOSE_OPTIONS: SelectOption[] = [
  { value: "machinery", label: "Machinery & Plant Equipment" },
  { value: "working_capital", label: "Working Capital & Raw Materials" },
  { value: "expansion", label: "New Factory / Unit Expansion" },
  { value: "technology", label: "Clean Tech / Automation (ZED)" },
  { value: "marketing", label: "Export & Branding Development" },
];
