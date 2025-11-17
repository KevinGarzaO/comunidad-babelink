"use client";

import React, { useState } from "react";
import { ErrorImage } from "../ErrorImage";
import { CustomImage } from "../CustomImage";

const FALLBACK_SRC = "/images/image-fallback.png";

export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const { src, alt, className, style } = props;
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const finalSrc = (() => {
    if (!src) return FALLBACK_SRC;
    if (typeof src === "string") return src;
    return URL.createObjectURL(src); // aquí ya sabemos que es Blob
  })();

  return didError ? (
    <ErrorImage
      src={finalSrc}
      ERROR_IMG_SRC={FALLBACK_SRC}
      alt={alt ?? "fallback"}
      className={className}
      style={style}
    />
  ) : (
    <CustomImage
      src={src || FALLBACK_SRC}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
    />
  );
}
