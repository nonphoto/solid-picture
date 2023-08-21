import { NullableSize } from '@solid-primitives/resize-observer'
import { ComponentProps, mergeProps, splitProps } from 'solid-js'
import { usePicture } from './Picture'
import { createImage } from './createImage'
import { SourceProps } from './Source'

function withSource<T extends ComponentProps<'img'>>(props: T, source: SourceProps) {
  const [imgProps] = splitProps(source, ['srcset'])
  return mergeProps(props, imgProps)
}

export function SuspendedImg(props: ComponentProps<'img'> & { size: NullableSize }) {
  const { currentSource } = usePicture()
  const image = createImage(() =>
    currentSource() ? withSource(props, currentSource()!) : undefined,
  )
  return <>{image()}</>
}
