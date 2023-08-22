import {
  ComponentProps,
  mergeProps,
  Resource,
  createEffect,
  createResource,
  createSignal,
  splitProps,
  onCleanup,
  createRoot,
} from 'solid-js'
import { usePicture } from './Picture'
import { SourceProps } from './Source'
import { MaybeAccessor, access } from '@solid-primitives/utils'
import { useHlsResource } from './utils'

export class HlsVideoError extends Error {
  target: HTMLVideoElement

  constructor(message: string, target: HTMLVideoElement) {
    super(message)
    this.target = target
  }
}

export function createHlsVideo(
  props: MaybeAccessor<ComponentProps<'video'> | undefined>,
): Resource<HTMLVideoElement> {
  const hlsResource = useHlsResource()
  const [resource] = createResource(
    () => hlsResource() && access(props),
    props => {
      return new Promise<HTMLVideoElement>((resolve, reject) => {
        createRoot(() => {
          const [, videoProps] = splitProps(props, ['ref', 'src'])
          const [resolved, setResolved] = createSignal<HTMLVideoElement>()

          createEffect(() => {
            if (resolved() && typeof props.ref === 'function') {
              props.ref(resolved()!)
            }
          })

          const element = (
            <video {...videoProps} muted loop playsinline autoplay />
          ) as HTMLVideoElement

          createEffect(() => {
            if (props.src) {
              const Hls = hlsResource()!.default
              const hls = new Hls()
              hls.loadSource(props.src)
              hls.attachMedia(element)
              hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setResolved(element)
                resolve(element)
              })
              hls.on(Hls.Events.ERROR, () => {
                reject(
                  new HlsVideoError(
                    `Unable to load HLS video for src '${element.currentSrc}'`,
                    element,
                  ),
                )
              })
              onCleanup(() => {
                hls.destroy()
              })
            }
          })
        })
      })
    },
  )
  return resource
}

function withSource<T extends ComponentProps<'video'> & { videoSrc?: string }>(
  props: T,
  source: SourceProps = {},
) {
  return mergeProps(props, {
    get src() {
      return source.videoSrc ?? props.videoSrc
    },
  })
}

export function SuspendedHlsVideoImg(props: ComponentProps<'video'> & { videoSrc?: string }) {
  console.log(props.videoSrc)
  const { currentSource } = usePicture()
  const video = createHlsVideo(() => withSource(props, currentSource()))
  return <>{video()}</>
}
