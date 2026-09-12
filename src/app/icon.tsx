import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#facc15", // Warna kuning cerah (Brutalist style)
          borderRadius: "50%",
          color: "black",
          fontSize: 18,
          fontWeight: 900,
          border: "4px solid black",
          letterSpacing: "-0.5px",
        }}
      >
        C
      </div>
    ),
    { ...size }
  );
}
