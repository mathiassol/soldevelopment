import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Mathias Solheim — SolDevelopment";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f0f0e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif"
        }}
      >
        {/* Top-left monogram */}
        <div
          style={{
            position: "absolute",
            top: 64,
            left: 80,
            width: 48,
            height: 48,
            background: "#1c1917",
            borderRadius: 10,
            border: "1px solid #2a2826",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            fontWeight: 700,
            color: "#ececea"
          }}
        >
          S
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ececea",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            marginBottom: 24
          }}
        >
          Mathias Solheim
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#9a948c",
            letterSpacing: "-0.5px"
          }}
        >
          Developer · mathiassol.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
