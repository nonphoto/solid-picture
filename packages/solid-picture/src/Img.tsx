import { createMediaQuery } from '@solid-primitives/media'
import {
  Accessor,
  Component,
  ComponentProps,
  createMemo,
  createSignal,
  createUniqueId,
  Show,
  splitProps,
} from 'solid-js'
import { SourceProps } from './Source'
import { Sizeable } from './types'
import { cssMedia, cssRule, isVideo, maybe, styleAspectRatio, stylePx, styleUrl } from './utils'
import {
  createToken,
  createTokenizer,
  isToken,
  TokenElement,
} from '@solid-primitives/jsx-tokenizer'
import { createElementSize } from '@solid-primitives/resize-observer'
import { Dynamic } from 'solid-js/web'

export type ImgProps = ComponentProps<'img'> &
  Partial<Sizeable> & {
    placeholderSrc?: string
    sources?: SourceProps[]
    videoComponent?: Component<ComponentProps<'video'>>
  }

export interface ImgToken {
  props: ImgProps
}

export const imgTokenizer = createTokenizer<ImgToken>({
  name: 'Img Tokenizer',
})

export function isImgToken(value: any): value is TokenElement<ImgToken> {
  return isToken(imgTokenizer, value)
}

export function VideoElement(
  props: ComponentProps<'video'> & {
    srcset?: string
    component?: Component<ComponentProps<'video'>>
  },
) {
  const [localProps, otherProps] = splitProps(props, ['src', 'srcset', 'component'])
  return (
    <Dynamic
      {...otherProps}
      component={localProps.component ?? 'video'}
      src={localProps.src ?? localProps.srcset}
      autoplay
      playsinline
      muted
      loop
    />
  )
}

export function ImgElement(props: ImgProps) {
  const [localProps, otherProps] = splitProps(
    props,
    [
      'naturalWidth',
      'naturalHeight',
      'placeholderSrc',
      'sizes',
      'sources',
      'src',
      'srcset',
      'id',
      'videoComponent',
    ],
    ['width', 'height', 'style', 'class', 'classList'],
  )

  const [element, setElement] = createSignal<HTMLImageElement>()

  const size = createElementSize(element)

  const defaultId = createUniqueId()
  const id = () => localProps.id ?? `img-${defaultId}`

  const sources = () => localProps.sources ?? []

  const queries = createMemo(() =>
    sources().map<[SourceProps, Accessor<boolean>]>(source => [
      source,
      source.media ? createMediaQuery(source.media!) : () => true,
    ]),
  )

  const currentSource = createMemo(() => queries().find(([, match]) => match())?.[0])

  const isVideoSource = () => (currentSource() ? isVideo(currentSource()?.type) : false)

  const isAutoSizes = () => localProps.sizes === 'auto'

  const isReady = () => (isAutoSizes() ? size.width != null : true)

  return (
    <>
      <style>
        {[
          cssRule(`:where(#${id()})`, [
            ['aspect-ratio', styleAspectRatio(localProps)],
            ['background-image', maybe(localProps.placeholderSrc, styleUrl)],
          ]),
          ...sources()
            .filter(source => source.media != null)
            .map(source =>
              cssMedia(
                source.media!,
                cssRule(`:where(#${id()})`, [
                  ['aspect-ratio', styleAspectRatio(source)],
                  ['background-image', maybe(source.placeholderSrc, styleUrl)],
                ]),
              ),
            ),
        ].join(' ')}
      </style>
      <Show
        when={isVideoSource()}
        fallback={
          <img
            {...otherProps}
            ref={setElement}
            src={isReady() ? localProps.src : undefined}
            srcset={isReady() ? localProps.srcset : undefined}
            sizes={
              isAutoSizes()
                ? maybe(size.width, width => stylePx(Math.round(width)))
                : localProps.sizes
            }
            id={id()}
          />
        }
      >
        <VideoElement
          {...otherProps}
          component={localProps.videoComponent}
          src={currentSource()?.src}
          srcset={currentSource()?.srcset}
          id={id()}
        />
      </Show>
    </>
  )
}

export const Img = createToken(
  imgTokenizer,
  (props: ImgProps) => {
    return { props }
  },
  ImgElement,
)
