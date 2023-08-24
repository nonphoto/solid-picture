import { Accessor, createEffect, createResource, mergeProps, splitProps } from 'solid-js'
import { usePicture } from './Picture'
import { Size } from '@solid-primitives/utils'
import { createMounted } from './utils'

export interface SuspendedImgProps {
  id?: string
  src?: string
  srcset?: string
  sizes?: string
  width?: string | number
  height?: string | number
  initialSize: Size
  ref?: (element: HTMLImageElement) => void
}

export class ImageError extends Error {
  target: HTMLImageElement

  constructor(message: string, target: HTMLImageElement) {
    super(message)
    this.target = target
  }
}

export function createImage(props: SuspendedImgProps): Accessor<HTMLImageElement | undefined> {
  const [, elementProps] = splitProps(props, ['ref', 'initialSize'])
  const mounted = createMounted()
  const [resource] = createResource(mounted, () => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const mounted = createMounted()
      const element = (
        <img
          {...elementProps}
          width={mounted() ? undefined : props.initialSize.width}
          height={mounted() ? undefined : props.initialSize.height}
          onLoad={() => {
            resolve(element)
          }}
          onError={() => {
            reject(new ImageError(`Unable to load image for src '${element.currentSrc}'`, element))
          }}
        />
      ) as HTMLImageElement

      createEffect(() => {
        props.ref?.(element)
      })
    })
  })

  return resource
}

export function SuspendedImg(props: SuspendedImgProps) {
  const { currentSource } = usePicture()
  const mergedProps = mergeProps(props, {
    get srcset() {
      return currentSource()?.srcset ?? props.srcset
    },
  })
  const image = createImage(mergedProps)
  return <>{image()}</>
}
