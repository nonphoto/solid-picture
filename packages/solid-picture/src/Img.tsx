import { ComponentProps, Suspense, createSignal, createUniqueId, splitProps } from 'solid-js'
import { NaturalSize } from './types'
import { maybe } from './utils'
import { createElementSize } from '@solid-primitives/resize-observer'
import { ImgStyle } from './ImgStyle'
import { PlaceholderImg } from './PlaceholderImg'
import { SuspendedImg } from './SuspendedImg'
import { stylePx } from './css'
import { SuspendedVideoImg } from './SuspendedVideoImg'

export function Img(
  props: ComponentProps<'img'> &
    ComponentProps<'video'> &
    Partial<NaturalSize> & { placeholderSrc?: string },
) {
  const [, imgProps] = splitProps(props, ['naturalWidth', 'naturalHeight', 'placeholderSrc'])

  const [element, setElement] = createSignal<HTMLImageElement | HTMLVideoElement>()

  const size = createElementSize(element)

  const defaultId = createUniqueId()

  const id = () => props.id ?? `img-${defaultId}`

  const sizes = () => maybe(width => stylePx(Math.round(width)), size.width) ?? props.sizes

  return (
    <>
      <ImgStyle id={id()} naturalWidth={props.naturalWidth} naturalHeight={props.naturalHeight} />
      <Suspense
        fallback={
          <Suspense
            fallback={
              <PlaceholderImg {...imgProps} id={id()} src={props.placeholderSrc} ref={setElement} />
            }
          >
            <SuspendedImg {...imgProps} id={id()} size={size} sizes={sizes()} ref={setElement} />
          </Suspense>
        }
      >
        <SuspendedVideoImg {...imgProps} id={id()} ref={setElement} />
      </Suspense>
    </>
  )
}
