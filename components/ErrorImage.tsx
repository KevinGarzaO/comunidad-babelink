// components/ErrorImage.tsx
import Image, { ImageProps } from "next/image";

interface ErrorImageProps
  extends Omit<ImageProps, "src" | "width" | "height" | "alt"> {
  src: string; // url original (para data attribute)
  ERROR_IMG_SRC: string; // fallback url
  alt?: string; // ahora opcional
  width?: number | string;
  height?: number | string;
}

export function ErrorImage({
  src,
  ERROR_IMG_SRC,
  alt = "Error loading image",
  width = 500,
  height = 300,
  ...rest
}: ErrorImageProps) {
  const numericWidth =
    typeof width === "string" ? parseInt(width, 10) || 500 : (width as number);
  const numericHeight =
    typeof height === "string"
      ? parseInt(height, 10) || 300
      : (height as number);

  return (
    <Image
      src={ERROR_IMG_SRC}
      alt={alt}
      width={numericWidth}
      height={numericHeight}
      data-original-url={src}
      {...rest}
    />
  );
}
