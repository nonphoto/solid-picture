import { Resource, createEffect, createResource, mergeProps, splitProps } from 'solid-js'
import { usePicture } from './Picture'
import { createMounted } from './utils'

export interface SuspendedVideoProps {
  id?: string
  src?: string
  width?: string | number
  height?: string | number
  ref?: (element: HTMLVideoElement) => void
}

export class VideoError extends Error {
  target: HTMLVideoElement

  constructor(message: string, target: HTMLVideoElement) {
    super(message)
    this.target = target
  }
}

export function createVideo(props: SuspendedVideoProps): Resource<HTMLVideoElement> {
  const [, elementProps] = splitProps(props, ['ref'])
  const mounted = createMounted()
  const [resource] = createResource(mounted, () => {
    return new Promise<HTMLVideoElement>((resolve, reject) => {
      const element = (
        <video
          {...elementProps}
          onCanPlayThrough={() => {
            resolve(element)
          }}
          onError={() => {
            reject(new VideoError(`Unable to load video for src '${element.currentSrc}'`, element))
          }}
          muted
          loop
          playsinline
          autoplay
        />
      ) as HTMLVideoElement

      createEffect(() => {
        props.ref?.(element)
      })
    })
  })

  return resource
}

export function SuspendedVideo(props: SuspendedVideoProps) {
  const { currentSource } = usePicture()
  const mergedProps = mergeProps(props, {
    get src() {
      return currentSource()?.videoSrc ?? props.src
    },
  })
  const video = createVideo(mergedProps)
  return <>{video()}</>
}
