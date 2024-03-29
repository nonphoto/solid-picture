import imageUrlBuilder from '@sanity/image-url'
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import type {
  SanityAsset,
  SanityClientLike,
  SanityImageCrop,
  SanityImageDimensions,
  SanityImageHotspot,
  SanityModernClientLike,
  SanityProjectDetails,
} from '@sanity/image-url/lib/types/types.js'

export type SanityAssetWithMetadata = SanityAsset & {
  metadata?: {
    lqip?: string | null
    dimensions?: SanityImageDimensions | null
  }
}

export interface SanityImageObjectWithMetadata {
  asset: SanityAssetWithMetadata
  crop?: SanityImageCrop | null
  hotspot?: SanityImageHotspot | null
}

export interface Size {
  width: number
  height: number
}

export interface Position {
  x: number
  y: number
}

export interface ImagePropsReturn {
  src: string
  srcset: string
  placeholderSrc?: string
  naturalSize?: Size
  objectPosition?: Position
}

export const defaultWidths = [
  6016, // 6K
  5120, // 5K
  4480, // 4.5K
  3840, // 4K
  3200, // QHD+
  2560, // WQXGA
  2048, // QXGA
  1920, // 1080p
  1668, // iPad
  1280, // 720p
  1080, // iPhone 6-8 Plus
  960,
  720, // iPhone 6-8
  640, // 480p
  480,
  360,
  240,
]

export const lowResWidth = 24

export const defaultMetaImageWidth = 1200

export const defaultQuality = 90

function fit(containee: Size, container: Size) {
  const sx = container.width / containee.width
  const sy = container.height / containee.height
  const s = Math.min(sx, sy)
  return {
    width: containee.width * s,
    height: containee.height * s,
  }
}

function buildAspectRatio(builder: ImageUrlBuilder, width: number, aspectRatio?: number) {
  if (aspectRatio) {
    return builder.width(width).height(Math.round(width * aspectRatio))
  } else {
    return builder.width(width)
  }
}

export function imageProps({
  image,
  client,
  widths = defaultWidths,
  quality = defaultQuality,
  aspectRatio,
}: {
  image: SanityImageObjectWithMetadata
  client: SanityClientLike | SanityProjectDetails | SanityModernClientLike
  widths?: number[]
  quality?: number
  aspectRatio?: number
}): ImagePropsReturn {
  const sortedWidths = Array.from(widths).sort((a, b) => a - b)

  const builder = imageUrlBuilder(client).image(image).quality(quality).auto('format')

  const metadata = image.asset.metadata

  const cropSize = metadata?.dimensions
    ? image.crop
      ? {
          width: metadata.dimensions.width - image.crop.left - image.crop.right,
          height: metadata.dimensions.height - image.crop.top - image.crop.bottom,
        }
      : metadata.dimensions
    : undefined

  const naturalSize = cropSize
    ? aspectRatio
      ? fit({ width: 1, height: aspectRatio }, cropSize)
      : cropSize
    : undefined

  return {
    src: metadata?.lqip ?? buildAspectRatio(builder, lowResWidth, aspectRatio).url(),
    srcset: sortedWidths
      .map(width => `${buildAspectRatio(builder, width, aspectRatio).url()} ${width}w`)
      .join(','),
    placeholderSrc: metadata?.lqip ?? undefined,
    naturalSize,
    objectPosition: image.hotspot ?? undefined,
  }
}

export function metaImageUrl({
  image,
  client,
  width = defaultMetaImageWidth,
  quality = defaultQuality,
}: {
  image: SanityImageObjectWithMetadata
  client: SanityClientLike | SanityProjectDetails | SanityModernClientLike
  width: number
  quality?: number
}) {
  return imageUrlBuilder(client).image(image).quality(quality).auto('format').width(width).url()
}
