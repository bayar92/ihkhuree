"use client";

import {
  useCallback,
  useState,
  type CSSProperties,
  type SyntheticEvent,
} from "react";

/** Portrait/square images use contain (no crop); landscape uses cover unless `fit` is set. */
export function NewsCardFillImage({
  src,
  alt,
  className = "",
  style,
  fit = "auto",
  objectPosition,
  "aria-hidden": ariaHidden,
  onLoad: onLoadProp,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  /** Force contain/cover, or auto-detect from aspect ratio. */
  fit?: "auto" | "contain" | "cover";
  objectPosition?: string;
  "aria-hidden"?: boolean;
  onLoad?: (e: SyntheticEvent<HTMLImageElement>) => void;
}) {
  const [portraitOrSquare, setPortraitOrSquare] = useState<boolean | null>(null);

  const onLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth, naturalHeight } = e.currentTarget;
      setPortraitOrSquare(naturalHeight >= naturalWidth);
      onLoadProp?.(e);
    },
    [onLoadProp],
  );

  const objectFit =
    fit === "contain"
      ? "object-contain"
      : fit === "cover"
        ? "object-cover"
        : portraitOrSquare === null || portraitOrSquare
          ? "object-contain"
          : "object-cover";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      aria-hidden={ariaHidden}
      onLoad={onLoad}
      style={{ ...style, objectPosition: objectPosition ?? "center" }}
      className={`absolute inset-0 h-full w-full ${objectFit} ${className}`}
    />
  );
}
