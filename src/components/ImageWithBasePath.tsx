"use client";

import Image, { ImageProps } from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Wraps next/image and prepends basePath to local paths (e.g. /images/logo.png).
 * Required when using basePath in next.config so static images from public/ load correctly.
 */
export default function ImageWithBasePath(props: ImageProps) {
  const { src, ...rest } = props;
  const resolvedSrc =
    typeof src === "string" && src.startsWith("/")
      ? `${basePath}${src}`
      : src;
  return <Image {...rest} src={resolvedSrc} />;
}
