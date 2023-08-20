import {
  ComponentProps,
  Resource,
  Suspense,
  createEffect,
  createResource,
  createSignal,
  createUniqueId,
  onMount,
  splitProps,
} from 'solid-js'
import { SourceProps } from './Source'
import { NaturalSize } from './types'
import { cssMedia, cssRule, maybe, styleAspectRatio, stylePx, styleUrl } from './utils'
import { NullableSize, createElementSize } from '@solid-primitives/resize-observer'
import { usePicture } from './Picture'

class ImageError extends Error {
  target: HTMLImageElement

  constructor(message: string, target: HTMLImageElement) {
    super(message)
    this.target = target
  }
}

function createMounted() {
  const [mounted, setMounted] = createSignal(false)

  onMount(() => {
    setMounted(true)
  })

  return mounted
}

export function loadImage(props: ComponentProps<'img'> & { size: NullableSize }) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    console.log('promise start')
    return (
      <img
        {...props}
        width={props.size.width ?? undefined}
        height={props.size.height ?? undefined}
        onLoad={event => {
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
  props: ComponentProps<'img'> & { size: NullableSize },
): Resource<HTMLImageElement> {
  const mounted = createMounted()
  const [resource] = createResource(mounted, () => loadImage(props))
  return resource
}

export function SuspendedImg(props: ComponentProps<'img'> & { size: NullableSize }) {
  const image = createImage(props)

  createEffect(() => {
    if (image()) {
      const { width, height, srcset, src } = image()!
      console.log(image.state, { width, height, srcset, src })
    }
  })

  return <>{image()}</>
}

export function imageCss(
  selector: string,
  props: Partial<NaturalSize> & {
    placeholderSrc?: string
  },
  sources: SourceProps[],
) {
  return [
    cssRule(selector, [
      ['aspect-ratio', styleAspectRatio(props)],
      ['background-image', maybe(props.placeholderSrc, styleUrl)],
    ]),
    ...sources
      .filter(source => source.media != null)
      .map(source =>
        cssMedia(
          source.media!,
          cssRule(selector, [
            ['aspect-ratio', styleAspectRatio(source)],
            ['background-image', maybe(source.placeholderSrc, styleUrl)],
          ]),
        ),
      ),
  ].join(' ')
}

export function ImgStyle(
  props: Partial<NaturalSize> & {
    id: string
    placeholderSrc?: string
  },
) {
  const { sources } = usePicture()

  return <style>{imageCss(`:where(#${props.id})`, props, sources())}</style>
}

export function PlaceholderImg(props: ComponentProps<'img'>) {
  const [, otherProps] = splitProps(props, ['src', 'srcset', 'sizes'])
  const { currentSource } = usePicture()

  return <img {...otherProps} src={currentSource()?.placeholderSrc ?? props.src} />
}

export function Img(
  props: ComponentProps<'img'> & Partial<NaturalSize> & { placeholderSrc?: string },
) {
  const [, imgProps] = splitProps(props, ['naturalWidth', 'naturalHeight', 'placeholderSrc'])

  const [element, setElement] = createSignal<HTMLImageElement | HTMLVideoElement>()

  const size = createElementSize(element)

  const defaultId = createUniqueId()

  createEffect(() => {
    console.log('element', element())
  })

  createEffect(() => {
    console.log('size', size.width, size.height)
  })

  const id = () => props.id ?? `img-${defaultId}`

  const sizes = () => maybe(size.width, width => stylePx(Math.round(width))) ?? props.sizes

  return (
    <>
      <ImgStyle
        id={id()}
        placeholderSrc={props.placeholderSrc}
        naturalWidth={props.naturalWidth}
        naturalHeight={props.naturalHeight}
      />
      {/* <PlaceholderImg {...imgProps} id={id()} src={props.placeholderSrc} ref={setElement} /> */}
      <Suspense
        fallback={
          <PlaceholderImg {...imgProps} id={id()} src={props.placeholderSrc} ref={setElement} />
        }
      >
        <SuspendedImg {...imgProps} id={id()} size={size} sizes={sizes()} ref={setElement} />
        {/* <Suspense fallback={<SuspendedImg {...sharedProps} />}>
          <SuspendedVideoImg {...sharedProps} />
        </Suspense> */}
      </Suspense>
    </>
  )
}

{
  /* <Picture>
  <Source
    media="(orientation: portrait)"
    data-placeholder="portrait.placeholder.png"
    srcset="portrait.png"
    data-video="portrait.mp4"
  />
  <Source
    media="(orientation: landscape)"
    data-placeholder="landscape.placeholder.png"
    srcset="landscape.png"
    data-video="landscape.mp4"
  />
  <Suspense fallback={<PlaceholderImg />}>
    <Suspense fallback={<SuspendedImg />}>
      <SuspendedVideoImg />
    </Suspense>
  </Suspense>
</Picture> */
}
