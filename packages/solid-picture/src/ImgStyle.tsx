import { usePicture } from './Picture'
import { cssMediaRule, cssRule, styleAspectRatio, stylePosition, styleUrl } from './css'
import { Position, Size } from './types'
import { maybe } from './utils'

export function ImgStyle(props: {
  id: string
  naturalSize?: Size
  objectPosition?: Position
  placeholderSrc?: string
}) {
  const { sources } = usePicture()
  const selector = () => `:where(#${props.id})`

  return (
    <style>
      {[
        cssRule(selector(), [
          ['aspect-ratio', maybe(styleAspectRatio, props.naturalSize)],
          ['background-image', maybe(styleUrl, props.placeholderSrc)],
          ['background-position', maybe(stylePosition, props.objectPosition)],
          ['object-position', maybe(stylePosition, props.objectPosition)],
        ]),
        ...sources()
          .filter(source => source.media != null)
          .map(source =>
            cssMediaRule(
              source.media!,
              cssRule(selector(), [
                ['aspect-ratio', maybe(styleAspectRatio, source.naturalSize)],
                ['background-image', maybe(styleUrl, source.placeholderSrc)],
                ['background-position', maybe(stylePosition, source.objectPosition)],
                ['object-position', maybe(stylePosition, source.objectPosition)],
              ]),
            ),
          ),
      ]}
    </style>
  )
}
