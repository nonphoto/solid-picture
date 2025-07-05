import { usePicture } from './Picture'
import { cssMediaRule, cssRule, styleAspectRatio, styleUrl } from './css'
import { maybe } from './utils'

export function PictureStyle(props: { id: string }) {
  const picture = usePicture()
  const selector = () => `:where(#${props.id})`

  return (
    <style>
      {[
        cssRule(selector(), [['display', 'block']]),
        ...(picture?.sources() ?? [])
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
