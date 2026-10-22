import Script from "next/script";
import { GA_ID, GTM_ID } from "@/lib/analytics";
import { CONSENT_KEY } from "@/lib/consent";

/**
 * Google Consent Mode v2 defaults. Rendered in <head> so it runs before any
 * Google tag. Re-applies a previously saved choice on every page load.
 */
export function ConsentDefaults() {
  const code = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);
try {
  var c = JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_KEY)}) || 'null');
  if (c && typeof c.analytics === 'boolean') {
    var a = c.marketing ? 'granted' : 'denied';
    gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:a,ad_user_data:a,ad_personalization:a});
  }
} catch (e) {}
`.trim();
  return <script id="consent-defaults" dangerouslySetInnerHTML={{ __html: code }} />;
}

/** Google Tag Manager (preferred) or GA4 directly. Never both. */
export function AnalyticsScripts() {
  if (GTM_ID) {
    return (
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(GTM_ID)});`}
      </Script>
    );
  }
  if (GA_ID) {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.gtag = window.gtag || function(){dataLayer.push(arguments);};
gtag('js', new Date());
gtag('config', ${JSON.stringify(GA_ID)});`}
        </Script>
      </>
    );
  }
  return null;
}

export function GtmNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(GTM_ID)}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
