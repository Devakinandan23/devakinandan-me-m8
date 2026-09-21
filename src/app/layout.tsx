import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@fontsource/assistant/400.css";
import "@fontsource/assistant/600.css";
import "@fontsource/lora/600.css";
import "@fontsource/lora/600-italic.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteIdentity } from "@/data/site-identity";

import "./globals.css";

const themeScript = `
  (function () {
    var stored = null;
    try { stored = window.localStorage && window.localStorage.getItem("theme"); } catch (_) {}
    var preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var theme = stored === "dark" || stored === "light" ? stored : preferred;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!(target instanceof Element) || !target.closest("[data-theme-toggle]")) return;

      var nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.style.colorScheme = nextTheme;

      try { window.localStorage && window.localStorage.setItem("theme", nextTheme); } catch (_) {}
    });
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteIdentity.siteUrl),
  title: {
    default: siteIdentity.shortName,
    template: `%s | ${siteIdentity.shortName}`,
  },
  description: "Notes on backend engineering, applied AI, and reliable software systems.",
  applicationName: siteIdentity.shortName,
  authors: [{ name: siteIdentity.fullName, url: siteIdentity.githubUrl }],
  creator: siteIdentity.fullName,
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <div className="site-content" id="main-content" tabIndex={-1}>
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
