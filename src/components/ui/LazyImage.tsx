"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

export interface LazyImageProps extends ImageProps {
  wrapperClassName?: string;
  skeletonClassName?: string;
  showSkeleton?: boolean;
}

export function LazyImage({
  className = "",
  wrapperClassName = "",
  skeletonClassName = "",
  showSkeleton = true,
  alt,
  onLoad,
  priority = false,
  fill,
  loading,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const containerClasses = fill
    ? `absolute inset-0 w-full h-full overflow-hidden ${wrapperClassName}`
    : `relative inline-block overflow-hidden ${wrapperClassName}`;

  return (
    <div className={containerClasses}>
      {/* Shimmer skeleton while image is loading */}
      {showSkeleton && !isLoaded && (
        <div
          className={`absolute inset-0 bg-stone-200/70 animate-pulse pointer-events-none z-0 rounded-[inherit] ${skeletonClassName}`}
          aria-hidden="true"
        />
      )}

      <Image
        alt={alt}
        fill={fill}
        priority={priority}
        loading={priority ? "eager" : loading || "lazy"}
        className={`transition-all duration-500 ease-out ${
          isLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-[6px] scale-[1.02]"
        } ${className}`}
        onLoad={(e) => {
          setIsLoaded(true);
          onLoad?.(e);
        }}
        {...props}
      />
    </div>
  );
}
