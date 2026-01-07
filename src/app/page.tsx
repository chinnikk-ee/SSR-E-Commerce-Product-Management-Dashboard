"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a0a2e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(168, 85, 247, 0.2)",
          borderRadius: "24px",
          padding: "48px",
          boxShadow: "0 8px 32px rgba(168, 85, 247, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: 700,
            marginBottom: "16px",
            background: "linear-gradient(135deg, #e9d5ff 0%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Product Management Dashboard
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "32px",
            lineHeight: "1.6",
          }}
        >
          Welcome to the Product Management Dashboard. This is an admin-only application
          designed for authorized administrators to manage products, view analytics, and
          oversee inventory. Access is restricted to pre-created admin accounts.
        </p>
        <Link
          href="/login"
          style={{
            display: "inline-block",
            padding: "14px 32px",
            background: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: "12px",
            fontWeight: 600,
            fontSize: "16px",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            boxShadow: "0 4px 16px rgba(168, 85, 247, 0.3)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(168, 85, 247, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(168, 85, 247, 0.3)";
          }}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
