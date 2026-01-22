"use client";
import React, { useEffect, useState } from "react";

const CONSENT_KEY = "spaansetuinen_cookie_consent_v1";

export default function CookieBanner({ disablePersistence = false }: { disablePersistence?: boolean }): JSX.Element | null {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (disablePersistence) {
      setVisible(true);
      return;
    }
  }, [disablePersistence]);

  if (!mounted) return null;
  if (!visible) return null;

  const onAccept = () => {
    if (!disablePersistence) {
      try { localStorage.setItem(CONSENT_KEY, "1"); } catch (e) { }
    }
    setVisible(false);
  };

  return (
    <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 9999, display: "flex", justifyContent: "center", padding: 12 }} role="dialog" aria-label="Cookie melding">
      <div style={{ maxWidth: 1100, width: "100%", margin: "0 12px", background: "#f9fafb", color: "#111827", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", fontSize: 14, lineHeight: 1.3 }}>
        <p style={{ flex: 1, margin: 0 }}>
          Wij gebruiken cookies om de website goed te laten functioneren en het gebruik te analyseren. Door verder te gaan, gaat u akkoord met het gebruik van cookies.
        </p>
        <button onClick={onAccept} aria-label="Akkoord" style={{ background: "#10b981", color: "white", border: "none", padding: "8px 14px", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>
          Akkoord
        </button>
      </div>
    </div>
  );
}
