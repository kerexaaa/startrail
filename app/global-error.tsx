"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: "'Inter', sans-serif, system-ui",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "32px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            textAlign: "center",
            maxWidth: "400px",
            width: "90%",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 16px 0" }}>
            💥 Critical System Failure
          </h2>
          <p style={{ color: "rgba(255, 255, 255, 0.7)", margin: "0 0 24px 0" }}>
            A fatal error occurred. Please reload the page.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "9999px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Reload App
          </button>
        </div>
      </body>
    </html>
  );
}
