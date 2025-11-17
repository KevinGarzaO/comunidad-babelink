import Image, { ImageProps } from "next/image";

interface CustomImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string | Blob | undefined;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  googleSize?: number; // 👈 tamaño dinámico para avatares de Google
}

export function CustomImage({
  src,
  alt,
  className,
  style,
  onError,
  googleSize = 128, // 👈 tamaño default si no se pasa
  ...rest
}: CustomImageProps) {
  const finalSrc = (() => {
    if (!src) return "/fallback.png";

    // Si es Blob → convertir
    if (src instanceof Blob) {
      return URL.createObjectURL(src);
    }

    // Si es string → detectar Google Avatar URL
    if (typeof src === "string") {
      if (src.includes("lh3.googleusercontent.com")) {
        // reemplazar sXX-c por s${googleSize}-c
        return src.replace(/=s\d+-c$/, `=s${googleSize}-c`);
      }

      return src;
    }

    return "https://demofree.sirv.com/nope-not-here.jpg";
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
