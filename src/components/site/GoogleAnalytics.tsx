import { useEffect } from "react";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    __gaLoaded?: boolean;
  }
}

function loadGA() {
  if (window.__gaLoaded || !GA_MEASUREMENT_ID) return;

  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `;
  document.head.appendChild(script2);

  window.__gaLoaded = true;
}

export function GoogleAnalytics() {
  useEffect(() => {
    const consent = localStorage.getItem("teo-cookie-consent");
    if (consent === "all") loadGA();

    const handler = () => loadGA();
    window.addEventListener("cookies-accepted", handler);
    return () => window.removeEventListener("cookies-accepted", handler);
  }, []);

  return null;
}