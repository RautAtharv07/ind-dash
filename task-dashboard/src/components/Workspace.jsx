// src/components/Workspace.jsx
import React from "react";

function Workspace({ onGoToDashboard }) {
  const workspaceButtons = [
    { label: "📊 Dashboard", action: onGoToDashboard },
    { label: "🗓️ Calendar", action: () => alert("Open Calendar") },
    { label: "📈 Reports", action: () => alert("Open Reports") },
    { label: "⚡ AI Assistant", action: () => alert("Launch AI Assistant") },
  ];

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        gap: "20px",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      {/* Workspace Title */}
      <h1 style={{ marginBottom: "30px", fontSize: "28px", fontWeight: "bold" }}>
        🚀 My Workspace
      </h1>

      {/* Minimal Feature Buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "250px",
        }}
      >
        {workspaceButtons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.action}
            style={{
              padding: "15px",
              background: "linear-gradient(135deg, #ffffff, #f7f7f7)",
              border: "1px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "16px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, #f0f0f0, #e6e6e6)";
              e.target.style.transform = "scale(1.03)";
            }}
            onMouseOut={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, #ffffff, #f7f7f7)";
              e.target.style.transform = "scale(1)";
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Workspace;
