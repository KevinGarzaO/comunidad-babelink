import React, { useState } from "react";
import { ErrorImage } from "../ErrorImage";
import { CustomImage } from "../CustomImage";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const { style, className } = props;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${
        className ?? ""
      }`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <ErrorImage
          src={ERROR_IMG_SRC}
          ERROR_IMG_SRC="/fallback.png"
          width="600"
          height={400}
        />
      </div>
    </div>
  ) : (
    <CustomImage
      src={ERROR_IMG_SRC}
      alt={"100"}
      className="h-48 w-full rounded-lg overflow-hidden"
      style={{ objectFit: "cover" }}
      onError={handleError}
    />
  );
}
