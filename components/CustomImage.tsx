import Image, { ImageProps } from "next/image";

interface CustomImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string | Blob | undefined;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  onError?: React.ReactEventHandler<HTMLImageElement>;
}

export function CustomImage({
  src,
  alt,
  className,
  style,
  onError,
  ...rest
}: CustomImageProps) {
  // Convertimos Blob → object URL
  const finalSrc = (() => {
    if (!src) return "/fallback.png"; // fallback si no hay src
    if (typeof src === "string") return src; // si es string, va directo
    return URL.createObjectURL(src); // si es Blob → URL temporal
  })();

  return (
    <div className={`relative ${className || ""}`} style={style}>
      <Image
        src={finalSrc}
        alt={alt || "image"}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        onError={onError}
        {...rest}
      />
    </div>
  );
}
