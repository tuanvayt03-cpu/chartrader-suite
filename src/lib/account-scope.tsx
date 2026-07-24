import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { readPref, writePref } from "./prefs";

export type AccountCurrency = "USD" | "USC";
export type AccountState = "connected" | "offline" | "archived";

export interface AccountRecord {
  id: string;
  alias: string;
  login: string;
  broker: string;
  server: string;
  currency: AccountCurrency;
  type: string;
  state: AccountState;
  openPositions: number;
  pendingOrders: number;
  lastUpdated: string;
}

export const DEMO_ACCOUNTS: AccountRecord[] = [
  { id: "acc-001", alias: "Main USD", login: "9999042", broker: "ICMarkets", server: "ICMarkets-Live04", currency: "USD", type: "Hedge", state: "offline", openPositions: 0, pendingOrders: 0, lastUpdated: "—" },
  { id: "acc-002", alias: "Scaling USC", login: "8823110", broker: "Exness", server: "Exness-MT5Real14", currency: "USC", type: "Netting", state: "offline", openPositions: 0, pendingOrders: 0, lastUpdated: "—" },
  { id: "acc-003", alias: "Archive 2025", login: "7100234", broker: "Pepperstone", server: "Pepperstone-Live", currency: "USD", type: "Hedge", state: "archived", openPositions: 0, pendingOrders: 0, lastUpdated: "—" },
];

type Scope = "all" | string;

type Ctx = {
  scope: Scope;
  setScope: (s: Scope) => void;
  pinnedId: string | null;
  setPinned: (id: string | null) => void;
  accounts: AccountRecord[];
  activeAccounts: AccountRecord[];
  currentLabel: string;
  currentSubLabel: string;
};

const AccountScopeContext = createContext<Ctx | null>(null);

export function AccountScopeProvider({ children }: { children: ReactNode }) {
  const [scope, setScopeState] = useState<Scope>("all");
  const [pinnedId, setPinnedIdState] = useState<string | null>(null);
  const accounts = DEMO_ACCOUNTS;

  useEffect(() => {
    const s = readPref<Scope>("scope", "all");
    const p = readPref<string | null>("pinnedAccount", null);
    setScopeState(s);
    setPinnedIdState(p);
  }, []);

  const setScope = useCallback((s: Scope) => { setScopeState(s); writePref("scope", s); }, []);
  const setPinned = useCallback((id: string | null) => { setPinnedIdState(id); writePref("pinnedAccount", id); }, []);

  const activeAccounts = useMemo(() => accounts.filter((a) => a.state !== "archived"), [accounts]);

  const value = useMemo<Ctx>(() => {
    let currentLabel = "All accounts";
    let currentSubLabel = `${activeAccounts.length} accounts · 0 active`;
    if (scope !== "all") {
      const found = accounts.find((a) => a.id === scope);
      if (found) { currentLabel = found.alias; currentSubLabel = `${found.login} · ${found.broker}`; }
    }
    return { scope, setScope, pinnedId, setPinned, accounts, activeAccounts, currentLabel, currentSubLabel };
  }, [scope, setScope, pinnedId, setPinned, accounts, activeAccounts]);

  return <AccountScopeContext.Provider value={value}>{children}</AccountScopeContext.Provider>;
}

export function useAccountScope() {
  const c = useContext(AccountScopeContext);
  if (!c) throw new Error("useAccountScope must be used inside AccountScopeProvider");
  return c;
}