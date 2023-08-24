import { usePicture } from './Picture'

export interface PlaceholderImgProps {
  id?: string
  src?: string
  width?: string | number
  height?: string | number
  ref?: (element: HTMLImageElement) => void
}

export function PlaceholderImg(props: PlaceholderImgProps) {
  const { currentSource } = usePicture()
  return <img {...props} src={currentSource()?.placeholderSrc ?? props.src} />
}
