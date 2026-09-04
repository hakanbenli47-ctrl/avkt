"use client";

import Image from "next/image";
import { useState } from "react";

export default function BlogPostImage({ slug, title, variant = "thumb" }: { slug: string; title: string; variant?: "thumb" | "hero" }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <div className={`blog-post-image ${variant}`}>
      <Image
        src={`/api/blog-image/${encodeURIComponent(slug)}`}
        alt={`${title} kapak görseli`}
        fill
        sizes={variant === "hero" ? "(max-width: 980px) 100vw, 900px" : "(max-width: 760px) 100vw, 280px"}
        unoptimized
        onError={() => setFailed(true)}
      />
    </div>
  );
}
