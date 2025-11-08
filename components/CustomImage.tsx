import Image, { ImageProps } from "next/image";

interface CustomImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
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
  return (
    <div className={`relative ${className || ""}`} style={style}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        onError={onError}
        {...rest}
      />
    </div>
  );
}
