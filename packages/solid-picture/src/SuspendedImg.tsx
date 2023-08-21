import { NullableSize } from '@solid-primitives/resize-observer'
import {
  ComponentProps,
  Resource,
  createEffect,
  createResource,
  createSignal,
  mergeProps,
  splitProps,
} from 'solid-js'
import { usePicture } from './Picture'
import { SourceProps } from './Source'
import { MaybeAccessor, access } from '@solid-primitives/utils'
import { createMounted } from './utils'

export class ImageError extends Error {
  target: HTMLImageElement

  constructor(message: string, target: HTMLImageElement) {
    super(message)
    this.target = target
  }
}

export function loadImage(props: ComponentProps<'img'> & { size: NullableSize }) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const [, imgProps] = splitProps(props, ['ref', 'size'])
    const [resolved, setResolved] = createSignal<HTMLImageElement>()

    createEffect(() => {
      if (resolved() && typeof props.ref === 'function') {
        props.ref(resolved()!)
      }
    })

    return (
      <img
        {...imgProps}
        width={resolved() ? undefined : props.size.width ?? undefined}
        height={resolved() ? undefined : props.size.height ?? undefined}
        onLoad={event => {
          setResolved(event.currentTarget)
          resolve(event.currentTarget)
        }}
        onError={event => {
          reject(
            new ImageError(
              `Unable to load image for src ${event.currentTarget.currentSrc}`,
              event.currentTarget,
            ),
          )
        }}
      />
    ) as HTMLImageElement
  })
}

export function createImage(
  props: MaybeAccessor<(ComponentProps<'img'> & { size: NullableSize }) | undefined>,
): Resource<HTMLImageElement> {
  const mounted = createMounted()
  const [resource] = createResource(
    () => mounted() && access(props),
    props => loadImage(props),
  )
  return resource
}

function withSource<T extends ComponentProps<'img'>>(props: T, source: SourceProps = {}) {
  const [imgProps] = splitProps(source, ['srcset'])
  return mergeProps(props, imgProps)
}

export function SuspendedImg(props: ComponentProps<'img'> & { size: NullableSize }) {
  const { currentSource } = usePicture()
  const image = createImage(() => withSource(props, currentSource()))
  return <>{image()}</>
}
