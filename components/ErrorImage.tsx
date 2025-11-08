import Image, { ImageProps } from "next/image";

interface ErrorImageProps
  extends Omit<ImageProps, "src" | "alt" | "width" | "height"> {
  src: string;
  ERROR_IMG_SRC: string;
  width?: number | string;
  height?: number | string;
}

export function ErrorImage({
  src,
  ERROR_IMG_SRC,
  width = 500,
  height = 300,
  ...rest
}: ErrorImageProps) {
  // Convierte strings a números y asegura fallback numérico válido
  const numericWidth: number =
    typeof width === "string" ? parseInt(width, 10) || 500 : (width as number);
  const numericHeight: number =
    typeof height === "string"
      ? parseInt(height, 10) || 300
      : (height as number);

  return (
    <Image
      src={ERROR_IMG_SRC}
      alt="Error loading image"
      width={numericWidth}
      height={numericHeight}
      data-original-url={src}
      {...rest}
    />
  );
}
