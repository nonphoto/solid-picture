import { usePicture } from './Picture'
import { cssMediaRule, cssRule, styleAspectRatio, styleUrl } from './css'
import { maybe } from './utils'
import { Size } from '@solid-primitives/utils'

export function ImgStyle(props: { id: string; naturalSize?: Size; placeholderSrc?: string }) {
  const { sources } = usePicture()
  const selector = () => `:where(#${props.id})`

  return (
    <style>
      {[
        cssRule(selector(), [
          ['aspect-ratio', maybe(styleAspectRatio, props.naturalSize)],
          ['background-image', maybe(styleUrl, props.placeholderSrc)],
        ]),
        ...sources()
          .filter(source => source.media != null)
          .map(source =>
            cssMediaRule(
              source.media!,
              cssRule(selector(), [
                ['aspect-ratio', maybe(styleAspectRatio, source.naturalSize)],
                ['background-image', maybe(styleUrl, source.placeholderSrc)],
              ]),
            ),
          ),
      ]}
    </style>
  )
}
