import { resolveTokens } from '@solid-primitives/jsx-tokenizer'
import { ComponentProps, splitProps, createMemo, For } from 'solid-js'
import { ImgElement, imgTokenizer, isImgToken } from './Img'
import { isSourceToken, sourceTokenizer } from './Source'

export function Picture(props: ComponentProps<'picture'>) {
  const [localProps, otherProps] = splitProps(props, ['children'])

  const tokens = resolveTokens([sourceTokenizer, imgTokenizer], () => localProps.children, {
    includeJSXElements: true,
  })

  const sourceTokens = createMemo(() =>
    tokens()
      .filter(isSourceToken)
      .map(token => token.data),
  )

  return (
    <picture {...otherProps}>
      <For each={tokens()}>
        {token =>
          isImgToken(token) ? (
            <ImgElement {...token.data.props} sources={sourceTokens().map(data => data.props)} />
          ) : isSourceToken(token) ? (
            <></>
          ) : (
            <></>
          )
        }
      </For>
    </picture>
  )
}
