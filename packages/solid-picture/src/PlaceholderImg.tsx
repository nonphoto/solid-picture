import { ComponentProps, splitProps } from 'solid-js'
import { usePicture } from './Picture'

export function PlaceholderImg(props: ComponentProps<'img'>) {
  const [, otherProps] = splitProps(props, ['src', 'srcset', 'sizes'])
  const { currentSource } = usePicture()

  return <img {...otherProps} src={currentSource()?.placeholderSrc ?? props.src} />
}
