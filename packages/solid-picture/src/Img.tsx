import {
  ComponentProps,
  Suspense,
  createEffect,
  createResource,
  createSignal,
  createUniqueId,
  mapArray,
  mergeProps,
  onMount,
} from 'solid-js'
import { SourceProps } from './Source'
import { Sizeable } from './types'
import { cssMedia, cssRule, maybe, styleAspectRatio, stylePx, styleUrl } from './utils'
import { createElementSize } from '@solid-primitives/resize-observer'
import { Dynamic } from 'solid-js/web'
import { usePicture } from './Picture'

export type ImgMode = 'controlled' | 'suspended' | 'progressive'

export type ImgProps = ComponentProps<'img'> &
  Partial<Sizeable> & {
    placeholderSrc?: string
    mode?: ImgMode
  }

class ImageError extends Error {
  target: HTMLImageElement

  constructor(message: string, target: HTMLImageElement) {
    super(message)
    this.target = target
  }
}

function loadImage(props: ComponentProps<'img'>) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    return (
      <img
        {...props}
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

export function createImage(props: ComponentProps<'img'>) {
  return createResource(() => loadImage(props), { ssrLoadFrom: 'initial' })
}

function imageCss(selector: string, props: ImgProps, sources: SourceProps[]) {
  return [
    // TODO: Build css from style object instead of props
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

export function ImgStyle(props: ImgProps) {
  const { sources } = usePicture()

  return <style>{imageCss(`:where(#${props.id})`, props, sources())}</style>
}

export function ProgressiveImg(props: ComponentProps<'img'>) {
  return <img {...props} />
}

export function SuspendedImg(props: ComponentProps<'img'>) {
  const [image] = createImage(props)

  // TODO: image is the wrong size because it loaded without sizes attribute; handle placeholder with size

  return <>{image()}</>
}

// const queries = createMemo(() =>
//   sources().map<[SourceProps, Accessor<boolean>]>(source => [
//     source,
//     source.media ? createMediaQuery(source.media!) : () => true,
//   ]),
// )

// const currentSource = createMemo(() => queries().find(([, match]) => match())?.[0])

export function Img(props: ImgProps) {
  const [element, setElement] = createSignal<HTMLImageElement | HTMLVideoElement>()

  const size = createElementSize(element)

  const defaultId = createUniqueId()

  const imgProps = mergeProps(props, {
    get id() {
      return props.id ?? `img-${defaultId}`
    },
    get sizes() {
      return maybe(size.width, width => stylePx(Math.round(width))) ?? props.sizes
    },
    get ref() {
      return setElement
    },
  })

  const [data, setData] = createSignal<string | undefined>()

  onMount(() => {
    const [test] = createResource<string>(() => {
      console.log('fetcher')
      return new Promise(resolve => {
        setTimeout(() => resolve('data'), 5000)
      })
    })
    createEffect(() => {
      setData(test())
    })
  })

  createEffect(() => {
    console.log('result: ', data())
  })

  return (
    <>
      <Suspense fallback="fallback">{data()}</Suspense>
      {/* <ImgStyle {...imgProps} />
      <Suspense fallback={<img id={imgProps.id} ref={imgProps.ref} width={imgProps.width} />}>
        <SuspendedImg {...imgProps} />
      </Suspense> */}
    </>
  )
}
