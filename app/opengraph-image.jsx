import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "120px",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            display: "flex",
          }}
        />

        {/* Logo badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            🏥
          </div>
          <span
            style={{
              fontSize: "28px",
              fontWeight: "800",
              color: "white",
              letterSpacing: "-0.5px",
            }}
          >
            MediTime
          </span>
        </div>

        {/* Main heading */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: "800",
            color: "white",
            lineHeight: 1.1,
            marginBottom: "20px",
            letterSpacing: "-1px",
          }}
        >
          Zakazivanje
          <br />
          lekarskih pregleda
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "26px",
            color: "rgba(255,255,255,0.75)",
            fontWeight: "400",
            marginBottom: "40px",
          }}
        >
          Brzo, jednostavno i pouzdano — online.
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "32px" }}>
          {[
            { value: "4.8★", label: "Prosečna ocena" },
            { value: "24h",  label: "Online zakazivanje" },
            { value: "100%", label: "Besplatno" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                background: "rgba(255,255,255,0.12)",
                borderRadius: "14px",
                padding: "16px 24px",
              }}
            >
              <span style={{ fontSize: "24px", fontWeight: "800", color: "white" }}>
                {s.value}
              </span>
              <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
