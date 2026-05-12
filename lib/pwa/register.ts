"use client";

export function registerServiceWorker() {
  if (typeof window === "undefined") return;
  if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Service worker registration failed — app still works without it
      });
    });
  }
}
