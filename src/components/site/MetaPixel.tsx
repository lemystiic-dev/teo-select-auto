import { useEffect } from "react";

const PIXEL_ID = "1684227963707719";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
    __metaPixelReady?: boolean;
    __metaPixelQueue?: Array<{ eventName: string; data?: Record<string, unknown> }>;
  }
}

function loadPixel() {
  if (window.__metaPixelReady) return;

  // Queue pentru evenimente care vin înainte de init
  if (!window.__metaPixelQueue) {
    window.__metaPixelQueue = [];
  }

  const script = document.createElement("script");
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${PIXEL_ID}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);

  const noscript = document.createElement("noscript");
  const img = document.createElement("img");
  img.height = 1;
  img.width = 1;
  img.style.display = "none";
  img.src = `https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`;
  noscript.appendChild(img);
  document.body.appendChild(noscript);

  // Marcăm ca ready imediat (init-ul rulează sincron când scriptul se execută)
  window.__metaPixelReady = true;

  // Procesăm coada de evenimente care au venit înainte
  window.__metaPixelQueue.forEach(({ eventName, data }) => {
    if (window.fbq) window.fbq("track", eventName, data);
  });
  window.__metaPixelQueue = [];
}

export function MetaPixel() {
  useEffect(() => {
    const consent = localStorage.getItem("teo-cookie-consent");
    if (consent === "all") loadPixel();

    const handler = () => loadPixel();
    window.addEventListener("cookies-accepted", handler);
    return () => window.removeEventListener("cookies-accepted", handler);
  }, []);

  return null;
}

export function trackMetaEvent(eventName: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  // Dacă pixel-ul e gata → trimitem direct
  if (window.__metaPixelReady && window.fbq) {
    window.fbq("track", eventName, data);
    return;
  }

  // Altfel → punem în coadă
  if (!window.__metaPixelQueue) window.__metaPixelQueue = [];
  window.__metaPixelQueue.push({ eventName, data });
}