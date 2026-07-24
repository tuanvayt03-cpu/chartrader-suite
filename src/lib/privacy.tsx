import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { readPref, writePref } from "./prefs";

type Ctx = {
  privacy: boolean;
  togglePrivacy: () => void;
  setPrivacy: (v: boolean) => void;
  mask: (raw: string, kind?: "money" | "id" | "text") => string;
};

const PrivacyContext = createContext<Ctx | null>(null);

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [privacy, setPrivacyState] = useState<boolean>(false);
  useEffect(() => {
    setPrivacyState(readPref<boolean>("privacy", false));
  }, []);
  const setPrivacy = useCallback((v: boolean) => {
    setPrivacyState(v);
    writePref("privacy", v);
  }, []);
  const togglePrivacy = useCallback(() => setPrivacy(!privacy), [privacy, setPrivacy]);
  const value = useMemo<Ctx>(
    () => ({
      privacy,
      togglePrivacy,
      setPrivacy,
      mask: (raw, kind = "text") => {
        if (!privacy) return raw;
        if (kind === "money") return "••••••••";
        if (kind === "id") return "•••• ••••";
        return "•••••";
      },
    }),
    [privacy, setPrivacy, togglePrivacy],
  );
  return <PrivacyContext.Provider value={value}>{children}</PrivacyContext.Provider>;
}

export function usePrivacy() {
  const c = useContext(PrivacyContext);
  if (!c) throw new Error("usePrivacy must be used inside PrivacyProvider");
  return c;
}

/**
 * Renders `children` unless Privacy Mode is enabled, in which case it renders the mask.
 * Layout stays stable — width of the mask matches typical sensitive fields.
 */
export function Sensitive({
  children,
  kind = "text",
  className,
}: {
  children: ReactNode;
  kind?: "money" | "id" | "text";
  className?: string;
}) {
  const { privacy } = usePrivacy();
  if (!privacy) return <span className={className}>{children}</span>;
  const mask = kind === "money" ? "••••••••" : kind === "id" ? "•••• ••••" : "•••••";
  return (
    <span className={className} aria-label="hidden by privacy mode">
      {mask}
    </span>
  );
}