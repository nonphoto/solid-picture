import { usePicture } from './Picture'
import { NaturalSize } from './types'
import { cssMediaRule, cssRule, styleAspectRatio, styleUrl } from './css'
import { maybe } from './utils'

export function ImgStyle(
  props: Partial<NaturalSize> & {
    id: string
    placeholderSrc?: string
  },
) {
  const { sources } = usePicture()
  const selector = () => `:where(#${props.id})`

  return (
    <style>
      {[
        cssRule(selector(), [
          ['aspect-ratio', styleAspectRatio(props)],
          ['background-image', maybe(styleUrl, props.placeholderSrc)],
        ]),
        ...sources()
          .filter(source => source.media != null)
          .map(source =>
            cssMediaRule(
              source.media!,
              cssRule(selector(), [
                ['aspect-ratio', styleAspectRatio(source)],
                ['background-image', maybe(styleUrl, source.placeholderSrc)],
              ]),
            ),
          ),
      ]}
    </style>
  )
}
