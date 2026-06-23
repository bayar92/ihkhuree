"use client";

import {
  useCallback,
  useState,
  type CSSProperties,
  type SyntheticEvent,
} from "react";

/** Portrait images use contain (no head crop); landscape uses cover. */
export function NewsCardFillImage({
  src,
  alt,
  className = "",
  style,
  "aria-hidden": ariaHidden,
  onLoad: onLoadProp,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean;
  onLoad?: (e: SyntheticEvent<HTMLImageElement>) => void;
}) {
  const [portrait, setPortrait] = useState<boolean | null>(null);

  const onLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth, naturalHeight } = e.currentTarget;
      setPortrait(naturalHeight > naturalWidth);
      onLoadProp?.(e);
    },
    [onLoadProp],
  );

  const objectFit =
    portrait === null || portrait ? "object-contain" : "object-cover";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      aria-hidden={ariaHidden}
      onLoad={onLoad}
      style={style}
      className={`absolute inset-0 h-full w-full object-center ${objectFit} ${className}`}
    />
  );
}
