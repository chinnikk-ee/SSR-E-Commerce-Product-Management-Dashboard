import Sidebar from "./Sidebar";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "32px",
          background: "#000000",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
}
