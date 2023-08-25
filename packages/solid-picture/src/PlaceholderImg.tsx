import { usePicture } from './Picture'
import { MediaElementProps } from './types'

export type PlaceholderImgProps = MediaElementProps & {
  ref?: (element: HTMLImageElement) => void
}

export function PlaceholderImg(props: PlaceholderImgProps) {
  const { currentSource } = usePicture()
  return <img {...props} src={currentSource()?.placeholderSrc ?? props.src} />
}
