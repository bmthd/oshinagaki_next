import React, { useEffect, useState } from "react";
import { FaTwitter, FaFacebook, FaLine, FaClipboard } from "react-icons/fa";
import Link from "next/link";

export const ShareButtons = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("/");

  useEffect(() => {
    setTitle(document.title);
    setUrl(window.location.href);
  }, []);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
    url
  )}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(title + " " + url);
    alert("クリップボードにコピーしました");
  };

  return (
    <>
      <p className="text-center font-bold mb-2">このページをシェア</p>
      <div className="flex justify-around">
        <Link href={twitterUrl}>
          <FaTwitter size={20} />
          Twitter
        </Link>
        <Link href={facebookUrl}>
          <FaFacebook size={20} />
          Facebook
        </Link>
        <Link href={lineUrl}>
          <FaLine size={20} />
          LINE
        </Link>
        <button onClick={copyToClipboard}>
          <FaClipboard size={20} />
          コピー
        </button>
      </div>
    </>
  );
};
