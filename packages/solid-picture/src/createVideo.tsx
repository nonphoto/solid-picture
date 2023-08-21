import { MaybeAccessor, access } from '@solid-primitives/utils'
import {
  ComponentProps,
  Resource,
  createEffect,
  createResource,
  createSignal,
  splitProps,
} from 'solid-js'
import { createMounted } from './utils'

export class VideoError extends Error {
  target: HTMLVideoElement

  constructor(message: string, target: HTMLVideoElement) {
    super(message)
    this.target = target
  }
}

export function loadVideo(props: ComponentProps<'video'>): Promise<HTMLVideoElement> {
  return new Promise<HTMLVideoElement>((resolve, reject) => {
    const [, videoProps] = splitProps(props, ['ref'])
    const [resolved, setResolved] = createSignal<HTMLVideoElement>()
    console.log(videoProps)

    createEffect(() => {
      if (resolved() && typeof props.ref === 'function') {
        props.ref(resolved()!)
      }
    })

    return (
      <video
        {...videoProps}
        onCanPlayThrough={event => {
          console.log(event)
          setResolved(event.currentTarget)
          resolve(event.currentTarget)
        }}
        onError={event => {
          reject(
            new VideoError(
              `Unable to load video for src ${event.currentTarget.currentSrc}`,
              event.currentTarget,
            ),
          )
        }}
        muted
        loop
        playsinline
        autoplay
      />
    ) as HTMLVideoElement
  })
}

export function createVideo(
  props: MaybeAccessor<ComponentProps<'video'> | undefined>,
): Resource<HTMLVideoElement> {
  const mounted = createMounted()
  const [resource] = createResource(
    () => mounted() && access(props),
    props => loadVideo(props),
  )
  return resource
}
