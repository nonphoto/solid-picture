import { createMediaQuery } from '@solid-primitives/media'
import { Accessor, ComponentProps, createMemo, createUniqueId, Show, splitProps } from 'solid-js'
import { SourceProps } from './Source'
import { Sizeable } from './types'
import { cssMedia, cssRule, isVideo, maybe, styleAspectRatio, styleUrl } from './utils'
import {
  createToken,
  createTokenizer,
  isToken,
  TokenElement,
} from '@solid-primitives/jsx-tokenizer'

export type ImgProps = ComponentProps<'img'> &
  Partial<Sizeable> & { placeholderSrc?: string; sources?: SourceProps[] }

export interface ImgToken {
  props: ImgProps
}

export const imgTokenizer = createTokenizer<ImgToken>({
  name: 'Img Tokenizer',
})

export function isImgToken(value: any): value is TokenElement<ImgToken> {
  return isToken(imgTokenizer, value)
}

export function VideoElement(props: ComponentProps<'video'> & { srcset?: string }) {
  const [localProps, otherProps] = splitProps(props, ['src', 'srcset'])
  return (
    <video
      {...otherProps}
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
    ['naturalWidth', 'naturalHeight', 'placeholderSrc', 'sizes', 'sources', 'src', 'srcset', 'id'],
    ['width', 'height', 'style', 'class', 'classList'],
  )

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
            src={localProps.src}
            srcset={localProps.srcset}
            sizes={isAutoSizes() ? undefined : localProps.sizes}
            id={id()}
          />
        }
      >
        <VideoElement
          {...otherProps}
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
  props => {
    return { props }
  },
  ImgElement,
)
