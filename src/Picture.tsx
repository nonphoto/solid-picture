import { ComponentProps, JSX } from 'solid-js'

export interface PictureProps extends ComponentProps<'picture'> {
  aspectRatio?: number
  placeholderSrc?: string
  style?: JSX.CSSProperties
}

export function Picture({ aspectRatio, placeholderSrc, ...props }: PictureProps) {
  return (
    <picture
      {...props}
      style={{
        'aspect-ratio': aspectRatio,
        'background-image': placeholderSrc ? `url(${placeholderSrc})` : undefined,
        ...props.style,
      }}
    />
  )
}
