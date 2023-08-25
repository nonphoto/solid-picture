import { Show, Suspense, createSignal, createUniqueId, splitProps } from 'solid-js'
import { isSize, maybe } from './utils'
import { createElementSize } from '@solid-primitives/resize-observer'
import { ImgStyle } from './ImgStyle'
import { SuspendedImg } from './SuspendedImg'
import { stylePx } from './css'
import { PlaceholderImg } from './PlaceholderImg'
import { Size } from '@solid-primitives/utils'
import { SuspendedVideo } from './SuspendedVideo'
import { MediaElementProps, VideoMode } from './types'

export type ImgProps = MediaElementProps & {
  placeholderSrc?: string
  videoSrc?: string
  videoMode?: VideoMode
  srcset?: string
  sizes?: string
  naturalSize?: Size
  ref?: (element: HTMLImageElement | HTMLVideoElement) => void
}

export function Img(props: ImgProps) {
  const [, elementProps] = splitProps(props, [
    'id',
    'src',
    'placeholderSrc',
    'videoSrc',
    'videoMode',
    'srcset',
    'sizes',
    'naturalSize',
    'ref',
  ])
  const [element, setElement] = createSignal<HTMLImageElement | HTMLVideoElement>()
  const size = createElementSize(element)
  const defaultId = createUniqueId()
  const id = () => props.id ?? `img-${defaultId}`
  const sizes = () => maybe(width => stylePx(Math.round(width)), size.width) ?? props.sizes
  const ref = (element: HTMLImageElement | HTMLVideoElement) => {
    setElement(element)
    props.ref?.(element)
  }

  const placeholderImg = () => (
    <PlaceholderImg {...elementProps} id={id()} src={props.placeholderSrc} ref={ref} />
  )

  const suspendedImg = () => (
    <Show when={isSize(size) && size} fallback={placeholderImg()}>
      {size => (
        <Suspense fallback={placeholderImg()}>
          <SuspendedImg
            {...elementProps}
            id={id()}
            src={props.src}
            srcset={props.srcset}
            initialSize={size()}
            sizes={sizes()}
            ref={ref}
          />
        </Suspense>
      )}
    </Show>
  )

  return (
    <>
      <ImgStyle id={id()} naturalSize={props.naturalSize} />
      <Suspense fallback={suspendedImg()}>
        <SuspendedVideo
          {...elementProps}
          id={id()}
          src={props.videoSrc}
          mode={props.videoMode}
          ref={ref}
        />
      </Suspense>
    </>
  )
}
