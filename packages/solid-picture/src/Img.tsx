import { Show, Suspense, createSignal, createUniqueId } from 'solid-js'
import { isSize, maybe } from './utils'
import { createElementSize } from '@solid-primitives/resize-observer'
import { ImgStyle } from './ImgStyle'
import { SuspendedImg } from './SuspendedImg'
import { stylePx } from './css'
import { PlaceholderImg } from './PlaceholderImg'
import { Size } from '@solid-primitives/utils'
import { SuspendedVideo } from './SuspendedVideo'

export interface ImgProps {
  id?: string
  src?: string
  placeholderSrc?: string
  videoSrc?: string
  srcset?: string
  sizes?: string
  width?: string | number
  height?: string | number
  naturalSize?: Size
  ref?: (element: HTMLImageElement) => void
}

export function Img(props: ImgProps) {
  const [element, setElement] = createSignal<HTMLImageElement | HTMLVideoElement>()
  const size = createElementSize(element)
  const defaultId = createUniqueId()
  const id = () => props.id ?? `img-${defaultId}`
  const sizes = () => maybe(width => stylePx(Math.round(width)), size.width) ?? props.sizes
  const placeholderImg = () => (
    <PlaceholderImg
      id={id()}
      src={props.placeholderSrc}
      ref={setElement}
      width={props.width}
      height={props.height}
    />
  )

  const suspendedImg = () => (
    <Show when={isSize(size) && size} fallback={placeholderImg()}>
      {size => (
        <Suspense fallback={placeholderImg()}>
          <SuspendedImg
            id={id()}
            src={props.src}
            srcset={props.srcset}
            initialSize={size()}
            sizes={sizes()}
            ref={setElement}
            width={props.width}
            height={props.height}
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
          id={id()}
          src={props.videoSrc}
          ref={setElement}
          width={props.width}
          height={props.height}
        />
      </Suspense>
    </>
  )
}
