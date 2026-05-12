"use client";

export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAF7F2" }}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: "#1F2A3A", marginBottom: 8 }}>Something went wrong</h1>
            <p style={{ color: "#64748B" }}>Please try refreshing the page</p>
          </div>
        </div>
      </body>
    </html>
  );
}
