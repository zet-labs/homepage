"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    const titleStyle = [
      "color:#f8fafc",
      "background:#0f172a",
      "padding:6px 10px",
      "border-radius:8px",
      "font-weight:700",
      "font-size:13px",
    ].join(";");
    const accentStyle =
      "color:#052e16;background:#86efac;padding:2px 6px;border-radius:6px;font-weight:700;";
    const subtleStyle =
      "color:#e2e8f0;background:#1f2937;padding:2px 6px;border-radius:6px;font-size:12px;";
    const baseStyle =
      "color:#e5e7eb;background:#111827;padding:3px 6px;border-radius:6px;font-size:12px;";

    console.log("%cZet Labs console peek", titleStyle);
    console.log(
      "%cHey curious minds. If you are reading this, you are our kind of person.",
      baseStyle + "font-size:13px;font-weight:600;",
    );
    console.log(
      "%cWe are hiring builders and tinkerers. Say hi at %chello@zetlabs.ai",
      baseStyle,
      accentStyle,
    );
    console.log(
      "%cSource code is open on GitHub: %chttps://github.com/Zet-Labs/homepage",
      subtleStyle,
      "color:#bfdbfe;background:#1e3a8a;padding:2px 6px;border-radius:6px;text-decoration:underline;",
    );
  }, []);

  return null;
}
