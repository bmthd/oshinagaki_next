import { ImageResponse } from "next/server";

export const runtime = "edge";

export const contentType = "image/png";

export const alt = "コミケお品書きツイートまとめサイト";

export const size = { width: 1200, height: 630 };

const Image = () => {
  const siteName = "コミケお品書きツイートまとめサイト";
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {siteName}
      </div>
    ),
    {
      ...size,
    }
  );
};

export default Image;
