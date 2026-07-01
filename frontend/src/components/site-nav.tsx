"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/verify", label: "Verify" },
  { href: "/claim", label: "Claim" },
  { href: "/dashboard", label: "Dashboard" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="brand-lockup">
        <span className="brand-mark" aria-hidden="true">
          A
        </span>
        <div>
          <p className="brand-name">AidShield</p>
          <p className="brand-meta">Private aid claims on Stellar</p>
        </div>
      </div>

      <div className="nav-links">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "nav-link active" : "nav-link"}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="nav-badge">
        <span className="nav-badge-dot" aria-hidden="true" />
        Stellar testnet ready
      </div>
    </nav>
  );
}
