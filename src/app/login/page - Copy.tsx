"use client";

import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a0a2e 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
