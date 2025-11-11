// Optional Analytics - Disabled by default
// This script will only load if enabled via a configuration flag

const AnalyticsConfig = {
  enabled: false, // Set to true to enable tracking
  provider: "plausible", // Options: 'plausible', 'fathom', 'simple'
  siteId: "", // Configure your analytics site ID
};

class Analytics {
  constructor(config) {
    this.config = config;
    if (config.enabled) {
      this.init();
    }
  }

  init() {
    switch (this.config.provider) {
      case "plausible":
        this.loadPlausible();
        break;
      case "fathom":
        this.loadFathom();
        break;
      default:
        console.log("Analytics provider not configured");
    }
  }

  loadPlausible() {
    // Plausible Analytics
    window.dataLayerName = "dataLayer";
    window.plausible =
      window.plausible ||
      function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };

    const script = document.createElement("script");
    script.defer = true;
    script.src = `https://plausible.io/js/script.js`;
    script.setAttribute("data-domain", window.location.hostname);
    document.head.appendChild(script);

    console.log("Plausible Analytics loaded");
  }

  loadFathom() {
    // Fathom Analytics
    const script = document.createElement("script");
    script.src = `https://cdn.usefathom.com/script.js`;
    script.setAttribute("data-site", this.config.siteId);
    script.defer = true;
    document.head.appendChild(script);

    console.log("Fathom Analytics loaded");
  }

  trackEvent(eventName, data = {}) {
    if (!this.config.enabled) return;

    if (typeof window.plausible === "function") {
      window.plausible(eventName, { props: data });
    }

    console.log(`Event tracked: ${eventName}`, data);
  }
}

// Initialize analytics if enabled
document.addEventListener("DOMContentLoaded", () => {
  window.analytics = new Analytics(AnalyticsConfig);
});

// Helper function to track custom events
function trackAnalyticsEvent(eventName, data = {}) {
  if (window.analytics) {
    window.analytics.trackEvent(eventName, data);
  }
}
