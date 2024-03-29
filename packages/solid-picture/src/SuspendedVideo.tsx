import {
  Resource,
  createEffect,
  createRenderEffect,
  createResource,
  mergeProps,
  onCleanup,
  splitProps,
} from 'solid-js'
import { usePicture } from './Picture'
import { createMounted } from './utils'
import { MediaElementProps, VideoMode } from './types'

export type SuspendedVideoProps = MediaElementProps & {
  mode?: VideoMode
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
  const [, elementProps] = splitProps(props, ['src', 'ref', 'mode'])
  const mounted = createMounted()
  const [hlsResource] = createResource(
    () => mounted() && props.mode === 'hls',
    () => {
      console.log('import hls')
      return import('hls.js')
    },
  )
  const [resource] = createResource(
    () => (props.mode === 'hls' ? mounted() && hlsResource() : mounted()),
    hlsResource => {
      return new Promise<HTMLVideoElement>((resolve, reject) => {
        const mounted = createMounted()
        const element = (
          hlsResource === true ? (
            <video
              {...elementProps}
              src={props.src}
              onCanPlayThrough={() => {
                resolve(element)
              }}
              onError={() => {
                reject(
                  new VideoError(`Unable to load video for src '${element.currentSrc}'`, element),
                )
              }}
              muted
              loop
              playsinline
              autoplay
            />
          ) : (
            <video
              {...elementProps}
              onCanPlayThrough={() => {
                resolve(element)
              }}
              muted
              loop
              playsinline
              autoplay
              style={
                mounted()
                  ? props.style
                  : {
                      position: 'fixed',
                      visibility: 'hidden',
                      'pointer-events': 'none',
                    }
              }
            />
          )
        ) as HTMLVideoElement

        createRenderEffect(() => {
          if (hlsResource !== true && props.src) {
            const Hls = hlsResource.default
            const hls = new Hls()
            hls.loadSource(props.src)
            hls.attachMedia(element)
            hls.once(Hls.Events.MANIFEST_PARSED, () => {
              document.body.appendChild(element)
            })
            hls.once(Hls.Events.ERROR, () => {
              reject(
                new VideoError(`Unable to load HLS video for src '${element.currentSrc}'`, element),
              )
            })
            onCleanup(() => {
              hls.destroy()
            })
          }
        })

        createEffect(() => {
          props.ref?.(element)
        })
      })
    },
  )

  return resource
}

export function SuspendedVideo(props: SuspendedVideoProps) {
  const { currentSource } = usePicture()
  const mergedProps = mergeProps(props, {
    get src() {
      return currentSource()?.videoSrc ?? props.src
    },
    get mode() {
      return currentSource()?.videoMode ?? props.mode
    },
  })
  const video = createVideo(mergedProps)
  return <>{video()}</>
}
