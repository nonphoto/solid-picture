import { NullableSize } from '@solid-primitives/resize-observer'
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
