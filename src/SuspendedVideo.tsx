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
import { MediaElementProps, VideoMode } from './types'
import { createMounted } from './utils'

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
  const [, elementProps] = splitProps(props, ['ref', 'mode'])
  const mounted = createMounted()
  const [hlsResource] = createResource(
    () => mounted() && props.mode === 'hls',
    () => import('hls.js'),
  )

  createEffect(() => {
    console.log(props.mode)
  })
  const [resource] = createResource(
    () => mounted() && (props.mode === 'hls' ? hlsResource() != null : true),
    hlsResource => {
      return new Promise<HTMLVideoElement>((resolve, reject) => {
        console.log('promise')
        const mounted = createMounted()
        const element = (
          props.mode === 'hls' && hlsResource === true ? (
            <video
              {...elementProps}
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
              data-mode={props.mode}
              controls={false}
            />
          ) : (
            <video
              {...elementProps}
              onCanPlay={() => {
                console.log('onCanPlay')
              }}
              onCanPlayThrough={() => {
                console.log('onCanPlayThrough')
                resolve(element)
              }}
              muted
              loop
              playsinline
              autoplay
              controls={false}
              data-mode={props.mode}
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

        console.log(element)
        resolve(element)

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
      console.log(currentSource()?.videoSrc, props.src)
      return currentSource()?.videoSrc ?? props.src
    },
    get mode() {
      return currentSource()?.videoMode ?? props.mode
    },
  })
  const video = createVideo(mergedProps)
  createEffect(() => {
    console.log(video())
  })
  return <>{video()}</>
}
