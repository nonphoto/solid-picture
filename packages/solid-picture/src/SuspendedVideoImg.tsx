import { ComponentProps, mergeProps } from 'solid-js'
import { usePicture } from './Picture'
import { createVideo } from './createVideo'
import { SourceProps } from './Source'

function withSource<T extends ComponentProps<'video'> & { videoSrc?: string }>(
  props: T,
  source: SourceProps,
) {
  return mergeProps(props, {
    get src() {
      return source.videoSrc ?? props.videoSrc
    },
  })
}

export function SuspendedVideoImg(props: ComponentProps<'video'>) {
  const { currentSource } = usePicture()
  const video = createVideo(() =>
    currentSource() ? withSource(props, currentSource()!) : undefined,
  )
  return <>{video()}</>
}
