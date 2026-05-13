import { ImageResponse } from "next/og";
import { locales } from "@/lib/i18n/config";

export const alt = "Eray Kaan Cevik — Developer · .NET & Web";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#000",
          color: "#fff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 900,
            height: 900,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(167,139,250,0.35), transparent 70%)",
            filter: "blur(40px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -200,
            width: 800,
            height: 800,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(232,121,249,0.30), transparent 70%)",
            filter: "blur(40px)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18}}>
          <div
            style={{
              width: 64,
              height: 64,
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: -1,
            }}
          >
            EK
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 22, color: "#fff" }}>Eray Kaan Cevik</span>
            <span
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                letterSpacing: 4,
              }}
            >
              developer · .net &amp; web
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24}}>
          <span
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
              letterSpacing: 6,
            }}
          >
            &lt; Developer · Full Stack · .NET &amp; Web /&gt;
          </span>
          <span
            style={{
              fontSize: 132,
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: -4,
              color: "#fff",
            }}
          >
            Eray Kaan
          </span>
          <span
            style={{
              fontSize: 132,
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: -4,
              background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.45) 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Cevik.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 16,
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
            letterSpacing: 5,
          }}
        >
          <span>Zürich · CH</span>
          <span>since 2020</span>
          <span>eraycevik.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
