"use client"

import Image, { ImageProps } from "next/image"

type CldImageProps = Omit<ImageProps, "src"> & { src: string }

const CldImage = ({ src, unoptimized, ...props }: CldImageProps) => {
  const shouldUnopt =
    src.startsWith("blob:") ||
    src.startsWith("data:") ||
    src.startsWith("/uploads/")
  return <Image src={src} unoptimized={unoptimized || shouldUnopt} {...props} />
}

export default CldImage
