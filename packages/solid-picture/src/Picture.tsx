import { resolveTokens } from '@solid-primitives/jsx-tokenizer'
import { ComponentProps, createMemo, For } from 'solid-js'
import { ImgElement, imgTokenizer, isImgToken } from './Img'
import { isSourceToken, sourceTokenizer } from './Source'

export function Picture(props: ComponentProps<'picture'>) {
  const tokens = resolveTokens([sourceTokenizer, imgTokenizer], () => props.children, {
    includeJSXElements: true,
  })

  const sourceTokens = createMemo(() =>
    tokens()
      .filter(isSourceToken)
      .map(token => token.data),
  )

  return (
    <picture {...props}>
      <For each={tokens()}>
        {token =>
          isImgToken(token) ? (
            <ImgElement {...token.data.props} sources={sourceTokens().map(data => data.props)} />
          ) : (
            <></>
          )
        }
      </For>
    </picture>
  )
}
