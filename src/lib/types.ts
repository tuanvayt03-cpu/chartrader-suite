export type OrderType = "buy" | "sell";

export interface Order {
  id: string;
  symbol: string;
  type: OrderType;
  openDate: string;
  openPrice: number;
  sl: number;
  tp: number;
  closeDate: string;
  closePrice: number;
  lots: number;
  profit: number;
  duration: string;
  gainPct: number;
}

export interface Notification {
  id: string;
  time: string;
  type: string;
  message: string;
  severity: "info" | "warning" | "danger";
}

export type Priority = "high" | "medium" | "low";
export type SourceState = "enabled" | "disabled";
export type MembershipState = "member" | "not_member";
export type VerificationState = "verified" | "pending" | "failed";
export type Visibility = "public" | "private";

export interface TelegramSource {
  id: string;
  displayName: string;
  rawTitle: string;
  link: string;
  username: string;
  group: string;
  parserProfile: string;
  symbolProfile: string;
  priority: Priority;
  visibility: Visibility;
  membership: MembershipState;
  historyAccess: VerificationState;
  realtimeFollow: VerificationState;
  state: SourceState;
  lastVerified: string;
  chatId: string;
  commentName: string;
  notes?: string;
  tags?: string[];
}

export interface ImportRow {
  input: string;
  category:
    | "new"
    | "existing"
    | "conflict"
    | "invalid"
    | "noParser"
    | "noSymbol";
  detail?: string;
  displayName?: string;
}