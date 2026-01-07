"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface MenuItem {
  href: string;
  label: string;
  icon?: string;
}

const menuItems: MenuItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/products", label: "Products" },
  { href: "/products/new", label: "Add Product" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <aside
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #000000 0%, #0a0a0a 100%)",
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      
      <div style={{ padding: "0 24px 32px 24px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.5px",
            background: "linear-gradient(135deg, #e9d5ff 0%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Admin
        </h2>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "24px 16px", flex: 1 }}>
        {menuItems.map((item) => {
          let isActive = false;
          if (item.href === "/dashboard") {
            isActive = pathname === "/dashboard";
          } else if (item.href === "/products/new") {
            isActive = pathname === "/products/new";
          } else if (item.href === "/products") {
            isActive = pathname === "/products" || (pathname?.startsWith("/products/") && pathname !== "/products/new");
          }
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-menu-item ${isActive ? "sidebar-menu-item-active" : ""}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "12px",
                textDecoration: "none",
                color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.7)",
                background: isActive
                  ? "linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(139, 92, 246, 0.08) 100%)"
                  : "transparent",
                border: isActive ? "1px solid rgba(168, 85, 247, 0.25)" : "1px solid transparent",
                fontWeight: isActive ? 600 : 500,
                fontSize: "15px",
                position: "relative",
              }}
            >
              {item.icon && (
                <span style={{ fontSize: "18px", display: "flex", alignItems: "center" }}>
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "3px",
                    height: "60%",
                    background: "linear-gradient(180deg, #c084fc 0%, #a855f7 100%)",
                    borderRadius: "0 2px 2px 0",
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "24px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          style={{
            width: "100%",
            padding: "10px 16px",
            background: isLoggingOut
              ? "rgba(239, 68, 68, 0.3)"
              : "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "12px",
            color: "#fca5a5",
            fontSize: "14px",
            fontWeight: 500,
            cursor: isLoggingOut ? "not-allowed" : "pointer",
            marginBottom: "12px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (!isLoggingOut) {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
              e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoggingOut) {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
              e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
            }
          }}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
        <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.4)", textAlign: "center" }}>
          Admin Panel v1.0
        </div>
      </div>
    </aside>
  );
}

