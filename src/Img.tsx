import { ComponentProps, createUniqueId, Show, splitProps } from 'solid-js'
import { Portal } from 'solid-js/web'
import { styleAspectRatio } from './css'
import { usePicture } from './Picture'
import { Size } from './types'

export interface ImgProps extends ComponentProps<'img'> {
  naturalSize?: Size
  placeholderSrc?: string
}

export function Img(props: ImgProps) {
  const [styleProps, elementProps] = splitProps(props, ['naturalSize', 'placeholderSrc'])
  const defaultId = createUniqueId()
  const id = () => props.id ?? `img-${defaultId}`
  const picture = usePicture()
  return (
    <>
      <img {...elementProps} id={id()} />
      <Show when={!picture}>
        <Portal mount={document.head}>
          <style>{`:where(picture:has(> #${id()}),:not(picture) > #${id()}){ aspect-ratio: ${
            props.naturalSize ? styleAspectRatio(props.naturalSize) : 'auto'
          }; }`}</style>
        </Portal>
      </Show>
    </>
  )
}
